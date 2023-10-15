import React, { useContext, useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../context/authcontext';
import { useFormik } from 'formik';
import axios from 'axios';

export default function ResetPassword() {

  const navigate = useNavigate();
  
  async function resetUserPassword(values) {
   try {
    const {data}= await axios.put(`https://route-ecommerce.onrender.com/api/v1/auth/resetPassword`,values)
  console.log(values)
  
   } catch (error) {
    
   }
     }
  let formik =useFormik({
    initialValues : {
      email: '',
      newPassword:''
    },
    onSubmit:resetUserPassword
  })
  
 
 
 return <>
          <div className=' w-25 mx-auto py-4'>
            
            
            <h1 className=' mb-3 text-success  text-center'>Reset Your Password</h1>
            
            <form onSubmit={formik.handleSubmit} >
              
              
            <label htmlFor="email">e-mail :</label>
              <input  className='email-input form-control' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}   type="email" id='email' name='email'/>
              <label htmlFor="newPassword">New Password :</label>
              <input  className='password-input form-control' onChange={formik.handleChange} value={formik.values.newPassword} onBlur={formik.handleBlur}   type='password' id='newPassword' name='newPassword'/>
              
              
              
              <div className=' text-center'><button   type='submit' className=' btn btn-success mt-3 text-center'>
                Confirm
              </button></div>
              
            </form>
          </div>
  </>
}
