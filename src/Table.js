import React from 'react';
import MessageCard from './MessageCard'

const TableHeader = () => { 
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
      </tr>
    </thead>
  );
}

const TableBody = props => { 
  const rows = props.messagesData.map((row, index) => {
    return (
      <tr key={index}>
        <td><MessageCard message={row.message}/></td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
}

const Table = (props) => {
  const { messagesData, removeMessage } = props;
  return (
    <table>
      <TableBody messagesData={messagesData} removeMessage={removeMessage} />
    </table>
  )
}

export default Table