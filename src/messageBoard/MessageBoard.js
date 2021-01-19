import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button,Card,ListGroup} from 'react-bootstrap'
import SunEditor,{buttonList} from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { connect } from "react-redux";
import {actionCreator} from './store';



class MessageBoard extends React.Component{
	
		getCardItem(){
			return this.props.list.map((item,index) =>{
			return <div class="cardStyle" key={index}>
			<Card >
			<Card.Body>
			<Card.Subtitle className="mb-2 text-muted">
				<div style={{color:'##007bff'}} >From Jenny:&nbsp;&nbsp;&nbsp;{item.sentTime}
					<button type="button" class="close" aria-label="Close" key={index} onClick={(e) => this.props.handleItemDelete(index)} >
						<span aria-hidden="true">&times;</span>
					</button>  
				</div>
			</Card.Subtitle>
			<Card.Text>
				<div dangerouslySetInnerHTML = {{ __html: item.content }} />
			</Card.Text>
		</Card.Body>
			</Card></div>
			})
		}
	
	render(){ 
		const { inputValue, list } = this.props;
		return(
			<div>
					{this.getCardItem()}
				 <br/>
				
				 <br/>
				   <SunEditor setOptions={{
						buttonList: buttonList.complex
				}} setContents={inputValue} onChange={this.props.handleEditorChange}/>
				   <br/>
				   <Button onClick={this.props.handleSubmit} >post</Button>&nbsp;&nbsp;
			</div>
		);
	}
	
	componentDidMount(){
		this.props.initMessageList()
	}

}

const mapStateToProps = (state) => {
	return {
	  inputValue:state.messageBoard.inputValue,
	  list:state.messageBoard.list
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		handleEditorChange(content){
			dispatch(actionCreator.getEditorChangeAction(content))
		},
		handleSubmit(){
			const currentTime = new Date().toLocaleString('en-CA');
			dispatch(actionCreator.getSubmitAction(currentTime))
		},
		handleItemDelete(key){
			dispatch(actionCreator.getDeleteAction(key))
		},
		initMessageList(){
			dispatch(actionCreator.getMessageList())
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(MessageBoard);