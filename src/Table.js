import React from 'react';
import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image'

const TableBody = (props) => {
	const lu = props.loginUser;
	const imgName = lu + ".jpg";

	const rows = props.messagesData.map((row, index) => {

		if (row.sender === 'Me')
			return (
				<tbody>
					<tr style={{ "text-align": "right" }}>
						<td></td>
						<td style={{ "background-color": " #33CCFF", "padding": "0px", "vertical-align": "middle" }}>{row.message}</td>
						<td style={{ "width": "5%" }}><Image src={imgName} alt="user" width="40px" height="40px" rounded /></td>
					</tr>
				</tbody>
			)
		else
			return (
				<tbody>
					<tr>
						<td style={{ "width": "5%" }}><Image src="me.jpg" alt="Girl in a jacket" width="40px" height="40px" rounded /></td>
						<td style={{ "background-color": "#00CCCC" }}>{row.message}</td>
						<td></td>
					</tr>
				</tbody>
			)

	}).reverse();

	return <Table hover borderless responsive style={{ "border-collapse": "separate", "padding": "0px" }}>{rows}</Table>;
}

const MessageTable = (props) => {
	const { messagesData, loginUser } = props;

	return (
		<TableBody messagesData={messagesData} loginUser={loginUser} />
	)
}

export default MessageTable
