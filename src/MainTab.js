import React, {Component} from 'react'
import {Tabs, Tab,Nav} from 'react-bootstrap'
import Chat from './Chat'
import MessageBoard from './messageBoard/MessageBoard'
import { Provider } from 'react-redux'
import store from './store/';
import { Link, Route, BrowserRouter } from 'react-router-dom'

export default class MainTab extends React.Component{
	constructor(props){
		super(props);
	    this.state = {
	    		key: 1 | props.activeKey
	    }
	    this.handleSelect = this.handleSelect.bind(this);
	}
	 
	handleSelect (key) {
		console.log("selected " + key);
	    this.setState({key})
	}
	
	render(){
		const loginUser = this.props.loginUser;
		const isLoggedIn = this.props.isLoggedIn;
		return ( 
				<div class="container">
					<br/>
					  <Tabs variant="pills" 
				            activeKey={this.state.key}
				            onSelect={this.handleSelect}
				            id="controlled-tab-example"
				            >
				             <Tab eventKey={1} title="Chat">
				             	<br/>
				             	<Chat loginUser={loginUser} isLoggedIn={isLoggedIn} sendMessage={this.sendMessage} />
				             </Tab>
			                <Tab eventKey={2} title="Message Board">
			                	<br/>
			                	<Provider store={store}>
			                		<MessageBoard />
			                	</Provider>
			                </Tab>
			                </Tabs>
	            </div>
	        )
	}
}

