import React from 'react';
import MessageCard from './MessageCard'
import {Accordion} from 'react-bootstrap' 

const TableBody = props => { 
  const rows = props.messagesData.map((row, index) => {
    return (
	  <MessageCard message={row.message} eventIndex={index+1}/>
    );
  });

  return <Accordion>{rows}</Accordion>;
}

const Table = (props) => {
  const { messagesData, removeMessage } = props;
  return (
    <TableBody messagesData={messagesData} removeMessage={removeMessage} />  
  )
}

export default Table
