import React,{useContext,useEffect} from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RouterConfig from './Components/Router/router';
import NavbarWrapper from './Components/Navbar/navbar';
import { UserContext } from './Components/context';


function App() {
  
   const { state,User_Login} = useContext(UserContext)
   const {authenticate} =state
   useEffect(()=>{
    if(!authenticate){
      const Token=localStorage.getItem('Token') ? localStorage.getItem('Token') : ""
      if(Token !== ""){
        User_Login(Token)
      }
    }
  },[authenticate])
  return (
    
    <div className="App">
      
    <BrowserRouter>
     <NavbarWrapper></NavbarWrapper>
        <RouterConfig>
        </RouterConfig>
    </BrowserRouter>
    </div>
  );
}

export default App;
