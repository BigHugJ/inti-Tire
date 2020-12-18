import React, {Component} from 'react'
import Chat from './Chat';
import Button from 'react-bootstrap/Button'

function LoginButton(props) {
    return (
        <div>
        <h1>鸿雁之笺</h1>
        <Button onClick={props.onClick}> 
            Login 
        </Button></div>
    );
}

class LoginControl extends React.Component {
    handleLoginClick = this.handleLoginClick.bind(this);
    state = {isLoggedIn: false};

    handleLoginClick() {
        this.setState({isLoggedIn: true});
    };

    render() {
        const loginStatus = this.state.isLoggedIn;
        let page;

        if (!loginStatus)
            page = <LoginButton onClick={this.handleLoginClick} />
        else
            page = <Chat />

        return (
            <div>
                {page}
            </div>
            
        ) 
    }
}

export default LoginControl;