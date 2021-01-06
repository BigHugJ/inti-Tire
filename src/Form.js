import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap'

class MessageEditor extends Component {
  initialState = {
    message: '',
    sender: 'Me'
  }

  state = this.initialState;

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name] : value
    });
  }

  onFormSubmit = (event) => {
    event.preventDefault();
        
    this.props.handleSubmit(this.state);
    console.log(this.state.message)
    this.props.sendMessage(this.state.message);

    this.setState(this.initialState);
  }

  render() {
    const {message} = this.state; 

    return (
	  <Form onSubmit={this.onFormSubmit}>
		<Form.Group id="message">
		  <Form.Control size="sm" as="textarea" name= "message" 
          id= "name"
          value={message}  onChange={this.handleChange}/>
		</Form.Group>
		<Button variant="primary" type="submit" disabled={!this.state.message}>
		  Submit
		</Button>
	  </Form>
    )
  }
}

export default MessageEditor;
