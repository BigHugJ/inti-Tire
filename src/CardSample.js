import Card from 'react-bootstrap/Card'
import ReactDOM from 'react-dom'
import React, {Component} from 'react'
import Image from 'react-bootstrap/Image'
import Table from 'react-bootstrap/Table'

const CardSample = (props) => {
  const senderName = props.loginUser + ".jpg";
  var receiverName="noone.jpg"
  var connectionIcon = "noconnection.jpg"
  if (props.connectedList.length > 0) {
	receiverName = props.connectedList[0]+ ".jpg";
  }
  if (props.isConnected) {
    connectionIcon = "connected.jpg"	  
  }
  return (
    <Card style={{ border:"none",width: '100%', "textAlign": "center", backgroundColor:'#e9ecef'}}>
      <Card.Body >
        <Card.Title>
		  <table>
		    <tr>
			  <td>
				<Image src={receiverName} alt={receiverName} width="40px" height="40px" style={{"border-radius":"50%"}} />
			  </td>
			  <td id="mTitle" style={{width: '100%', "textAlign": "center"}}>
		      </td>
			  <td>
				<Image src={senderName} alt={senderName} width="40px" height="40px" style={{"border-radius":"50%"}} />
			  </td>
		    </tr>
		  </table>
		</Card.Title>
		<Card.Text id="mCard" >
	    </Card.Text>
      </Card.Body>
	
    </Card>
  )
  
}
  
const MesssgeCard = (props) => {
  return (
	<CardSample loginUser={props.loginUser} connectedList={props.connectedList} isConnected={props.isConnected}/>
  )
}

export default MesssgeCard