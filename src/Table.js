import React from 'react';

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
        <td>{row.message}</td>
        <td>{row.sender}</td>
        <td><button onClick={() => props.removeMessage(index)}>Del</button></td>
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

export default Table;
