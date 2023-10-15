import React, { useContext, useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../context/authcontext';
import { useFormik } from 'formik';
import axios from 'axios';

export default function ForgetPassword() {

  const navigate = useNavigate();
  async function sendResetCode(values) {
   try {
    const {data}= await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords`,values)
  console.log(values)
  setTimeout(() => {
    navigate('/forgetPassword2')
  }, 2000);
   } catch (error) {
    console.log(error);
   }
     }
  let formik =useFormik({
    initialValues : {
      email: ''
    },
    onSubmit:sendResetCode
  })
  
 
 
 return <>
          <div className=' w-25 mx-auto py-4'>
            
            
            <h1 className=' mb-3 text-success  text-center'>Reset Your Password</h1>
            
            <form onSubmit={formik.handleSubmit} >
              
              
              <label htmlFor="email">e-mail :</label>
              <input  className='email-input form-control' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}   type="email" id='email' name='email'/>
              
              
              
              <div className=' text-center'><button   type='submit' className=' btn btn-success mt-3 text-center'>
                Reset password
              </button></div>
              
            </form>
          </div>
  </>
}
