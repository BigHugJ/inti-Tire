import Badge from 'react-bootstrap/Badge'

function CounterBadge (props) {
	const unreaded = props.unreaded
	const totalMessages = props.totalMessages
	return (
		<div>
		  <Badge pill variant="primary">Total Messages {totalMessages}</Badge>{' '}
		  <Badge pill variant="danger">Unreaded {unreaded}</Badge>{' '}
		</div>
	)
}

const Counters = (props) => {
  const { totalMessages, unreaded } = props;
  return (
	<CounterBadge totalMessages={totalMessages} unreaded={unreaded} />
  )
}
export default Counters;
