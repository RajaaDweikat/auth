import React from 'react'

import Footer from '../Footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function Layout({user,setUser}) {
  let navigate=useNavigate();
  
  function logout(){
    localStorage.removeItem('userToken');
    setUser(null);
    navigate('/Login')

  }

  return (
    <>
    <Navbar user={user} logout={logout} />
    <Outlet></Outlet>
   <Footer />
    </>
    
  )
}
