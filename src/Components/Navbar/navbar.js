import React,{useState,useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import CreateUrl from './CrateUrl'
import { Modal } from 'react-bootstrap'
import {UserContext} from '../context'
import './nav.css'
import { LOG_OUT } from '../../action'

function NavbarWrapper () {
  const Navigate=useNavigate()

  
  const [ShowModal,SetModal]=useState(false)
  const {state,Log_Out}=useContext(UserContext)
  const {authenticate}=state

  

  console.log("Nav State",state);
  
  
  return (
    <div className="Navbar">
    <nav className="navbar navbar-expand-lg navbar-light bg-info " >
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="navbar-brand mx-2 title">URL<span className='text-danger'>SHORTNER</span> </div>

  <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      <li className="nav-item active">
        <Link className="nav-link" to={state ? "/dashboard" : "/"}>Home </Link>
      </li>
      {
        !authenticate  && <>
          <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link " to="/register">Register</Link>
      </li>
        </>
      }
      {
        authenticate && <> <li className="nav-item">
        <button className="btn btn-info " onClick={()=>{
          SetModal(true)
        }}>create Url</button>
      </li>
      <li className="nav-item">
        <Link className="nav-link " to="/urlView">View Url</Link>
      </li>
      <li className="nav-item Logout">
        <button className="btn btn-info button " onClick={()=>{
        localStorage.clear()
        Log_Out()
        }}>Logout</button>
      </li>
      </>
      }
         
      
      
    </ul>
    
    
  </div>
  {
    authenticate && 
  <div style={{float:"left",marginRight:"1rem",color:"blue",fontSize:"small"}} >
      {localStorage.getItem('user')}
    </div>
}
  <Modal
        show={ShowModal}
        onHide={() => {
          SetModal(false)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Short Url</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateUrl></CreateUrl>
        </Modal.Body>
      </Modal>
</nav>
</div>


// <nav className='navbar navbar-expand-lg navbar-light bg-info row'>
      

    //   <div className='collapse navbar-collapse col-sm-12' id='navbarSupportedContent'>
    //     <ul className='navbar-nav mr-auto'>
    //       <li className='nav-item active'>
    //         <Link className='nav-link'  to='/dashboard'>
    //           Home
    //         </Link>
    //       </li>
    //       <li className='nav-item'>
    //         <Link className='nav-link' to='/login'>
    //           Login
    //         </Link>
    //       </li>

    //       <li className='nav-item'>
    //         <Link className='nav-link' to='register'>
    //           Register
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="">
    //       <div className="title mx-auto">
    //           <h6>Url Shortner Web App</h6>
    //       </div>
    //   </div>
    // </nav>

      )
}

export default NavbarWrapper
