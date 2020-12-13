import React, {Component} from 'react';

class Form extends Component {
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
    this.setState(this.initialState);
  }

  render() {
    const {message} = this.state; 

    return (
      <form onSubmit={this.onFormSubmit}>
        <input  
          type= "text" 
          name= "message" 
          id= "name"
          value={message} 
          onChange={this.handleChange}/>
		  
        <button type="submit">send</button>
      </form>
    )
  }
}

export default Form;
