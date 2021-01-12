import React, {Component} from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import Chat from './Chat'
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
		return (
				 <div className="container">
				 <br/>
		             <Tabs variant="pills" 
		            activeKey={this.state.key}
		            onSelect={this.handleSelect}
		            id="controlled-tab-example"
		            >
		             <Tab eventKey={1} title="Chat">
		             	<br/>
		             	<Chat/>
		             </Tab>
	                <Tab eventKey={2} title="Message Board">
	                </Tab>
	            </Tabs>
	            </div>
	        )
	}
}

