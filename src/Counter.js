import Badge from 'react-bootstrap/Badge'

function CounterBadge (props) {
	const User = props.loginUser
	const totalMessages = props.totalMessages
	const isLoggedIn = props.isLoggedIn
	if (isLoggedIn)
	  return (
		<div>
		  <Badge pill variant="primary">Total Messages: {totalMessages}</Badge>{' '}
			<Badge pill variant="primary">You: {User}</Badge>
		</div>
	  )
	else 
	  return (
		<div>
		  <Badge pill variant="primary">Total Messages: {totalMessages}</Badge>{' '}
			<Badge pill variant="danger">You: {User}</Badge>
		</div>
	  )
		
}

const Counters = (props) => {
  const { totalMessages, loginUser, isLoggedIn } = props;
  return (
	<CounterBadge totalMessages={totalMessages} loginUser={loginUser} isLoggedIn={isLoggedIn} />
  )
}
export default Counters;
