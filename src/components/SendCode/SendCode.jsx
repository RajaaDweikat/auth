import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';



export default function SendCode(props) {
  let navigate = useNavigate();
  let [errors, setErrors] = useState([])
  let [statusError, setStatusError] = useState('')

  const schema = Yup.object({
    email: Yup.string().required('email is required').email('not valid email'),
   
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      

    }, validationSchema: schema,
    onSubmit: sendData,

  })
  async function sendData(values) {
    let {data} = await axios.patch('https://king-prawn-app-3mgea.ondigitalocean.app/auth/sendCode', values)
      .catch((err) => {
       
        setStatusError(err.response.data.message)
      })
    
   console.log(data)
   if(data.message=='Done'){
    navigate('/ChangePass')
   }
   


  }


  
  return (
    <>
      <div className='container '>
        <div className='w-75 m-auto '>

          <h2>Send a new code</h2>
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

            

            
            <Link to="/SendCode">Did you forget your password!?</Link>
            <button className='btn btn-danger mt-4 text-white' type='submit'>send</button>


          </form>
        </div>
      </div>

    </>

  )
}
