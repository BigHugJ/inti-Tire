import React from 'react'
import Chat from './Chat';
import { Container, Button, Jumbotron } from 'react-bootstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Image from 'react-bootstrap/Image'
import SockJS from "sockjs-client"
import Stomp from "stompjs"


function LoginButton(props) {
	return (
		<Container className="header">
			<Jumbotron >
				<h1>鸿雁之笺</h1>
				<Button size="sm" type="input"  >
					<Image src="wolf.jpg" alt="WOLF" width="80px" height="80px" rounded />
				</Button>
				{" "}
				<Button size="sm" type="input" >
					<Image src="bunny.jpg" alt="BUNNY" width="80px" height="80px" rounded />
				</Button>
			</Jumbotron>
		</Container>
	);
}

class LoginControl extends React.Component {
	state = {
		isLoggedIn: false,
		loginUser: ''
	};

	handleLoginClick = () => {
		console.log("connecting...")
		this.setState({ isLoggedIn: true });
		this.setState({ loginUser: '' });
	}

	connectionSuccess(user) {
		console.log("connected")

		this.setState({ isLoggedIn: true });
		this.setState({ loginUser: user });

		
	}


	sendMessage = chatMsg => () => {
		console.log(chatMsg)
		
	}

	render() {
		const isLoggedIn = this.state.isLoggedIn;
		const loginUser = this.state.loginUser

		let page;

		if (!isLoggedIn)
			page = <LoginButton onClick={this.handleLoginClick} />
		else {
			page = <Chat loginUser={loginUser} isLoggedIn={isLoggedIn} sendMessage={this.sendMessage} />
		}
		return (
			<div>
				{page}
			</div>

		)
	}
}

export default LoginControl;
