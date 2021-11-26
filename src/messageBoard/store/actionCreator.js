import axios from 'axios';
import * as constants from './constants'

export const getEditorChangeAction = (content)=>({
	type:constants.CHANGE_INPUT_VALUE,
	value:content,
})

export const getSubmitAction = (sentTime,createBy)=>({
	type:constants.ADD_MESSAGE_LIST,
	sentTime,
	createBy
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
		axios.get('../../data/messageList.json',{headers:{'content-type':'application/x-www-form-urlencoded'}}).then((res)=>{
			const action= initListAction(res.data.data.list);
			dispatch(action);
		})
	}
}