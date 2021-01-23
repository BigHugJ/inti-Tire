import {Badge, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import {useState} from 'react';

const OnlineButtons = (props) => {
  console.log("online people:")
  const [value, setValue] = useState(['']);

  if (props.receivers.length > 1) {
    console.log(props.receivers)
    const rs =props.receivers.map((receiver, index) => {
	  if (props.User === receiver)
	    return ''
	  else
	    return <ToggleButton variant="warning" size="sm" value={receiver} >{receiver}</ToggleButton> 
    })
  
    return <ToggleButtonGroup type="checkbox" value={value} onChange={props.connectToReceiver}>{rs}</ToggleButtonGroup>
  }
  else
    return  <Badge pill variant="danger">No one</Badge>
}

const CounterBadge = (props) => {
	const User = props.loginUser
	const totalMessages = props.totalMessages
	const isLoggedIn = props.isLoggedIn
	const receivers = props.receivers

	console.log("CounterBadge:")
    console.log(props.receivers)

	if (isLoggedIn)
	  return (
		<div>
		  <Badge pill variant="primary">Total Messages: {totalMessages}</Badge>{' '}
		  <Badge pill variant="primary">You: {User}</Badge>{' '}
		  <Badge pill variant="primary">online: </Badge>{' '}
		  <OnlineButtons receivers={receivers} connectToReceiver={props.connectToReceiver} User={User}/>
		</div>
	  )
	else 
	  return (
		<div>
		  <Badge pill variant="primary">Total Messages: {totalMessages}</Badge>{' '}
		  <Badge pill variant="danger">You: {User}</Badge>{' '}
		  <Badge pill variant="primary">receivers: </Badge>
		  <OnlineButtons receivers={receivers} connectToReceiver={props.connectToReceiver} User={User}/>
		</div>
	  )
		
}

const Counters = (props) => {
  const { totalMessages, loginUser, isLoggedIn, receivers } = props;
  return (
	<CounterBadge totalMessages={totalMessages} loginUser={loginUser} isLoggedIn={isLoggedIn} receivers= {receivers} connectToReceiver={props.connectToReceiver}/>
  )
}
export default Counters;
