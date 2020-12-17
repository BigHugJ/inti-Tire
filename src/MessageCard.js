import Toast from 'react-bootstrap/Toast';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import {useState} from 'react'

function MessageToast () {
    const [show, setShow] = useState(false);

    return (
      <Row>
        <Col xs={6}>
          <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">flying message</strong>
              <small>{new Date().toLocaleString()}</small>
            </Toast.Header>
            <Toast.Body>给你看几秒钟啦!</Toast.Body>
          </Toast>
        </Col>
        <Col xs={6}>
          <Button onClick={() => setShow(true)}>message</Button>
        </Col>
      </Row>
    );
}

const MessageCard = () => {
    return (<MessageToast />)
}
export default MessageCard;
