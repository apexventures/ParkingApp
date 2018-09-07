import {AUTH} from '../Action/type';
const initialState={
    isAuth:false
}
export default function(state=initialState,action)
{
    switch(action.type){
        case AUTH:
        return{
            ...state,
            isAuth:action.isAuth
        }
        default:
        return state;
    }
}