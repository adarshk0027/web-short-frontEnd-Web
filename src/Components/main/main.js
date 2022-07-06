import React,{useEffect,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {UserContext} from '../context'
function MainPage () {
  const {state,dispatch}=useContext(UserContext)
const Navigate=useNavigate()
useEffect(()=>{
  if(!state){
    sessionStorage.removeItem('Token')
    Navigate('/login')
    
  }
})
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-12 '>
          <div className='title'>
            URL <span className='text-danger'>&nbsp;SHORTNER</span>{' '}
          </div>
          <div className='text-primary my-4 text-600'>
            you can Short Your Url Here ..... If You Dont Have An Accout Yet
            <p className=''>
              Please <span className='text-success'>&nbsp;Register &nbsp;</span>
              And <span className='text-success'>&nbsp;Login</span>{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
