import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';



export default function Login(props) {
  let navigate = useNavigate();
  let [errors, setErrors] = useState([])
  let [statusError, setStatusError] = useState('')

  const schema = Yup.object({
    email: Yup.string().required('email is required').email('not valid email'),
    password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{3,10}$/),

  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',

    }, validationSchema: schema,
    onSubmit: sendData,

  })
  async function sendData(values) {
    let {data} = await axios.post('https://king-prawn-app-3mgea.ondigitalocean.app/auth/login', values)
      .catch((err) => {
       
        setStatusError(err.response.data.message)
      })
    
    if(data.message=='Done'){
      setErrors([]);
      setStatusError('');
      localStorage.setItem("userToken",data.access_token);
      props.info();
      navigate('/Home')
    }
  
   


  }


  
  return (
    <>
      <div className='container '>
        <div className='w-75 m-auto '>

          <h2>Login  Now</h2>
          {errors.map((ele, index) => {
            return <div className='text-danger' key={index}>{ele.message}</div>
          }
          )}
          <form onSubmit={formik.handleSubmit}>
            
            <label>Email</label>
            <input type='email' name='email' className='form-control my-3'
              value={formik.values.email} onChange={formik.handleChange} />
            <div className='text-danger '>{statusError}</div>
            {formik.errors.email ? <p className='alert alert-danger'>{formik.errors.email}</p> : ''}

            <label>password</label>
            <input type='password' name='password' className='form-control my-3'
              value={formik.values.password} onChange={formik.handleChange} />
            {formik.errors.password ? <p className='alert alert-danger'>{formik.errors.password}</p> : ''}

            
            <Link to="/SendCode">Did you forget your password!?</Link>
            <button className='btn btn-danger mt-4 text-white' type='submit'>Login</button>


          </form>
        </div>
      </div>

    </>

  )
}
