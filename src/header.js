import React, {Component} from 'react'
import {Image,DropdownButton,Dropdown, Button,Modal} from 'react-bootstrap'
import { HashRouter,Link, Route} from 'react-router-dom'
import './App.css'
import Chat from './Chat'
import store from './store/';
import { Provider } from 'react-redux'
import MessagaeBoard from './messageBoard/MessageBoard'

export default class Header extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			show:false
		}
	}
	
	logOut(){
		this.props.logout()
	}

	handleShow(){
		this.setState({ show: true })
	}
	
	handleClose(){
		this.setState({ show: false })
	}
	 
	render (){
		const loginUser = this.props.loginUser;
		return (
				<HashRouter>
					<div style={{ backgroundColor:'#24292e',height:'70px'}}  >
						<div style={{ padding:'20px 0 0 50px',color:'orange'}} ><b>Hello {loginUser}!</b>
						<span style={{ paddingLeft:'60px'}} ><b><Link  style={{ color:'white'}} to='/chat'>Chat</Link> </b></span>
						<span style={{ padding:'60px'}} ><b><Link  style={{ color:'white'}} to='/messageBoard'>Message Board</Link> </b></span>
					</div>
					<DropdownButton title="temp" style={{float:'right',margin:'-25px 30px 0 0'}} variant="dark" className="headerDropDown" >
						<Dropdown.Item onClick={()=>this.logOut()}>Log Out</Dropdown.Item>
					</DropdownButton>
					<Image style={{float:'right',margin:'-35px 15px 0 0'}} src={this.props.userAvatar} width="50px" height="50px" className="circular--squareP" />
					<Button style={{float:'right',margin:'-27px 30px 0 0'}} onClick={()=>this.handleShow()}> Hide </Button>
			
					<Modal show={this.state.show} onHide={()=>this.handleClose()} size="lg"   backdrop="static"  keyboard={false}>
			        	<Modal.Header closeButton>
			        		<Modal.Title>React Tutorial</Modal.Title>
			        	</Modal.Header>
				        <Modal.Body>
				        	<Image  src="hideImage.jpg" width="700px" height="400px" />
				        </Modal.Body>
				        <Modal.Footer>
				        	<Button variant="secondary" onClick={()=>this.handleClose()}>Close</Button>
				        </Modal.Footer>
			        </Modal>
			        <div>
				      	<Route path='/' exact render={() => {return <Chat /> }} />
					    <Route path='/chat' render={() => {return <Chat /> }} />
						<Route path='/messageBoard' render={() => {
							return <Provider store={store}><MessagaeBoard  loginUser={loginUser}/></Provider>
						}} />
				     </div>
				     </div>
				</HashRouter>	
		)
	}
}