import React, { useContext, useState } from 'react';
import sttyle from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { authContext } from './../../context/authcontext';

export default function Signup() {

  const {settoken}= useContext(authContext);
  const [isLoading, setisLoading] = useState(false)
  const[errorMsg,setErrorMsg]= useState(null);
  const [successMsg, setsuccessMsg] = useState(null);
  const navigate= useNavigate()
 
  async function loginToAcc(values)
  {
    console.log("sending to backEnd");
    setisLoading(true)
   try {
    const {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin', values);
    console.log(data.message);
    console.log(data.token);
    settoken(data.token);
    localStorage.setItem('tkn',data.token)
    
    setsuccessMsg('Welcome Back');
    setTimeout(() => {
      navigate('/products')
    }, 2000);
   } catch (error) {
    console.log("error",error.response.data.message);
    setErrorMsg(error.response.data.message)
   }
   setisLoading(false)
    
  };
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{5,15}$/;
  // password regex minimum length 5 and maximum length 15, must start with capital letter an must contain at least number and a letter
  
  // let userSchema = Yup.object({
  //   email: Yup.string().email().required('required'),
  //   password: Yup.string().min(5,'password is too short').max(15,'password is too long').matches(passwordRegex,'password must starts with capital letter, contains one character and one number at least').required('required'),
  // });

  let formik =useFormik({
    initialValues : {
      email: '',
      password: '',
    },
    onSubmit:loginToAcc
  })
 
 
 return <>
          <div className=' w-25 mx-auto py-4'>
            
            
            <h1 className=' mb-3 text-success  text-center'>Log In</h1>
            {errorMsg? <div className=' alert alert-danger'>{errorMsg}</div> : ""}
            {successMsg? <div className=' alert alert-success'>{successMsg}</div> : ""}
            <form onSubmit={formik.handleSubmit}>
              
              
              <label htmlFor="email">e-mail :</label>
              <input className=' form-control' type="email" id='email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.email && formik.touched.email? <div className='alert alert-danger mt-1 py-1'>{formik.errors.email}</div> : ""}
              
              <label htmlFor="password">password :</label>
              <input className=' form-control' type="password" id='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.password && formik.touched.password? <div className='alert alert-danger mt-1 py-1'>{formik.errors.password}</div> : ""}
              
              
              <div className=' text-center'><button type='submit' className=' btn btn-success mt-3 text-center'>

                {isLoading? <ThreeDots
                height="25" 
                width="55" 
                radius="9"
                color="#4fa94d" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
                /> : 'Log In'}

              </button></div>
            </form>
          </div>
  </>
}
