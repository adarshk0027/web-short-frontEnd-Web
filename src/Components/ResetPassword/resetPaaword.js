import React,{useState,useEffect} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './index.css'
import { useContext } from 'react'
import {UserContext} from '../context'
import axios from '../helpe/axios'
import {Modal} from 'react-bootstrap'
import SendMail from '../SendMail/sendmail'
import ShowMessage from '../showMessage/ShowMessage'


//Initial Schema
const INITIAL_STATE = {
  email: ''
}
//Validation Schema
const VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required')
})
//Function For Mail Send
 

function ResetPassword () {
  const [LOGIN,SET_LOGIN]=useState(false)
  const [Click,SetClick]=useState(false)
  const [ShowModal,SetModal]=useState(false)
  const [Show,SetMessage]=useState(false)
 const {authenticate}=useContext(UserContext).state
 const Navigate=useNavigate()
  const MailSend=async(values)=>{
    const RESPONSE=await axios.post("/send",{email:values})
    if(RESPONSE.status==200){
      SetMessage(true)
      localStorage.setItem('email',values)
    }
    }

  //Formik Validation
  const formik = useFormik({
    initialValues: INITIAL_STATE,
    validationSchema: VALIDATION_SCHEMA,
    //Submit Form
    onSubmit:async values => {
      SetClick(true)
      const res=await axios.post('/check-email',values)
      if(res.status==200){
        // SET_LOGIN(res.data.login)
         SetModal(true)
      }
      
      
    }
  })
  useEffect(()=>{
   if(authenticate){
    Navigate('/dashboard')
   }
  },[authenticate])
  return (
    
    <div className='container'>
      <div className='ResetPassword mx-auto row '>
        <div className="col-sm-12">
        <div className='Header text-primary col-sm-12 '>
          <h4>
            Reset <span> &nbsp; </span> Password{' '}
          </h4>
        </div>
        <div className='ResetForm col-sm-12'>
          <div className='Text text-solid-600'>
            <p>
              Do You Want To <span className='text-success'>RESET</span> Your
              Password
            </p>
            <p>If You Have An Account Already </p>
          </div>
          <div className='email my-4'>
            <form action='' onSubmit={formik.handleSubmit}>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='Enter Your Email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                
              />
              {formik.errors.email && formik.touched && (
                <div className='error'>
                  <small className='text-danger'> {formik.errors.email}</small>
                </div>
              )}
              <div className='submit my-3 row'>
                <button type='submit ' className='btn btn-success button col-sm-12'>
                  <strong>Check It</strong>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className='Register row'>
          <div className='Text col-sm-12'>
            <p className={!LOGIN && Click && "text-danger red"}>Dont Have An Account Yet</p>{' '}
            <span>
              <Link to='/register' className='btn btn-primary register'>
                <strong>Register</strong>
              </Link>
            </span>
          </div>
        </div>
        </div>
      </div>
      <ShowMessage Show={Show} changeState={SetMessage} Text={"Email Send SuccesFully"}></ShowMessage>
      <Modal show={ShowModal} onHide={()=>{
        SetModal(false)
      }}>
        <Modal.Header closeButton>
           <Modal.Title>Send Mail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SendMail></SendMail>
         
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-success' onClick={()=>{
            MailSend(formik.values.email)
            SetModal(false)

          }}>Send</button>
          
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ResetPassword
