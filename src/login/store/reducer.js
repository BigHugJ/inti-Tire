import * as constants from './constants'

const defaultState={
		isLoggedIn: false,
		loginUser: '',
		show:false,
		list:[],
		avatar:'',
		username:'',
		password:''
}

export default (state= defaultState,action )=>{
	
	if(action.type===constants.GET_USER_INFO){
		const newState = JSON.parse(JSON.stringify(state))
		newState.username= action.username
		newState.avatar= action.avatar
		newState.show =true;
		return newState
	}
	
	if(action.type===constants.UPDATE_USERNAME){
		const newState = JSON.parse(JSON.stringify(state))
		newState.username= action.username
		return newState
	}
	
	if(action.type===constants.UPDATE_PASSWORD){
		const newState = JSON.parse(JSON.stringify(state))
		newState.password= action.password
		return newState
	}
	
	if(action.type===constants.HIDE_LOGINBOX){
		const newState = JSON.parse(JSON.stringify(state))
		newState.show =false;
		return newState
	}
	
	if(action.type===constants.INIT_LIST){
		const newState = JSON.parse(JSON.stringify(state))
		newState.list = action.list
		return newState
	}
	
	if(action.type===constants.UPDATE_LOGIN_STATE){
		const newState = JSON.parse(JSON.stringify(state))
		newState.isLoggedIn = action.isLoggedIn
		return newState
	}
	
	if(action.type===constants.LOGOUT){
		const newState = JSON.parse(JSON.stringify(state))
		newState.isLoggedIn = false
		return newState
	}
	
	
	return state

}