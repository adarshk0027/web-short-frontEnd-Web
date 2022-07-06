import React, { useEffect, useState,useContext } from 'react'
import axios from '../helpe/axios'
import { UserContext } from '../context'
import {useNavigate} from 'react-router-dom'
const RenderToUrl = async (short,state,urls) => {
  
  const Token=localStorage.getItem('Token')
  const render = await axios.post(
    '/users/render',{ShortUrl:short},{
      headers:{
        authorization:Token
      }
    }
  )
  if(render.status==200) {
    const new_item=urls.find((item)=> item.ShortUrl==short)
    const filtered=urls.filter((item)=> item.ShortUrl !== short)
    state([...filtered],{...new_item,Clicks:new_item.Clicks + 1})
  }
}

function UrlViewer () {
  const Navigate=useNavigate()
  const {authenticate} =useContext(UserContext).state
  const [AllUrls, SetAllUrls] = useState([])
  const {state,dispatch} =useContext(UserContext)
  console.log(AllUrls,"urls");
  useEffect(() => {
    if(!authenticate) {
       Navigate('/dashboard') 
    }
    else {
    FetchUrls()
    }
  }, [])
  const FetchUrls = async () => {
    try {
      const Token=localStorage.getItem('Token')
      let Urls = await axios.get('/users/shorturls',{headers:{
        authorization:Token
      }})
      if (Urls.status == 200) {
        SetAllUrls(Urls.data.Urls)
      
        
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    
      
      <div className='container'>
      <div className='row'>
        <div className='col-sm-12'>
          <div className='Title'>
            <h4>Url List</h4>
          </div>
        </div>
        { AllUrls.length > 0 ? 
        <div className='col-sm-12'>
          <div className='tables'>
            <table className='table'>
              <thead className='thead-dark'>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Actual URL</th>
                  <th scope='col'>Shorten Url</th>
                  <th scope='col'>Clicks</th>
                </tr>
              </thead>
              <tbody>
                {AllUrls &&
                  AllUrls.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope='row'>{index + 1}</th>
                        <td>{item.LargeUrl}</td>
                        <td>
                          <a
                            className='nav-link btn-outline-light btn-sm'
                            href={item.LargeUrl}
                            onClick={()=>{
                              console.log("link clicked");
                              RenderToUrl(item.ShortUrl,SetAllUrls)
                              }}
                            
                          >
                            {item.ShortUrl}
                          </a>
                        </td>
                        <td>{item.Clicks}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
 :
 <div>
  <h3 style={{color:"blue"}}>No Url Created Yet</h3>
 </div>
 } 
      </div>
    </div>    
    
    
    </>

  )
}

export default UrlViewer
