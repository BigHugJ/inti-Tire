import React, {Component} from 'react'
import Chat from './Chat';

function LoginButton(props) {
    return (
        <div>
        <h1>Welcome</h1>
        <button onClick={props.onClick}> 
        Login 
        </button></div>
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