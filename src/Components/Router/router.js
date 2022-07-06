import React from 'react'
import { Routes, Route, Switch } from 'react-router-dom'
import NewPasswordForm from '../NewPassword/NewPasswoed'
import RegisterForm from '../Register/index'
import ResetPassword from '../ResetPassword/resetPaaword'
import LoginForm from '../login/index'
import DashBoard from '../DashBoard'
import ActivationLink from '../ActivationLink/activationLink'
import UrlViewer from '../UrlViewer/UrlViewer'
import LineChart from '../Chart/linechart.js'
import MainPage from '../main/main'
import Otp_Verification from '../Otp'
function RouterConfig () {
  return (
    <Routes>
      <Route
        path='/forgot-password'
        element={<ResetPassword></ResetPassword>}
      ></Route>
      <Route path='/register' element={<RegisterForm></RegisterForm>}></Route>
      <Route
        path='/new-password'
        element={<NewPasswordForm></NewPasswordForm>}
      ></Route>
      <Route path='/login' element={<LoginForm></LoginForm>}></Route>
      <Route path='/Activelink' element={<ActivationLink></ActivationLink>}></Route>
      <Route path='/urlView' element={<UrlViewer></UrlViewer>}></Route>
      <Route path='/dashboard' element={<DashBoard></DashBoard>}></Route>
      <Route path='/chart' element={<LineChart></LineChart>}></Route>
      <Route path='/otp' element={<Otp_Verification/>}/>
      <Route path='/' element={<MainPage></MainPage>}></Route>
     </Routes>
  )
}

export default RouterConfig
