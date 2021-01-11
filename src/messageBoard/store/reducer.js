import * as constants from './constants'

const defaultState={
		inputValue:'',
		list:[]
}

export default (state= defaultState,action )=>{
	
	if(action.type===constants.CHANGE_INPUT_VALUE){
		const newState = JSON.parse(JSON.stringify(state))
		newState.inputValue= action.value
		return newState
	}
	
	if(action.type===constants.ADD_MESSAGE_LIST){
		const newState = JSON.parse(JSON.stringify(state))
		newState.list.push(newState.inputValue)
		newState.inputValue=""
		return newState
	}
	
	if(action.type===constants.DELETE_MESSAGE){
		const newState = JSON.parse(JSON.stringify(state))
		newState.list.splice(action.index,1)
		return newState
	}
	

	if(action.type===constants.INIT_LIST){
		const newState = JSON.parse(JSON.stringify(state))
		newState.list = action.list
		return newState
	}
	
	return state

}