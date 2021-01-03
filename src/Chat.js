import React, {Component} from 'react'
import MessageTable from './Table'
import MessageEditor from './Form'
import Example from './Example'
import MessageCard from './MessageCard'
import {Container, Button, Jumbotron, Row, Col} from 'react-bootstrap'
import Counters from './Counter'

class Chat extends Component {
  state = {
   isConnected: false,
   messageCount: 0,
   messages: []
  }
  
  componentWillMount () {
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
	this.setState({messages: [...this.state.messages, message]})
  }
  
  calculateMessagCount = (mCount) => {
	this.setState({messageCount: mCount})
  }
  
  render() {
    const { messages } = this.state;
	const messageCount = this.state.messages.length;
	const loginUser = this.props.loginUser;
	
	  return (
	    <Container className="mb-0" style={{"height":"100%"}}>
		  <Jumbotron>
		    <Row>
			  <Col>
				<h1>Chatting</h1>
			  </Col>
			</Row>
			<Row className="mb-2">
			  <Col>
				<Counters loginUser = {loginUser} totalMessages = {messageCount} isLoggedIn={this.props.isLoggedIn}/>
			  </Col>
			</Row>
			<Row className="mb-0" >
			  <Col>
				<MessageEditor handleSubmit={this.handleSubmit} />
			  </Col>
			</Row>
			<Row style={{"margin-left":"10px"}}>
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
