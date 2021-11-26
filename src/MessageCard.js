import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button'
import { Container, Accordion, Card } from 'react-bootstrap'
import {useAccordionToggle} from 'react-bootstrap'

function CustomToggle({ children, eventKey }) {
	
	 useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });
  const decoratedOnClick = useAccordionToggle(eventKey, () =>
    console.log('totally custom!'),
  );
  return (
    <Accordion.Toggle onClick={decoratedOnClick}>
      {children}
    </Accordion.Toggle>
  );
}

function MCard (props) {
	const message = props.message;
	const eventKey = props.eventIndex
	
    return (
      <Card className="text-right" style={{"border-width": "thin" }}>
        <CustomToggle eventKey={eventKey}>hbh</CustomToggle>
        <Accordion.Collapse eventKey={eventKey}>
          <Card.Body >{message}</Card.Body>
        </Accordion.Collapse>
      </Card>
    );
}

const MessageCard = (props) => {
    return (<MCard message={props.message} eventIndex={props.eventIndex}/>)
}
export default MessageCard;