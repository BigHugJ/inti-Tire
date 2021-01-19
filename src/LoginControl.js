import React from 'react'
import { Container, Button, Jumbotron,InputGroup,FormControl,Card } from 'react-bootstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Image from 'react-bootstrap/Image'
import MainTab from './MainTab'
import axios from 'axios';



class LoginControl extends React.Component {
  constructor(props) {
	super(props)
    this.state = {
	  isLoggedIn: false,
	  loginUser: '',
	  show:false,
	  list:[],
	  loginUserAvatar:''
	  
	}
  }
  
  handleClick(username,avatar){
		this.setState({ loginUser: username,
						show: true, 
						loginUserAvatar:avatar })  
	  }
  
  handleLogin(){
	  this.setState({ isLoggedIn: true });
  }
  hideLoginBox(){
	  this.setState({ show: false });  
	  
  }
 
  loginPanel ()  {
	  return (
		  <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
	      <Card style={{ width: '30rem' }}  >
	      	<Card.Body>
	      		<button type="button" class="close" aria-label="Close" onClick={() => this.hideLoginBox()} >
	      			<span aria-hidden="true">&times;</span>
	      		</button>  
	      		<Image src={this.state.loginUserAvatar} alt="BUNNY" width="80px" height="80px" rounded />
	      		<p/> 
	      		<InputGroup className="mr-sm-2">
			      	<InputGroup.Prepend>
			      		<InputGroup.Text>user name</InputGroup.Text>
			      	</InputGroup.Prepend>
			      	<FormControl  className="mr-sm-2"/>
			    </InputGroup>
			    <br/>
			    <InputGroup className="mr-sm-2">
			    	<InputGroup.Prepend>
			      		<InputGroup.Text>password</InputGroup.Text>
			      	</InputGroup.Prepend>
			      	<FormControl  type="password" className="mr-sm-2"/>
			    </InputGroup>
			    <br/>
			    <Button variant="info" onClick={()=>this.handleLogin()}>Login</Button>	
			 </Card.Body>
		  </Card>
	  </div>
)}
  
 
  componentDidMount(){
	  axios.get('../data/UserData.json',{headers:{'content-type':'application/x-www-form-urlencoded'}}).then((res)=>{
		  this.setState({ list: res.data });  
		})
	}

  
  render() {
    const isLoggedIn = this.state.isLoggedIn
	const loginUser = this.state.loginUser


	if (this.state.isLoggedIn === false) {
	  return (
		<Container className="header">
	      <Jumbotron >
		    <h1>鸿雁之笺</h1>
		    {this.state.list.map((item,index)=>{return  <div style= {{display : 'inline-block',padding:'20px'}}>
		    <Button size="sm" type="input" onClick={(e)=>this.handleClick(item.username,item.avatar)} >
		      <Image src={item.avatar} alt={item.username} width="80px" height="80px" rounded />
		    </Button> </div>
	    })}
	      </Jumbotron>
	      {this.state.show === true? this.loginPanel():null}
	      
        </Container>
      )
	}
	else {
		console.log(this.state.loginUser);
		return <MainTab loginUser={loginUser} isLoggedIn={isLoggedIn} sendMessage={this.sendMessage} />
	}
  }
}

export default LoginControl;
