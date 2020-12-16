import React, {Component} from 'react'
import Table from './Table'
import Form from './Form'
import Example from './Example'
class App extends Component {
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
	    <div className="container">
        <h1>Chatting</h1>
        <Example />
        <Table
          messagesData={messages}
          removeMessage={this.removeMessage}
        />
        <Form handleSubmit={this.handleSubmit} />
      </div>
	  )
  }
}
export default App
