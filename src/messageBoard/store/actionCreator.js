import axios from 'axios';
import * as constants from './constants'

export const getEditorChangeAction = (content)=>({
	type:constants.CHANGE_INPUT_VALUE,
	value:content
})

export const getSubmitAction = ()=>({
	type:constants.ADD_MESSAGE_LIST
})

export const getDeleteAction = (index)=>({
	type:constants.DELETE_MESSAGE,
	index
})

export const initListAction = (data)=>({
	type:constants.INIT_LIST,
	list: data
})

export const getMessageList = ()=>{
	return (dispatch)=>{
		axios.get('http://localhost:8080/user/',{headers:{'content-type':'application/x-www-form-urlencoded'}}).then((res)=>{
			const action= initListAction(res.data);
			dispatch(action);
		})
	}
}