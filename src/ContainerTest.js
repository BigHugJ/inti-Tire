import React, {Component} from 'react'
import { Container, Row, Col } from 'react-bootstrap'

class ContainerTest extends Component {
    render () {
        return (
            <Container style={{"background-color": "#e8edf2", "borderWidth":"1px", 'borderColor':"#abbaaa", 'borderStyle':'solid'}}>
  <Row className="justify-content-md-center" >
    <Col xs lg="2" style={{"borderWidth":"1px", 'borderColor':"#abbaaa", 'borderStyle':'solid'}}>
      1 of 3
    </Col>
    <Col md="auto" style={{"borderWidth":"1px", 'borderColor':"#abbaaa", 'borderStyle':'solid'}}>Variable width content</Col>
    <Col xs lg="2" style={{"borderWidth":"1px", 'borderColor':"#abbaaa", 'borderStyle':'solid'}}>
      3 of 3
    </Col>
  </Row>
  <Row>
    <Col>1 of 3</Col>
    <Col md="auto">Variable width content</Col>
    <Col xs lg="2">
      3 of 3
    </Col>
  </Row>
</Container>
        )
    }
}

export default ContainerTest;