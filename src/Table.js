import React from 'react';
import MessageCard from './MessageCard'
import {Container, Row, Col, Accordion} from 'react-bootstrap' 
import Table from 'react-bootstrap/Table'

const TableBody = props => { 

  const rows = props.messagesData.map((row, index) => {
    if (row.sender === 'Me')
	  return (
	    <tr>
		  <td></td>
		  <td>{row.message}</td>
	    </tr>
    )
	else
	  return (
	    <tr>
		  <td>{row.message}</td>
		  <td></td>
	    </tr>
    )
		
  });
	
  return <Table striped hover >{rows}</Table>;
}

const MessageTable = (props) => {
  const { messagesData, calculateMessagCount} = props;

  return (
    <TableBody messagesData={messagesData} />  
  )
}

export default MessageTable
