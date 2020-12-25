import React, {Component} from 'react'
import Table from './Table'
import MessageEditor from './Form'
import {Container, Jumbotron, Row, Col} from 'react-bootstrap'
import Counters from './Counter'

class Chat extends Component {
  state = {
   messages: []
  };
  
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
  
  render() {
    const { messages } = this.state;

	  return (
	    <Container >
		  <Jumbotron >
		    <Row >
			  <Col>
				<h1>Chatting</h1>
			  </Col>
			</Row>
			<Row className="mb-2">
			  <Col>
				<Counters unreaded = '10' totalMessages = '11'  />
			  </Col>
			</Row>
			<Row className="mb-5">
			  <Col>
				<MessageEditor handleSubmit={this.handleSubmit}  />
			  </Col>
			</Row>
			<Row className="mb-1">
			  <Col>
				<Table
				  messagesData={messages}
				  removeMessage={this.removeMessage}
				/>
			  </Col>
			</Row>
		  </Jumbotron>
        </Container>
	  )
  }
}
export default Chat
