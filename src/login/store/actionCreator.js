import axios from 'axios';
import * as constants from './constants'

export const showUserLoginAction = (username,avatar)=>({
	type:constants.GET_USER_INFO,
	username,
	avatar
})
export const handleUserNameChangeAction = (username)=>({
	type:constants.UPDATE_USERNAME,
	username
})

export const handlePasswordChangeAction = (password)=>({
	type:constants.UPDATE_PASSWORD,
	password
})

export const handleHideLoginBoxAction = ()=>({
	type:constants.HIDE_LOGINBOX
})

export const handleLogoutAction = ()=>({
	type:constants.LOGOUT
})

export const getSubmitAction = (username,password)=>{
	
	return (dispatch)=>{
		 axios.get('../../data/userData.json', {
				params: {
					username: username,
					password: password
				}}
		    ).then((res)=>{
		    	 const action= setLoginStateAction(true);
		    		dispatch(action);
			})
	}
}

export const setLoginStateAction = (isLoggedIn)=>({
	type:constants.UPDATE_LOGIN_STATE,
	isLoggedIn
})

export const initListAction = (data)=>({
	type:constants.INIT_LIST,
	list: data
})

export const getUserList = ()=>{
	return (dispatch)=>{
		axios.get('../../data/UserData.json',{headers:{'content-type':'application/x-www-form-urlencoded'}}).then((res)=>{
			const action= initListAction(res.data);
			dispatch(action);
		})
	}
}