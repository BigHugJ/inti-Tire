import React, {Component} from 'react'
import MessageTable from './Table'
import MessageEditor from './Form'
import {Container, Badge, Jumbotron, Row, Col} from 'react-bootstrap'
import Counters from './Counter'
import SockJS from "sockjs-client"
import Stomp from "stompjs"
import * as messageTypes from './SockConstants'
import ReactDOM from 'react-dom'
import MesssgeCard from './CardSample'
import DivSample from './dviSample'

class Chat extends Component {
  state = {
   isConnected: false,
   currentEndpoint: '',
   receiverList:[],
   connectedList:[],
   messageCount: 0,
   messages: [],
   userId:null
  }
  
  currentEndpoint=''
  start = Date.now();
  isWindowFocused = true;
    
  sockjs = new SockJS(messageTypes._SOCK_SERVER_EXTERNAL);	 
  stompClient = Stomp.over(this.sockjs);
	
  onFocus = () => {
	this.isWindowFocused = true;  
    document.title = "NO NEW MESSAGES"  
  }
  
  onBlur = () => {
	this.isWindowFocused = false;
  }
  
  componentDidMount() {
	document.title = "chat-chat"  
	window.addEventListener('focus', this.onFocus);
	window.addEventListener('blur', this.onBlur);

  	this.stompClient.connect({}, (frame) => {	
	    console.log('STOMP connected')
	  }, (error)=>{console.log("STOMP error"+ error)})
	   
    this.interval = setInterval(
	  () => {this.setStatusCheck()}, 
      1000
     ) 
  }
  
  insertMessage = (msg) => {
	var htmlmsg = ""
	var imgName = ""
	if (msg.messageSender === this.props.loginUser) {
	  imgName = this.props.loginUser + ".jpg"
	  htmlmsg="<div style=\"text-align:right;\"><span style=\"color:green\">" + msg.message + " " + "</span>" + "<Image src="+imgName +" width= \"40px\" height=\"40px\" style=border-radius:50% /></div>"	
	}else if (msg.messageSender ===  messageTypes._MESSAGE__TIME_SPLITTER) {
	  htmlmsg="<div style=\"text-align:center;color:SpringGreen\">" + "--- " + msg.message + " ---" + "<br/></div>"	
	}
	else {
	  if (this.state.connectedList.length > 0) {
	    imgName = this.state.connectedList[0]+ ".jpg";
      }
	  htmlmsg= "<div style=\"text-align:left;\"> <Image src="+imgName +" width= \"40px\" height=\"40px\" style=border-radius:50% />"+" " +  msg.message + "</div>"
	}

	document.getElementById('mCard').innerHTML += htmlmsg ;
	document.getElementById('mCard').scrollTop = document.getElementById('mCard').scrollHeight - document.getElementById('mCard').clientHeight;
  }	  
  
  setStatusCheck = () => {
	if (this.state.isConnected === false) {  
	  if (this.sockjs.readyState === messageTypes._SOCKET_CLOSED) {
		this.stompClient.disconnect()
		this.sockjs.close()  
	    console.log("switch to internal<><><><><><><>")	
	    this.sockjs = new SockJS(messageTypes._SOCK_SERVER)
		this.stompClient = Stomp.over(this.sockjs);
		this.stompClient.connect({}, (frame) => {	
	    console.log('STOMP connected')
	    }, (error)=>{console.log("STOMP error"+ error)})
	  }
	  
	  this.handleConnect()
	} 
  }
  
  componentWillUnmount() {
	console.log('Unmount, delete user:' + this.state.userId)  
	
	this.stompClient.send(messageTypes._MESSAGE_DEST_DELETEUSER, {}, JSON.stringify({
	  name: this.props.loginUser,
	  id: this.state.userId
	}))
	  
	clearInterval(this.interval);

	this.sockjs.close()  
    this.stompClient.disconnect()
  }
  
