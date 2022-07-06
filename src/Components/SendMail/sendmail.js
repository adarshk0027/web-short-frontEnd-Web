import React from 'react'
import './index.css'
function SendMail ({Text}) {
  return (
    <div className='sendMail raw '>
      <div className='col-sm-12'>
        <div className='Text'>
          <p>We Will Send An {Text} Link To Your Email</p>
        </div>
      </div>
    </div>
  )
}

export default SendMail
