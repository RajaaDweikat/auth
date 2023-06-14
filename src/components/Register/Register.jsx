import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


export default function Register() {
  let navigate=useNavigate();
  let[error,setError]=useState([])
  let[statusError,setStatusError]=useState('')

  const schema=Yup.object({
    userName:Yup.string().required('userName is required').min(3,'too short!').max(50,'too long!'),
    email:Yup.string().required('email is required').email('not valid email'),
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{3,10}$/),
    cPassword:Yup.string().required('confirm password is required').oneOf([Yup.ref('password')],'not matche password'),
  })

  let {errors ,values ,handleChange ,handleSubmit ,handleBlur ,touched} = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      cPassword: '',

    }, validationSchema:schema,
    onSubmit:sendData,
      
  })
  

  async function sendData(values){
   let {data} = await axios.post('https://king-prawn-app-3mgea.ondigitalocean.app/auth/signup',values)
   .catch((err)=>{
    setStatusError(err.response.data.messgae)
    navigate('/Login')
   
   })
   if(data.message=='success'){
    setError([])
    setStatusError('')
    navigate('/Login')
    console.log('welcome');
  }
   else{setError(data.err[0])}

      
  }
  return (
    <>
    <div className='container '>
      <div className='w-75 m-auto '>
        
          <h2>Register Now</h2>
          {error.map((ele,index)=>{
          return <div className='text-danger' key={index}>{ele.message}</div>
        }
          )}
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type='text' name='userName' className={`form-control my-3 ${errors.userName && touched.userName?"is-invalid":""}`}
              value={values.userName} onChange={handleChange} onBlur={handleBlur} />
               {errors.userName && touched.userName?<p className=' alert alert-danger'>{errors.userName}</p>:''}

            <label>Email</label>
            <input type='email' name='email' className={`form-control my-3 ${errors.email && touched.email?"is-invalid":""}`}
              value={values.email} onChange={handleChange} onBlur={handleBlur} />
              <div className='text-danger '>{statusError}</div>
              {errors.email && touched.email?<p className='alert alert-danger'>{errors.email}</p>:''}

            <label>password</label>
            <input type='password' name='password' className={`form-control my-3 ${errors.password && touched.password?"is-invalid":""}`}
              value={values.password} onChange={handleChange} onBlur={handleBlur} />
              {errors.password && touched.password?<p className='alert alert-danger'>{errors.password}</p>:''}


            <label>confirm password</label>
            <input type='password' name='cPassword' className={`form-control my-3 ${errors.cPassword && touched.cPassword?"is-invalid":""}`}
              value={values.cPassword} onChange={handleChange} onBlur={handleBlur} />
              {errors.cPassword && touched.cPassword?<p className='alert alert-danger'>{errors.cPassword}</p>:''}

            <button className='btn btn-danger mt-4 text-white' type='submit'>Register</button>


          </form>
        </div>
      </div>

    </>

  )
}
