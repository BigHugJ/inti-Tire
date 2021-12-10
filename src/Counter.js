import {Badge, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import {useState} from 'react';

const OnlineButtons = (props) => {
    const [value, setValue] = useState(['']);

    if (props.receivers.length > 1) {
        const rs =props.receivers.map((receiver, index) => {
	        if (props.User === receiver)
	            return ''
	        else if (props.isChannel === true)
	            return <ToggleButton variant="success" size="sm" value={receiver} >{receiver}</ToggleButton>
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
	const isConnected = props.isConnected
	const isChannel = props.isChannelBuilt

	if (isConnected)
	  return (
		<div >
		    <div class="row containter">
		        <div class="col text-left">
                    <OnlineButtons receivers={receivers} connectToReceiver={props.connectToReceiver} User={User} isChannel={isChannel} />
                </div>
                <div class="col text-right">
                  <Badge pill variant="primary">Total Messages: {totalMessages}</Badge>{' '}
                  <Badge pill variant="primary">You: {User}</Badge>{' '}
                  <Badge pill variant="primary">online: </Badge>{' '}
                </div>
            </div>
		</div>
	  )
	else
	  return (
		<div >
		    <div class="row containter">
		        <div class="col text-left">
    	            <OnlineButtons receivers={receivers} connectToReceiver={props.connectToReceiver} User={User} isChannelBuilt={isChannel} />
    	        </div>
    	        <div class="col text-right">
                    <Badge pill variant="primary">Total Messages: {totalMessages}</Badge>{' '}
                    <Badge pill variant="info">connecting...</Badge>{' '}
                    <Badge pill variant="primary">receivers: </Badge>
                </div>
            </div>
		</div>
	  )
}

const Counters = (props) => {
  const { totalMessages, loginUser, isLoggedIn, receivers, isConnected } = props;
  return (
	<CounterBadge totalMessages={totalMessages} isConnected={isConnected} loginUser={loginUser} isLoggedIn={isLoggedIn} receivers= {receivers} connectToReceiver={props.connectToReceiver} isChannelBuilt={props.isChannelBuilt}/>
  )
}
export default Counters;