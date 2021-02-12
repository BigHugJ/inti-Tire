import React, {Component} from 'react';
import {InputGroup, FormControl} from 'react-bootstrap'

class MessageEditor extends Component {
  constructor() {
    super();
    this.state = {
      message: ''
    };
    this.onKeyUp = this.onKeyUp.bind(this);	  
  }

  onKeyUp(event) {
    if (event.charCode === 13) {
	  this.props.sendMessage(event.target.value);
	  event.target.value=''
	  this.setState({message: ''})
    }
  }
  
  render() {
    const {message} = this.state; 

    return (
	  <div>
        <InputGroup>
          <FormControl placeholder={message} onKeyPress={this.onKeyUp} />
        </InputGroup>
      </div>
    )
  }
}

export default MessageEditor;