  handleConnect = () => {
	if (this.sockjs.readyState === messageTypes._SOCKET_READY) {  
	
	  this.setState({isConnected:true})
	  console.log('connection is Ready. State:' + this.sockjs.readyState)

	  this.stompClient.subscribe(messageTypes._CHAT_TOPIC_PREFIX+this.props.loginUser, (payload) => {
	    var respMessage = JSON.parse(payload.body);
		console.log("connected/subscribe/chat request<><><>"+respMessage.message)	  	     
		if (respMessage.message === messageTypes._CHAT_REQUEST) {
		  if (this.endpoint !== respMessage.messageReceiver) {
			this.setState({connectedList:respMessage.messageSender.split()})

		    this.stompClient.subscribe(messageTypes._CHAT_TOPIC_PREFIX+respMessage.messageReceiver, (pload) => {
			  var respMsg = JSON.parse(pload.body);
			  this.insertMessage(respMsg)
			  /*var newMessages = this.state.messages.splice(0,0, respMsg)
			  this.setState({messaage: newMessages})	*/	  
			  if (!this.isWindowFocused) {
				document.title = "<<< MESSAGE COMING"
			  }
		    })	
		  }
		} else if (respMessage.name === this.props.loginUser) {
			this.setState({userId: respMessage.id})
		}
	    
	  })
	  
	  this.stompClient.subscribe(messageTypes._MESSAGE_DEST_BROADCASTUSERS, (payload) => {
	    var respMessage = JSON.parse(payload.body);
		if (respMessage.messageReceiver) {
		  var rArray = respMessage.messageReceiver.split(",")
	      this.setState({receiverList: rArray})
		}
	  })
	  
	  this.stompClient.send(messageTypes._MESSAGE_DEST_ADDUSER, {}, JSON.stringify({
			name: this.props.loginUser,
			onlineStatus: messageTypes._STATUS_ONLINE
	  }))
	  
	}
	else {
	  this.setState({isConnected:false})
	}
  }
  
  sendMessage = (chatmsg ) => {
	if (this.sockjs.readyState === messageTypes._SOCKET_READY) {  
	  if ((Date.now() - this.start) > (1000*60*5)) {
		this.stompClient.send(messageTypes._MESSAGE_DEST_SENDMSG, {}, JSON.stringify({
				messageSender: messageTypes._MESSAGE__TIME_SPLITTER,
				messageReceiver: '',
				message: new Date(this.start).toLocaleTimeString()
			})		
		)
		
	  }
	  this.start = Date.now()
	  if (chatmsg === ";'") {
	    document.getElementById('mCard').innerHTML = ""	  
	  }
	  else {
	  this.stompClient.send(messageTypes._MESSAGE_DEST_SENDMSG, {}, JSON.stringify({
				messageSender: this.props.loginUser,
				messageReceiver: this.props.loginUser === 'wolf'? 'bunny' : 'wolf',
				message: chatmsg,
			}))
	  }
	}
	
  }
  
  connectToReceiver = (chatters) => {
	var receivers = chatters.join('')
	console.log("after join:"+receivers)
	
	var endpoint = this.props.loginUser+receivers

	if (this.currentEndpoint === endpoint) {
	  return
	}
	this.currentEndpoint = endpoint
	this.stompClient.subscribe(messageTypes._CHAT_TOPIC_PREFIX+endpoint,(payload) => {
	  var respMessage = JSON.parse(payload.body);
	  /*var newMessages = this.state.messages.splice(0,0, respMessage)
	  this.setState({messaage: newMessages})*/
	  this.insertMessage(respMessage)
	  
	  if (!this.isWindowFocused) {
	    document.title = "<<< MESSAGE COMING"
	  }
	})
	
	if (Array.isArray(receivers)) {
	  receivers.forEach(r=> {
	    this.stompClient.send(messageTypes._MESSAGE_DEST_ADDCHANNEL, {}, JSON.stringify({
				messageSender: this.props.loginUser,
				messageReceiver: r,
				message: endpoint
			}))
	  })
	  this.setState({connectedList:receivers})

	}
	else {
	  this.stompClient.send(messageTypes._MESSAGE_DEST_ADDCHANNEL, {}, JSON.stringify({
				messageSender: this.props.loginUser,
				messageReceiver: receivers,
				message: endpoint
			}))	
	  	  this.setState({connectedList:receivers.split()})

	}
  }
  
  render() {
    const { messages } = this.state;
	const messageCount = this.state.messages.length;
	const loginUser = this.props.loginUser;
	const isLoggedIn = this.props.isLoggedIn;
	const receivers = this.state.receiverList;
	const connectedList = this.state.connectedList;
	const isConnected = this.state.isConnected;
	
	return (
	  <Container className="mb-1"  >
	    <Jumbotron style={{backgroundColor:'#e9ecef'}}>
		 
		  <Row  className="mb-2">
		    <Col>
			  <Counters loginUser={loginUser} isConnected={isConnected} totalMessages={messageCount} isLoggedIn={isLoggedIn} receivers={receivers} connectToReceiver={this.connectToReceiver} />
			</Col>
			</Row>
			
			<Row >
			  <Col>
			    <DivSample />
				
			  </Col>
			</Row>
			<Row className="mb-0" >
			  <Col>
			  <br/>
			  </Col>
			</Row>	
			<Row className="mb-0" >
			  <Col>
				<MessageEditor sendMessage={this.sendMessage}/>
			  </Col>
			</Row>
		  </Jumbotron>
        </Container>
	  )
  }
}
export default Chat