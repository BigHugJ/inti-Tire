import React, {Component} from 'react'
import MessageTable from './Table'
import MessageEditor from './Form'
import {Container, Badge, Jumbotron, Row, Col} from 'react-bootstrap'
import Counters from './Counter'
import SockJS from "sockjs-client"
import Stomp from "stompjs"
import * as messageTypes from './SockConstants'
import ReactDOM from 'react-dom'

class Chat extends Component {
  state = {
   isConnected: false,
   currentEndpoint: '',
   receiverList:[],
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
		    this.stompClient.subscribe(messageTypes._CHAT_TOPIC_PREFIX+respMessage.messageReceiver, (pload) => {
			  var respMsg = JSON.parse(pload.body);
			  this.setState({messages: [...this.state.messages, respMsg]})		  
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
	  console.log('connection is NOT ready. State:' + this.sockjs.readyState)
	}
  }
  
  sendMessage = (chatmsg ) => {
	console.log("state: "+this.sockjs.readyState)
	if (this.sockjs.readyState === messageTypes._SOCKET_READY) {  
	  if ((Date.now() - this.start) > (1000*60*5)) {
		this.stompClient.send(messageTypes._MESSAGE_DEST_SENDMSG, {}, JSON.stringify({
				messageSender: messageTypes._MESSAGE__TIME_SPLITTER,
				messageReceiver: this.props.loginUser === 'wolf'? 'bunny' : 'wolf',
				message: new Date().toLocaleTimeString()
			})		
		)
		
		this.start = Date.now()
	  }
	  this.stompClient.send(messageTypes._MESSAGE_DEST_SENDMSG, {}, JSON.stringify({
				messageSender: this.props.loginUser,
				messageReceiver: this.props.loginUser === 'wolf'? 'bunny' : 'wolf',
				message: chatmsg,
			})
	  )
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
	  this.setState({messages: [...this.state.messages, respMessage]})
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
	}
	else {
	  this.stompClient.send(messageTypes._MESSAGE_DEST_ADDCHANNEL, {}, JSON.stringify({
				messageSender: this.props.loginUser,
				messageReceiver: receivers,
				message: endpoint
			}))	
	}
  }
  
  render() {
    const { messages } = this.state;
	const messageCount = this.state.messages.length;
	const loginUser = this.props.loginUser;
	const isLoggedIn = this.props.isLoggedIn;
	const receivers = this.state.receiverList;
	const isConnected = this.state.isConnected;
	
	return (
	  <Container className="mb-0" style={{"height":"100%"}}>
	    <Jumbotron>
		  <Row key='1'>
		    <Col>
			  <h3><Badge variant="info">Chat-Chat</Badge></h3>
			</Col>
		  </Row>
		  <Row key='2' className="mb-2">
		    <Col>
			  <Counters loginUser={loginUser} isConnected={isConnected} totalMessages={messageCount} isLoggedIn={isLoggedIn} receivers={receivers} connectToReceiver={this.connectToReceiver} />
			</Col>
			</Row>
			<Row key='3' className="mb-0" >
			  <Col>
				<MessageEditor sendMessage={this.sendMessage}/>
			  </Col>
			</Row>
			<Row key='4'>
			  <Col>
				<MessageTable
				  messagesData={messages} loginUser={loginUser}
				/>
			  </Col>
			</Row>
		  </Jumbotron>
        </Container>
	  )
  }
}
export default Chat
