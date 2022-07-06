import React, { useContext, useState, useEffect } from 'react'
import LineChart from '../Chart/linechart'
import { UserContext } from '../context'
//import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function DashBoard () {
  const { state } = useContext(UserContext)
  const Navigate = useNavigate()
  return (
    <div className='container'>
      <div className='row'>
        <div className=''>
          <h4 className='text-primary'>Url created Per Month</h4>
          <div className='Daily col-sm-12 col-md-12'>
            <LineChart></LineChart>
          </div>
          </div>
        </div>
    </div>
  )
}

export default DashBoard
