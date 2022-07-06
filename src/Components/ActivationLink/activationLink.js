import React from 'react'
import axios from '../helpe/axios'
import {
  useNavigate
} from 'react-router-dom'

function ActivationLink() {
  const Navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const Activation = await axios.post('/users/activation', {
        email: localStorage.getItem('email')
      })
      console.log(Activation.data);
      if (Activation.status === 200) {
        Navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return ( < div className = 'container' >
    <div className = 'activation row' >
    <div className = 'col-sm-12' >
    <div className = 'title' >
    <p> Do you Want Activate Your Account Please Click </p> </div> 
    </div> 
    <div className = 'button row' >
     <button className = 'bg-primary btn col-sm-12 col-md-8 mx-auto'
    onClick = {
      (e) => {
        e.preventDefault()
        handleSubmit()
      }
    }>
    Activate User 
    </button> 
    </div> 
    </div> 
    </div>
  )
}

export default ActivationLink