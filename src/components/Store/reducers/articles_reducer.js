import { GET_ARTICLES,GET_TOS } from '../types';




export default function(state={},action){
    switch(action.type){
        case GET_ARTICLES:
            return {...state, list:action.payload} 
        break;
        case GET_TOS:
            return{...state,list:action.payload}
        break;
        default:
            return state;
    }
}