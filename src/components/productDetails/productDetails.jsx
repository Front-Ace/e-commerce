import axios from 'axios'
import React, { useContext, useState } from 'react'
import { BallTriangle, ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { cartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {

  const [isLoadingCart, setisLoadingCart] = useState(false)

 const{addProductToCart}= useContext(cartContext)
  const {id}= useParams();
  function getProductDetails() {
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
  }
  const {data,isLoading}= useQuery('allDetails', getProductDetails);
  
  if (isLoading) {
    return <div className='container vh-100 d-flex justify-content-sm-center align-items-sm-center'>
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />
    </div>
  }
  async function addToCart(id) {
    setisLoadingCart(true)
    const res= await addProductToCart(id);
    console.log(res);
    if (res.status=== "success") {
      console.log("product added to cart form product component");
      toast.success(res.message,
        {  duration: 4000,
        position: 'top-center',
        
        })
    }else{
      toast.error('error happened')
    }
    setisLoadingCart(false)
  }
    
  return <>
            <div className='container'>
              <div className='row py-5 mt-5 d-flex align-items-center justify-content-center'>
                <div className='col-md-4'>
                <img className='w-100' src={data?.data.data.imageCover} alt={data?.data.data.title} />
                </div>
                <div className="col-md-8">
                  <h4>{data?.data.data.title}</h4>
                  <h6 className='text-muted mt-3'>{data?.data.data.description}</h6>
                  <p className='mb-0'>{data?.data.data.category.name}</p>
                  <div className='d-flex justify-content-between align-items-center'>
                  <p className='mt-0'>{data?.data.data.price} LE</p>
                  <p><i className="fa-solid fa-star text-warning me-1"></i>{data?.data.data.ratingsAverage}</p>
                  </div>
                  <p>{data?.data.data.id}</p>
                  <button onClick={()=>addToCart(data?.data.data.id)} className='btn btn-success form-control mt-4 text-center'>
                    
                    {isLoadingCart? 
                    <BallTriangle 
                    height={25}
                    width={25}
                    radius={5}
                    color="#fff"
                    ariaLabel="ball-triangle-loading"
                    wrapperClass={{}}
                    wrapperStyle=""
                    visible={true}
                  />  :  "+ Add to cart"
                  }
                    
                    
                    
                    </button>
                </div>
              </div>
            </div>
            
            
  </>
}
