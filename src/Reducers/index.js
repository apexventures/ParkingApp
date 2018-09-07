import {combineReducers} from 'redux';
import AuthReducer from '../Reducers/AuthReducer'
import userReducer from './userReducer'
export default combineReducers({
auth:AuthReducer, 
user:userReducer 
});
 