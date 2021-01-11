import {combineReducers} from 'redux';
import {reducer as messageBoardReducer} from '../messageBoard/store'

const reducer =  combineReducers({
	messageBoard: messageBoardReducer
})
export default reducer;
