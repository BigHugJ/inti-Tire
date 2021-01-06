import React from 'react'
import Chat from './Chat';
import { Container, Button, Jumbotron } from 'react-bootstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Image from 'react-bootstrap/Image'
import SockJS from "sockjs-client"
import Stomp from "stompjs"

var url = 'http://192.168.2.27:8080/gs-guide-websocket';
var options = {
	host: '192.168.2.27',
	oringin: '192.168.2.35'
};
var sockjs = new SockJS(url, /*_reserved*/null, options);
var stompClient = Stomp.over(sockjs);

function LoginButton(props) {
	return (
		<Container className="header">
			<Jumbotron >
				<h1>鸿雁之笺</h1>
				<Button size="sm" type="input" onClick={props.onClick('wolf')}>
					<Image src="wolf.jpg" alt="WOLF" width="80px" height="80px" rounded />
				</Button>
				{" "}
				<Button size="sm" type="input" onClick={props.onClick('bunny')}>
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

	handleLoginClick = user => () => {
		console.log("connecting...")
		stompClient.connect({}, this.connectionSuccess(user));
	}

	connectionSuccess(user) {
		console.log("connected")

		this.setState({ isLoggedIn: true });
		this.setState({ loginUser: user });

		stompClient.subscribe('/topic/javainuse', this.onMessageReceived);

		stompClient.send("/app/chat.newUser", {}, JSON.stringify({
			messageSender: user,
			message: 'first connection',
		}))
	}


	onMessageReceived = payload => () => {
		var respMessage = JSON.parse(payload.body);
		console.log(respMessage.message)
	}

	sendMessage = chatMsg => () => {
		console.log(chatMsg)
		if (chatMsg && stompClient) {
			var chatMessage = {
				messageSender : this.state.user,
				messageReceiver: 'you',
				message : chatMsg
			};
	
			stompClient.send("/app/chat.sendMessage", {}, JSON
					.stringify(chatMessage));
		}
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
