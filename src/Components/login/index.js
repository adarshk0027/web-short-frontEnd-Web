import React, { useState ,useContext, useEffect} from 'react'
import './Index.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from '../helpe/axios'
import ShowMessage from '../showMessage/ShowMessage'
import { Link,useNavigate } from 'react-router-dom'
import { UserContext } from '../context'
const INITIAL_STATE = {
  email: '',
  password: ''
}
const VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  password: Yup.string().required('Password is Required')
})
function LoginForm () {
  const Navigate=useNavigate()
  const {state,Login_Req,User_Login}=useContext(UserContext)
  console.log(state.authenticate,"hello");
  console.log("State Is",state);
  useEffect(()=>{
    if(state.authenticate==true){
      console.log("hai");
       Navigate('/dashboard')
    }
  },[state.authenticate])
  const [Show, SetMessage] = useState(false)
  const [LoginError,SetError]=useState(false)
  const formik = useFormik({
    initialValues: INITIAL_STATE,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: async values => {
      try {
        Login_Req()
        const res = await axios.post('/users/login', values)
        console.log(res.data,"response");
        if (res.status == 200) {
          SetMessage(true)
          localStorage.setItem('Token',res.data.Token)
          localStorage.setItem('user',res.data.user)
          User_Login(res.data.Token)
          Navigate('/dashboard')
        }
         
      } catch (error) {
        console.log(error)
        SetError(error.response.data.Message)
          setTimeout(()=>{
          
          },3000)
      }
    }
  })
  
  return (
    <div className=' container '>
      <div className='Register-Form mx-auto  row '>
        <div className='col-sm-12'>
          <div className='Header text-solid my-2'>
            <h4>
              Login <span> &nbsp;</span> Form
            </h4>
          </div>
          <div className='RegisterBody'>
            <div className='form my-4'>
              <form action='' onSubmit={formik.handleSubmit} autocomplete='off'>
                <div className='email'>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter Email'
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className='Input'
                  />
                  {formik.errors.email && formik.touched && (
                    <div>
                      <small className='text-danger'>
                        {' '}
                        {formik.errors.email}
                      </small>
                    </div>
                  )}
                </div>
                <div className='password my-4'>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Enter password'
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className='Input'
                  />
                  {formik.errors.password && formik.touched && (
                    <div className='error'>
                      <small className='text-danger'>
                        {' '}
                        {formik.errors.password}
                      </small>
                    </div>
                  )}
                  {
                    LoginError && <div className="error text-danger">{LoginError}</div>
                  }
                </div>
                <div className='submit row'>
                  <button
                    type='submit'
                    className='bg-success btn-primary col-sm-12 col-md-8 mx-auto  Button'
                  >
                    <strong>Login</strong>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='register'>
          <div className='row'>
            <div className='reg col-sm-6'>
              <Link to='/register'>Register</Link>
            </div>
            <div className='reg col-sm-6'>
              <Link to='/forgot-password'>Forgot password</Link>
            </div>
          </div>
        </div>
      </div>

      <ShowMessage
        Show={Show}
        changeState={SetMessage}
        Text={'Your logined now'}
      ></ShowMessage>
    </div>
  )
}

export default LoginForm
