import React from 'react'
import './index.css'
import DangerousIcon from '@mui/icons-material/Dangerous';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
function ShowMessage({Show ,changeState,Text,Color}) {
    Show && setTimeout(()=>{
     changeState(false)
    },4000)
  return (
    
    <div className={Color=="danger" ? "ShowError rounded w-25 " : "ShowMessage rounded w-25"} id={Show ? "SHOWIT" :"HIDDEN"}>
        <div className="show" >
            <div className="icon">
            {Color=="danger" ? <  DangerousIcon color="red"></DangerousIcon> : <CheckCircleOutlineIcon  color='success' ></CheckCircleOutlineIcon>}
            
            
            </div>
            <div className="message">
              {Text}
            </div>
        </div>
    </div>
  )
}

export default ShowMessage