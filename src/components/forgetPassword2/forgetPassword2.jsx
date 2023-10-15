import React, { useContext, useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../context/authcontext';
import { useFormik } from 'formik';
import axios from 'axios';

export default function ForgetPassword2() {

  const navigate = useNavigate();
  
  async function verifyCode(values) {
   try {
    const {data}= await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode`,values)
  console.log(values)
  if (data.status === "Success") {
    setTimeout(() => {
      navigate('/resetPassword')
    }, 2000);
  }
   } catch (error) {
    
   }
     }
  let formik =useFormik({
    initialValues : {
      resetCode: ''
    },
    onSubmit:verifyCode
  })
  
 
 
 return <>
          <div className=' w-25 mx-auto py-4'>
            
            
            <h1 className=' mb-3 text-success  text-center'>Reset Your Password</h1>
            
            <form onSubmit={formik.handleSubmit} >
              
              
              <label htmlFor="email">verifying Code :</label>
              <input  className='email-input form-control' onChange={formik.handleChange} value={formik.values.resetCode} onBlur={formik.handleBlur}   type='text' id='resetCode' name='resetCode'/>
              
              
              
              <div className=' text-center'><button   type='submit' className=' btn btn-success mt-3 text-center'>
                Verify
              </button></div>
              
            </form>
          </div>
  </>
}
