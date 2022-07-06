import React, { useState } from 'react'
import './index.css'
import axios from '../helpe/axios'
import {Link,useNavigate} from 'react-router-dom'
import { logDOM } from '@testing-library/react'
function CreateUrl () {
  const [LargeUrl, SetUrl] = useState('')
  const [ShortUrl,SetShortUrl]=useState()
  const Navigate=useNavigate()
  const HandleChange = e => {
    SetUrl(e.target.value)
  }
  const HandleSubmit=async()=>{
    try{

    
    const Token= await localStorage.getItem('Token')
    //console.log(Token);
    const UrlShorten= await axios.post('/users/createShort',{LargeUrl},{
      headers:{
        authorization:Token
      }
    })
    if(UrlShorten.status==200){
      SetShortUrl(UrlShorten.data.ShortUrl)
    }
    console.log(UrlShorten);
  }
  catch(error){
    console.log(error);
  }
  }
  return (
    <div className='container '>
      <div className='row '>
        <div className='createUrl col-sm-12'>
          <div className='Form'>
            <form >
              <div className='actualUrl '>
                <input type='url' name='url' id='' placeholder='Enter Url' className='form-control ' onChange={HandleChange}/>
              </div>
              <div className='button row my-4'>
                <button
                  type='button'
                  className='col-sm-12 col-md-8 mx-auto btn btn-primary'
                  onClick={()=>{
                    HandleSubmit()
                  }}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
          {
          ShortUrl && <div className="Shorter mx-5 ">
            <p>Shorten Url: <span><a href={LargeUrl}>{ShortUrl}</a></span> </p>
            
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default CreateUrl
