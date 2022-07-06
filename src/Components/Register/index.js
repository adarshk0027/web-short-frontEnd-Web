import React, { useState,useEffect } from 'react'
import './index.css'
import * as Yup from 'yup'
import {useNavigate} from 'react-router-dom'
import { useFormik } from 'formik'
import { useContext } from 'react'
import { UserContext } from '../context'
import axios from '../helpe/axios'
import ShowMessage from '../showMessage/ShowMessage'
import { Modal } from 'react-bootstrap'
import SendMail from '../SendMail/sendmail'
const INITIAL_STATE = {
  FirstName: '',
  lastName: '',
  email: '',
  password: ''
}
const VALIDATION_SCHEMA = Yup.object().shape({
  FirstName: Yup.string().required('First Name is Required'),
  lastName: Yup.string().required('Last Name is Required'),
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  password: Yup.string().required('Password is Required')
})



function RegisterForm () {
  const [ShowModal, SetModal] = useState(false)
  const [Show, SetMessage] = useState(false)
  const [ShowError, SetError] = useState(false)
  const {authenticate}=useContext(UserContext).state
  const Navigate=useNavigate()
  useEffect(()=>{
    if(authenticate){
      Navigate('/dashboard')
    }
      },[authenticate])

  const MailSend = async value => {
    const SendRes = await axios.post('/activation', {email:value})
    if(SendRes.status==200){
      SetMessage(true)
      localStorage.setItem("email",value)
    }
  }

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: async values => {
      try {
        console.log(values);
         const res = await axios.post('/register', values)
        if (res.status === 200) {
          // SetMessage(true)
          SetModal(true)
        } 
      } catch (error) {
        console.log(error)
        console.log(error.response.data.Message,"userExist")
          SetError(true)
      }
    }
  })
 
  return (
    <div className=' container '>
      <div className='Register-Form mx-auto  row '>
        <div className='col-sm-12'>
          <div className='Header text-solid my-2'>
            <h4>
              Register <span> &nbsp;</span> Form
            </h4>
          </div>
          <div className='RegisterBody'>
            <div className='form my-4'>
              <form action='' onSubmit={formik.handleSubmit}>
                <div className='FirstName'>
                  <input
                    type='text'
                    name='FirstName'
                    id='First'
                    placeholder='Enter First Name'
                    value={formik.values.FirstName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className='Input'
                  />
                  {formik.errors.FirstName && formik.touched && (
                    <div className='error'>
                      <small className='text-danger'>
                        {' '}
                        {formik.errors.FirstName}
                      </small>
                    </div>
                  )}
                </div>

                <div className='lastName'>
                  <input
                    type='text'
                    name='lastName'
                    id='last'
                    placeholder='Enter Last Name'
                    value={formik.values.lastName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className='Input'
                  />
                  {formik.errors.lastName && formik.touched && (
                    <div className='error'>
                      <small className='text-danger'>
                        {' '}
                        {formik.errors.lastName}
                      </small>
                    </div>
                  )}
                </div>

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
                    <div className='error'>
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
                </div>
                <div className='submit row '>
                  <button
                    type='submit'
                    className='bg-primary col-sm-12 col-md-8 mx-auto Button'
                  >
                    <strong>Register</strong>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ShowMessage
        Show={Show}
        changeState={SetMessage}
        Text={'Activation Link Send To Your Email'}
        Color={'success'}
      ></ShowMessage>
      <ShowMessage
        Show={ShowError}
        changeState={SetError}
        Text={'User Already Exist...'}
        Color={'danger'}
      ></ShowMessage>

      <Modal
        Color="info"
        show={ShowModal}
        onHide={() => {
          SetModal(false)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Send Mail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SendMail Text={'Activation '}></SendMail>
        </Modal.Body>
        <Modal.Footer>
          <button
            className='btn btn-success'
            onClick={() => {
              MailSend(formik.values.email)
              SetModal(false)
            }}
          >
            Send
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default RegisterForm
