import {
    REGISTER_USER,SIGN_USER,AUTO_SIGN_IN,PASSWORD_RESET,TOS_ACCEPTED,
    PROFILE_UPDATE_PHOTO,GET_USER_DATA,
    LOG_OUT,PASSWORD_CHANGE,DELETE_ACCOUNT,SEND_TOKEN,
    PROFILE_UPDATE,SET_PICTURES
}
     from '../types';
     import {START_ADD_PLACE} from '../actions/user_actions';


export default function(state ={},action){
    switch(action.type){
        case SIGN_USER:
                return{
                    ...state,
                    userData:{
                        uid:action.payload.localId || false,
                        token:action.payload.idToken || false,
                        refToken:action.payload.refreshToken || false,  
                }
            }
        break;
        case REGISTER_USER:
            return{
                ...state,
                userData:{
                    uid:action.payload.localId || false,
                    token:action.payload.idToken || false,
                    refToken:action.payload.refreshToken || false,

            }
        }
        break;
        case AUTO_SIGN_IN:
        return{
            ...state,
            userData:{
                uid:action.payload.user_id || false,
                token:action.payload.id_token || false,
                refToken:action.payload.refresh_token || false,
        }
    }
        break;
        case PASSWORD_RESET:
        return{
            ...state,
            userData:{
               email:action.payload.email || false,             
        }
    }
        break;
        case LOG_OUT:
        return {
            ...state,
            token:null
        };
        break;
        case PASSWORD_CHANGE:
        return{
            ...state,userData:action.payload
        }
        break;
        case DELETE_ACCOUNT:
        return{
            ...state,userData:action.payload
        }
        break;
        case SEND_TOKEN:
        return{
            ...state,userData:action.payload
        }
        break;
        case PROFILE_UPDATE:
        return {
            ...state,userData:action.payload

        }
        break;
        case TOS_ACCEPTED:
        return{
            ...state,userData:action.payload
        }
        break;
        case PROFILE_UPDATE_PHOTO:
        return {
            ...state,userData:action.payload

        }
        break;
        case GET_USER_DATA:
        return {
            ...state,userData:action.payload
        }
        break;
        case START_ADD_PLACE:
        return {
          ...state,
          placeAdded: true
        };
        case SET_PICTURES:
        return {
            ...state,images:action.images
        }
        break;
        default: 
            return state
    }
}