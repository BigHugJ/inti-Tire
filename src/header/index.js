import React, {Component} from 'react'
import {Image,DropdownButton,Dropdown} from 'react-bootstrap'
import { HashRouter,Router,Link, Route,Switch,Redirect} from 'react-router-dom'
import '../App.css'
import Chat from '../Chat'
import store from '../store/';
import { Provider } from 'react-redux'
import MessagaeBoard from '../messageBoard/MessageBoard'

export default class Header extends React.Component{
	signOut(){
		this.props.logout()
	}

	render (){
		const loginUser = this.props.loginUser;
		const isLoggedIn = this.props.isLoggedIn;
		return (
				<HashRouter>
		<div style={{ backgroundColor:'#24292e',height:'70px'}}  >
		
			<div style={{ padding:'20px 0 0 50px',color:'orange'}} ><b>Hello {loginUser}!</b>
			<span style={{ paddingLeft:'60px'}} ><b><Link  style={{ color:'white'}} to='/chat'>Chat</Link> </b></span>
			<span style={{ padding:'60px'}} ><b><Link  style={{ color:'white'}} to='/messageBoard'>Message Board</Link> </b></span>
			</div>
			<DropdownButton style={{float:'right',margin:'-25px 30px 0 0'}} variant="dark" className="headerDropDown" >
			  <Dropdown.Item onClick={()=>this.signOut()}>Sign Out</Dropdown.Item>
			</DropdownButton>
			<Image style={{float:'right',margin:'-35px 15px 0 0'}} src={this.props.userAvatar} width="50px" height="50px" className="circular--squareP" />
			
				
				
	      
	       
	        
	        <div>
			<Route path='/' exact render={() => {
	            return <Chat />
	          }} />
	          <Route path='/chat' render={() => {
	            return <Chat />
	          }} />
			 <Route path='/signout' render={() => {
		            return <Chat />
		          }} /> 
			<Route path='/messageBoard' render={() => {
		            return <Provider store={store}><MessagaeBoard /></Provider>
		          }} />
	        </div>
	      
	          </div>
			
		 </HashRouter>	
		)
	}
}