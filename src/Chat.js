import React, {Component} from 'react'
import MessageTable from './Table'
import MessageEditor from './Form'
import Example from './Example'
import MessageCard from './MessageCard'
import {Container, Button, Jumbotron, Row, Col} from 'react-bootstrap'
import Counters from './Counter'

class Chat extends Component {
  state = {
   messageCount: 0,
   messages: []
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
	
	  return (
	    <Container className="mb-0">
		  <Jumbotron >
		    <Row >
			  <Col>
				<h1>Chatting</h1>
			  </Col>
			</Row>
			<Row className="mb-2">
			  <Col>
				<Counters unreaded = {messageCount} totalMessages = {messageCount}/>
			  </Col>
			</Row>
			<Row className="mb-0">
			  <Col>
				<MessageEditor handleSubmit={this.handleSubmit} />
			  </Col>
			</Row>
			<Row>
			  <Col>
				<MessageTable
				  messagesData={messages}
				/>
			  </Col>
			</Row>
		  </Jumbotron>
        </Container>
	  )
  }
}
export default Chat
