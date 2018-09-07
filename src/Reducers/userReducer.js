import {USER} from '../Action/type';
const initialState ={
    email:'',
    password:''
} 
export default function(state=initialState,action)
{
switch(action.type){
    case USER:
    return {
        ...state,
        email:action.email,
        password:action.password
    }
    default:
    return state;
}

}