import {combineReducers} from 'redux';
import {reducer as messageBoardReducer} from '../messageBoard/store'
import {reducer as loginReducer} from '../login/store'

const reducer =  combineReducers({
	messageBoard: messageBoardReducer,
	login: loginReducer
})
export default reducer;
