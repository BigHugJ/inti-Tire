import Badge from 'react-bootstrap/Badge'

const OnlineButtons = (props) => {
  console.log("online people:")
  if (props.receivers) {
    console.log(props.receivers)

    const rs =props.receivers.map((receiver, index) => {
	  console.log(receiver)
	  return <Badge pill variant="primary">{receiver}</Badge>
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
		  <OnlineButtons receivers={receivers} />
		</div>
	  )
	else 
	  return (
		<div>
		  <Badge pill variant="primary">Total Messages: {totalMessages}</Badge>{' '}
		  <Badge pill variant="danger">You: {User}</Badge>{' '}
		  <Badge pill variant="primary">receivers: </Badge>
		  <OnlineButtons receivers={receivers} />
		</div>
	  )
		
}

const Counters = (props) => {
  const { totalMessages, loginUser, isLoggedIn, receivers } = props;
  return (
	<CounterBadge totalMessages={totalMessages} loginUser={loginUser} isLoggedIn={isLoggedIn} receivers= {receivers}/>
  )
}
export default Counters;
