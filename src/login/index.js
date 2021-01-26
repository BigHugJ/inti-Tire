import React from 'react'
import { Container, Button, Jumbotron,InputGroup,FormControl,Card } from 'react-bootstrap'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Image from 'react-bootstrap/Image'
import Header from '../header.js'
import { connect } from "react-redux";
import {actionCreator} from './store';

class Login extends React.Component {
  
  loginPanel ()  {
	  return (
		  <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
	      <Card style={{ width: '30rem' }}  >
	      	<Card.Body>
	      		<button type="button" class="close" aria-label="Close" onClick={() => this.props.hideLoginBox()} >
	      			<span aria-hidden="true">&times;</span>
	      		</button>
	      		<Image src={this.props.avatar} width="80px" height="80px" rounded />
	      		<p/> 
	      		<InputGroup className="mr-sm-2">
			      	<InputGroup.Prepend>
			      		<InputGroup.Text >user name</InputGroup.Text>
			      	</InputGroup.Prepend>
			      	<FormControl onChange={(e)=>this.props.handleUserNameChange(e.target.value)}  className="mr-sm-2"/>
			    </InputGroup>
			    <br/>
			    <InputGroup className="mr-sm-2">
			    	<InputGroup.Prepend>
			      		<InputGroup.Text>password</InputGroup.Text>
			      	</InputGroup.Prepend>
			      	<FormControl  onChange={(e)=>this.props.handlePasswordChange(e.target.value)} type="password" className="mr-sm-2"/>
			    </InputGroup>
			    <br/>
			    <Button variant="info" onClick={()=>this.props.handleSubmit(this.props.username,this.props.password)}>Login</Button>	
			 </Card.Body>
		  </Card>
	  </div>
)}
  
 
  componentDidMount(){
	  this.props.initMessageList()
	}

  
  render() {
    const isLoggedIn = this.props.isLoggedIn
	const loginUser = this.props.loginUser
	if (isLoggedIn === false) {
	  return (
		<Container className="header">
	      <Jumbotron >
		    <h1>鸿雁之笺</h1>
		    {this.props.list.map((item,index)=>{return  <div style= {{display : 'inline-block',padding:'20px'}}>
		    <Button size="sm" type="input" onClick={(e)=>this.props.handleUserClick(item.username,item.avatar)} >
		      <Image src={item.avatar} alt={item.username} width="80px" height="80px" rounded />
		    </Button> </div>
	    })}
	      </Jumbotron>
	      {this.props.show === true? this.loginPanel():null}
	      
        </Container>
      )
	}
	else {
		return <Header loginUser={loginUser} userAvatar={this.props.avatar} logout={()=>this.props.handleLogout()} isLoggedIn={isLoggedIn} sendMessage={this.sendMessage} />
	}
  }
}

const mapStateToProps = (state) => {
	return {
		username:state.login.username,
		password:state.login.password,
		show:state.login.show,
		avatar:state.login.avatar,
		list:state.login.list,
		isLoggedIn:state.login.isLoggedIn
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		handleUserClick(username,avatar){
			dispatch(actionCreator.showUserLoginAction(username,avatar))
		},
		handleUserNameChange(username){
			dispatch(actionCreator.handleUserNameChangeAction(username))
		},
		handlePasswordChange(password){
			dispatch(actionCreator.handlePasswordChangeAction(password))
		},
		hideLoginBox(){
			dispatch(actionCreator.handleHideLoginBoxAction())
		},
		handleSubmit(username,password){
			dispatch(actionCreator.getSubmitAction(username,password))
		},
		initMessageList(){
			dispatch(actionCreator.getUserList())
		},
		handleLogout(){
			dispatch(actionCreator.handleLogoutAction())
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);