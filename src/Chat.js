import React, {Component} from 'react'
import MessageTable from './Table'
import MessageEditor from './Form'
import {Container, Badge, Jumbotron, Row, Col, Button} from 'react-bootstrap'
import Counters from './Counter'
import SockJS from "sockjs-client"
import Stomp from "stompjs"
import * as messageTypes from './SockConstants'

class Chat extends Component {
  state = {
   isConnected: false,
   currentReceiver: '',
   receiverList:[],
   messageCount: 0,
   messages: []
  }
  sockjs = new SockJS(messageTypes._SOCK_SERVER);
  stompClient = Stomp.over(this.sockjs);
  
  onError = (error) => {
	console.log(error)
  }
  
  componentDidMount() {
	console.log('Did mount')
	this.stompClient.connect({}, (frame) => {	
	  console.log('connect')
	})
  }
  
  componentWillUnmount() {
	console.log('Unmount')  
	this.sockjs.close()  
    this.stompClient.disconnect()
  }
  
  handleConnect = () => {
	  
	if (this.sockjs.readyState === messageTypes._SOCKET_READY) {  
	  this.setState({isConnected:true})
	  console.log('connection is Ready. State:' + this.sockjs.readyState)
	  
	  this.stompClient.subscribe(messageTypes._CHAT_TOPIC_PREFIX+this.props.loginUser, (payload) => {
	    var respMessage = JSON.parse(payload.body);
		  	     
		if (respMessage.message === messageTypes._STATUS_ONLINE) {
		  if ( this.state.receiverList === undefined) {
		    var a = [respMessage.messageSender]
			this.setState({receiverList: a});
		  }
		  else {
			let a = this.state.receiverList.slice(); //creates the clone of the state
			a[a.length()] = respMessage.messageSender;
			this.setState({receiverList: a});	
		  }
		} 
		else if (respMessage.message === messageTypes._CHAT_REQUEST) {
		  this.stompClient.subscribe(messageTypes._CHAT_TOPIC_PREFIX+respMessage.messageReceiver+this.props.loginUser, (pload) => {
			var respMsg = JSON.parse(pload.body);
			this.setState({messages: [...this.state.messages, respMsg.message]})		  
		  })	
		}
	    else {
		  if (respMessage.messageReceiver) {
		    var rList = respMessage.messageReceiver.split(",")
		    this.sendNotificationToOnlineReceives(rList)
		  }
	        console.log(respMessage.message)  
		  
		  this.setState({receiverList: rList})
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
  
  sendNotificationToOnlineReceives = (rList) => {
    rList.forEach(r => {
		console.log("notify:"+r)
		this.stompClient.send(messageTypes._CHAT_TOPIC_PREFIX+r, {}, JSON.stringify({
				messageSender: this.props.loginUser,
				messageReceiver: r,
				message: messageTypes._STATUS_ONLINE
			})
	)})
  }
  
  sendMessage = (chatmsg ) => {
	console.log("state: "+this.sockjs.readyState)
	if (this.sockjs.readyState === messageTypes._SOCKET_READY) {  
  
      console.log("Sender: " + this.props.loginUser)
	  this.stompClient.send(messageTypes._MESSAGE_DEST_SENDMSG, {}, JSON.stringify({
				messageSender: this.props.loginUser,
				messageReceiver: this.props.loginUser === 'wolf'? 'bunny' : 'wolf',
				message: chatmsg,
			})
	  )
	}
	else {
	  this.setState({messages: [...this.state.messages, chatmsg]})	
	}
  }

  removeMessage = index => {
    const { messages } = this.state;
    
    this.setState({
      messages: messages.filter((message, i) => { 
        return i !== index;
      })
    });
  }
  
  calculateMessagCount = (mCount) => {
	this.setState({messageCount: mCount})
  }
  
  connectToReceiver = (receiver) => {
    console.log("connectToReceiver****"+receiver)
	this.stompClient.subscribe(messageTypes._CHAT_TOPIC_PREFIX+this.props.loginUser+receiver,(payload) => {
	  var respMessage = JSON.parse(payload.body);
	  this.setState({messages: [...this.state.messages, respMessage.message]})
	})
	this.stompClient.send(messageTypes._CHAT_TOPIC_PREFIX+receiver, {}, JSON.stringify({
				messageSender: this.props.loginUser,
				messageReceiver: receiver,
				message: messageTypes._CHAT_REQUEST
			}))
  }
  
  render() {
    const { messages } = this.state;
	const messageCount = this.state.messages.length;
	const loginUser = this.props.loginUser;
	const isLoggedIn = this.props.isLoggedIn;
	const receivers = this.state.receiverList;
	
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
			  <Counters loginUser={loginUser} totalMessages={messageCount} isLoggedIn={isLoggedIn} receivers={receivers} connectToReceiver={this.connectToReceiver} />
			</Col>
			<Col>
			  <Button size="sm" variant="success" onClick={this.handleConnect} disabled={this.state.isConnected}>Connect</Button>
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
