import React, { useEffect, useState } from 'react'
import Home from './components/Home/Home'
import NotFound from './components/NotFound/NotFound'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import SendCode from './components/SendCode/SendCode'
import ChangePass from './components/ChangePass/ChangePass'
import Logout from './components/Logout/Logout'
import jwt from 'jwt-decode'

export default function App() {
  let [user, setUser] = useState(null);
  function saveCuurentUser() {
    let token = localStorage.getItem('userToken');
    let decoded = jwt(token);
    setUser(decoded);

  }
 useEffect(() => {
    if (localStorage.getItem('userToken')) {
      saveCuurentUser();
    }
  }, [])




  let routes=createBrowserRouter([
     {path: '', element: <Layout user={user} setUser={setUser} />, children: [
      {index:true,element:<Home />},
      {path:'Register',element:<Register />},
      {path:'Login',element:<Login info={saveCuurentUser} />},
      {path:'Logout',element:<Logout />},
      {path:'SendCode',element:<SendCode />},
      {path:'ChangePass',element:<ChangePass />},
      {path:'*',element:<NotFound />},
     
      
    ]}

  ])
  return (
    <>
    
    <RouterProvider router={routes}></RouterProvider>
    </>
  )
}
