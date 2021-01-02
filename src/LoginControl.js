import React, {Component} from 'react'
import Chat from './Chat';
import {Container, Button, ButtonGroup, Jumbotron} from 'react-bootstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Image from 'react-bootstrap/Image'

function LoginButton(props) {
    return (
        <Container className="header">
          <Jumbotron >
		  <h1>鸿雁之笺</h1>
		  <Button size="sm" type="input"  onClick={props.onClick('wolf')}>
			<Image src="wolf.jpg" alt="WOLF" width="80px" height="80px" rounded/>
		  </Button>
		  {" "}
		  <Button size="sm" type="input"  onClick={props.onClick('bunny')}>
			<Image src="bunny.jpg" alt="BUNNY" width="80px" height="80px" rounded/>
		  </Button>
		  </Jumbotron>
		</Container>
    );
}

class LoginControl extends React.Component {
    state = {isLoggedIn: false,
			 loginUser:''
			 };

    handleLoginClick = user => () => {
        this.setState({isLoggedIn: true});
		this.setState({loginUser: user});
    };

    render() {
	const isLoggedIn = this.state.isLoggedIn;
	const loginUser = this.state.loginUser
        let page;

        if (!isLoggedIn)
            page = <LoginButton onClick={this.handleLoginClick} />
        else
            page = <Chat loginUser={loginUser}/>

        return (
            <div>
                {page}
            </div>
            
        ) 
    }
}

export default LoginControl;
