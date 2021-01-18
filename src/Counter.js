import {Badge, Button} from 'react-bootstrap'

const OnlineButtons = (props) => {
  console.log("online people:")
  if (props.receivers) {
    console.log(props.receivers)

    const rs =props.receivers.map((receiver, index) => {
	  console.log("OnlineButtons:"+receiver)
	  return <Button pill variant="link" size="sm" onClick={props.connectToReceiver(receiver)}>{receiver}</Button>
    })
  
    return rs
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
		  <OnlineButtons receivers={receivers} connectToReceiver={props.connectToReceiver} />
		</div>
	  )
	else 
	  return (
		<div>
		  <Badge pill variant="primary">Total Messages: {totalMessages}</Badge>{' '}
		  <Badge pill variant="danger">You: {User}</Badge>{' '}
		  <Badge pill variant="primary">receivers: </Badge>
		  <OnlineButtons receivers={receivers} connectToReceiver={props.connectToReceiver} />
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
