import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button'
import {useState} from 'react'

function AlertDismissibleExample() {
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Oh snap! Demo for the chatting</Alert.Heading>
          <p>
            Message box still close itself few seconds later. Keep secret, love life!
          </p>
        </Alert>
      );
    }
    return <Button onClick={() => setShow(true)}>Show Alert</Button>;
  }

const Example = () => {
    return (<AlertDismissibleExample />)
}

export default Example;