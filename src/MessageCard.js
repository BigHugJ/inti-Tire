import Toast from 'react-bootstrap/Toast';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import {useState} from 'react'
import { Container } from 'react-bootstrap';

function MessageToast (props) {
    const [show, setShow] = useState(false);
    const message = props.message;

    return (
    <Container>
      <Row>
        <Col xs={236}>
          <Toast onClose={() => setShow(false)} show={show} delay={4000} autohide>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong >f-message</strong>
              <small>{new Date().toLocaleString()}</small>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </Col>
        <Col xs={16}>
          <Button onClick={() => setShow(true)}>check</Button>
        </Col>
      </Row>
      </Container>
    );
}

const MessageCard = (props) => {
    return (<MessageToast message={props.message}/>)
}
export default MessageCard;
