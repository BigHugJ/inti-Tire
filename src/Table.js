import React from 'react';
import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image'

const TableBody = (props) => {
  const lu = props.loginUser;
  const senderName = lu + ".jpg";
  
  const rows = props.messagesData.map((row, index) => {

    if (row.messageSender === props.loginUser)
	  return (
	    <tr key={row.id} style={{ "textAlign": "right" }}>
		  <td></td>
		  <td >{row.message}</td>
		  <td style={{ "width": "5%" }}><Image src={senderName} alt="sender" width="40px" height="40px" rounded /></td>
	    </tr>
	  )
    else {
	  const senderName= row.messageSender + ".jpg"
	  return (
	    <tr key={row.id} >
		  <td style={{ "width": "5%" }}><Image src={senderName} alt="receiver" width="40px" height="40px" rounded /></td>
		  <td >{row.message}</td>
		  <td></td>
	    </tr>
	  )
    }
  }).reverse();

  return <Table ><tbody>{rows}</tbody></Table>;
}

const MessageTable = (props) => {
	const { messagesData, loginUser } = props;

	return (
		<TableBody messagesData={messagesData} loginUser={loginUser} />
	)
}

export default MessageTable
