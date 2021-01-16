import React, {Component} from 'react'
import MessageTable from './Table'
import MessageEditor from './Form'
import {Container, Jumbotron, Row, Col, Button} from 'react-bootstrap'
import Counters from './Counter'
import SockJS from "sockjs-client"
import Stomp from "stompjs"
import MainTab from './MainTab'

class Chat extends Component {
  state = {
   isConnected: false,
   messageCount: 0,
   messages: []
  }
  sockjs = new SockJS('http://192.168.2.27:8080/gs-guide-websocket');
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
	if (this.sockjs.readyState === 1) {  
	  this.setState({isConnected:true})
	  console.log('connection is NOT ready. State:' + this.sockjs.readyState)
	  
	  this.stompClient.subscribe('/topic/junbunnywolf', (payload) => {
		var respMessage = JSON.parse(payload.body);
  
	    console.log(respMessage.message)  
		this.setState({messages: [...this.state.messages, respMessage]})

	    })
		
	  this.stompClient.send('/app/chatNewUser', {}, JSON.stringify({
			messageSender: this.props.loginUser,
			messageReceiver: this.props.loginUser === 'wolf'? 'bunny' : 'wolf',
			message: 'new join user'
		  })
	  )
	}
	else {
	  this.setState({isConnected:false})
	  console.log('connection is NOT ready. State:' + this.sockjs.readyState)
	}
  }
  
  sendMessage = (chatmsg ) => {
    console.log("Sender: " + this.props.loginUser)
	this.stompClient.send("/app/chatSendMessage", {}, JSON.stringify({
				messageSender: this.props.loginUser,
				messageReceiver: this.props.loginUser === 'wolf'? 'bunny' : 'wolf',
				message: chatmsg,
			})
	  )
  }

  removeMessage = index => {
    const { messages } = this.state;
    
    this.setState({
      messages: messages.filter((message, i) => { 
        return i !== index;
      })
    });
  }
  
  handleSubmit = (message) => {
	this.sendMessage(message)
  }
  
  calculateMessagCount = (mCount) => {
	this.setState({messageCount: mCount})
  }
  
  render() {
    const { messages } = this.state;
	const messageCount = this.state.messages.length;
	const loginUser = this.props.loginUser;
	const isLoggedIn = this.props.isLoggedIn;

	return (
	  <Container className="mb-0" style={{"height":"100%"}}>
	    <Jumbotron>
		  <Row key='1'>
			  <Col>
				<h1>Chatting</h1>
			  </Col>
			</Row>
			<Row key='2' className="mb-2">
			  <Col>
				<Counters loginUser = {loginUser} totalMessages = {messageCount} isLoggedIn={isLoggedIn} />
			  </Col>
			  <Col>
				<Button size="sm" variant="success" onClick={this.handleConnect} disabled={this.state.isConnected}>Connect</Button>
			  </Col>
			</Row>
			<Row key='3' className="mb-0" >
			  <Col>
				  <MessageEditor handleSubmit={this.handleSubmit} sendMessage={this.sendMessage}/>
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
