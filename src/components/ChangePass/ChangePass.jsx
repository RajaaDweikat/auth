import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';


export default function ChangePass() {
  let navigate=useNavigate();
  let[error,setError]=useState([])
  let[statusError,setStatusError]=useState('')

  const schema=Yup.object({
    email:Yup.string().required('email is required').email('not valid email'),
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{3,10}$/),
    cPassword:Yup.string().required('confirm password is required').oneOf([Yup.ref('password')],'not matche password'),
    forgetCode:Yup.string().required('forgetCode is required')
  })

  let {errors ,values ,handleChange ,handleSubmit,handleBlur ,touched} = useFormik({
    initialValues: {
      email: '',
      password: '',
      cPassword: '',
      forgetCode:'',


    }, validationSchema:schema,
    onSubmit:sendNewPass,
      
  })
  
  

  async function sendNewPass(values){
   let {data}=await axios.patch('https://king-prawn-app-3mgea.ondigitalocean.app/auth/forgetPassword',values)
   .catch((err)=>{
    setStatusError(err.response.data.messgae)})
  
  
   if(data.message=='Done'){
    setError([])
    setStatusError('')
    toast.success('password updated successfully')
    navigate('/Login')
  }
   else{setError(data.err[0])}
    
      
  }
  return (
    <>
    <div className='container '>
      <div className='w-75 m-auto '>
        
          <h2>Updata Pass</h2>
          {error.map((ele,index)=>{
          return <div className='text-danger' key={index}>{ele.message}</div>
        }
          )}
          <form onSubmit={handleSubmit}>
           
            <label>Email</label>
            <input type='email' name='email' className={`form-control my-3 ${errors.email && touched.email?"is-invalid":""}`}
              value={values.email} onChange={handleChange} onBlur={handleBlur}  />
              {errors.email && touched.email?<p className='alert alert-danger'>{errors.email}</p>:''}
             

            <label>password</label>
            <input type='password' name='password' className={`form-control my-3 ${errors.password && touched.password?"is-invalid":""}`}
              value={values.password} onChange={handleChange} onBlur={handleBlur} />
              {errors.password && touched.password?<p className='alert alert-danger'>{errors.password}</p>:''}


            <label>confirm password</label>
            <input type='password' name='cPassword' className={`form-control my-3 ${errors.cPassword && touched.cPassword?"is-invalid":""}`}
              value={values.cPassword} onChange={handleChange} onBlur={handleBlur} />
              {errors.cPassword && touched.cPassword?<p className='alert alert-danger'>{errors.cPassword}</p>:''}
             
              <label>Code</label>
            <input type='text' name='forgetCode' className={`form-control my-3 ${errors.forgetCode && touched.forgetCode?"is-invalid":""}`}
              value={values.forgetCode} onChange={handleChange} onBlur={handleBlur} />
               {errors.forgetCode && touched.forgetCode?<p className=' alert alert-danger'>{errors.forgetCode}</p>:''}

            <button className='btn btn-danger mt-4 text-white' type='submit' >Updata</button>


          </form>
        </div>
      </div>

    </>

  )
}
