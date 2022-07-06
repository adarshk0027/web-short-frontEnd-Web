import { useReducer } from "react";
import {UserContext} from './context'
import { Reducer } from "../reducerFunc";
import {LOGIN_FAILURE,LOGIN_REQ,USER_LOGIN,LOG_OUT} from '../action'
const initialState={
    authentication:false,
    authenticate:false,
    token:"",
}
function UserProvider (props){
    const [state,dispatch]=useReducer(Reducer,initialState)
    const Login_Req=()=>{
       dispatch({type:LOGIN_REQ})
    } 
    const User_Login=(data)=>{
        dispatch({type:USER_LOGIN,payload:data})
    }
    const Login_Fail=()=>{
        dispatch({type:LOGIN_FAILURE})
    }
    const Log_Out=()=>{
      dispatch({type:LOG_OUT})
    }
  return(
    <UserContext.Provider value={{state,Login_Req,User_Login,Login_Fail,Log_Out}}>
     {props.children}
    </UserContext.Provider>
  )
}
export default UserProvider;