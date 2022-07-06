import {LOGIN_REQ,USER_LOGIN,LOG_OUT} from './action'

export const Reducer=(state,action)=>{
    switch(action.type){
        case LOGIN_REQ:return{
            ...state,
            authenticate:false
        }
        case USER_LOGIN:return{
            ...state,
            token:action.payload,
            authentication:false,
            authenticate:true
        }
        case LOG_OUT :return {
            ...state,
            token:"",
            authentication:false,
            authenticate:false
        }
    }
}