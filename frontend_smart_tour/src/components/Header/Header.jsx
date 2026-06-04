import React, { useEffect, useState } from 'react'
import logo from '../../components/assets/1.png'
import "./Header.css";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
function NavBar() {
  const [ token ,setToken]=useState()
  const tokenRemove=()=>{
    Cookies.remove('token')
    setToken(false)
  }
  useEffect(()=>{

  const gettoken =Cookies.get('token')
  setToken(gettoken)

  
    

  },[])

  return (
    <>
      <div className="header">
        <div className="logo">
          <Link to="/" className="logo"><img src={logo}></img></Link>
        </div>
        <div className="main">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/blogs">Blogs</Link>

        </div>

        <div className="form">
          {!token ?  <><Link to="/signin"><button class="button">Sign In</button></Link>
          <Link to="/register"><button class="button">Register</button></Link></>
        :<Link to="/"><button onClick={tokenRemove} class="button">logout</button></Link> }
         </div>
        

      </div>
      {/* <div class="container">
  <div class="background-image"></div>
</div> */}

    </>
  )
}

export default NavBar