import React from 'react'
import Chat from './Chat';
import { Container, Button, Jumbotron } from 'react-bootstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Image from 'react-bootstrap/Image'
import MainTab from './MainTab'

class LoginControl extends React.Component {
  constructor(props) {
	super(props)
    this.state = {
	  isLoggedIn: false,
	  loginUser: ''
    }
  }

  clickWolf = () => {
	console.log("click wolf")

	this.setState({ isLoggedIn: true });
	this.setState({ loginUser: "wolf" });  
	
  }
  clickBunny = () => {
	console.log("click wolf")

	this.setState({ isLoggedIn: true });
	this.setState({ loginUser: "bunny" });  
	
  }
  
  render() {
    const isLoggedIn = this.state.isLoggedIn
	const loginUser = this.state.loginUser

	console.log("okok")

	if (this.state.isLoggedIn === false) {
	  return (
		<Container className="header">
	      <Jumbotron >
		    <h1>鸿雁之笺</h1>
		    <Button size="sm" type="input" onClick={this.clickWolf} >
		      <Image src="wolf.jpg" alt="WOLF" width="80px" height="80px" rounded />
		    </Button>
		    {" "}
		    <Button size="sm" type="input" onClick={this.clickBunny}>
		      <Image src="bunny.jpg" alt="BUNNY" width="80px" height="80px" rounded />
		    </Button>
	      </Jumbotron>
        </Container>
      )
	}
	else {
		console.log(this.state.loginUser);
		return <MainTab loginUser={loginUser} isLoggedIn={isLoggedIn} sendMessage={this.sendMessage} />
	}
  }
}

export default LoginControl;
