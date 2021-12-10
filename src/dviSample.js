import Card from 'react-bootstrap/Card'
import ReactDOM from 'react-dom'
import React, {Component} from 'react'
import Image from 'react-bootstrap/Image'
import Table from 'react-bootstrap/Table'

const MsgDiv = (props) => {
 
  return (
    <div id="mCard"  style={{border:"1px",overflow: "auto", width: '100%', height: '500px', backgroundColor:'#e9ecef',textAlign: "center"}}>
	
	</div>
  )
  
}
  
const DivSample = (props) => {
  return (
	<MsgDiv />
  )
}

export default DivSample