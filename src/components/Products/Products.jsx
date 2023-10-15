import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import HomeSlider from '../homeSlider/homeSlider';
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';



export default function Products() {
  const {addProductToCart} = useContext(cartContext)
 
  async function getAllProducts() {
    return await axios.get('https://route-ecommerce.onrender.com/api/v1/products')
  }
  const {data,isError,isFetched,isLoading}= useQuery("allProducts", getAllProducts );
  console.log(data?.data.data);


if (isLoading) {
  console.log("loding");
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
  </div>}

async function addToCart(id) {
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
}

 
 return <>
            
           <div className='container'>
            <div className="row first gx-0 d-flex align-items-center justify-content-center mb-5">
              <div className='col-sm-9'><HomeSlider/></div>
              <div className='col-sm-3 d-flex justify-content-center align-items-center flex-column'>
                <img style={{width:'100%', height: '200px'}} src={require('../../images/blog-img-1.jpeg')} alt="" />
                <img style={{width:'100%', height: '200px'}} src={require('../../images/blog-img-2.jpeg')} alt="" />
              </div>
            </div>
              
              <div className="row second">
                {data?.data.data.map(function (product,idx) {
                  return <div key={idx} className="col-md-2">
                    <div  className="product py-5">
                      <Link  to={`/productDetails/${product._id}`}>
                        <img className='w-100'  src={product.imageCover} alt="product" />
                        <h6 className='text-success'>{product.category.name}</h6>
                        <h5>{product.title.split(" ",).slice(0,2).join(" ")}</h5>
                        <div className='d-flex align-items-center justify-content-between'>
                        <p className=' mt-2'>{product.price} LE</p>
                        <p><i className="fa-solid fa-star text-warning"></i> {product.ratingsAverage}</p>

                        </div>
                        
                      </Link>
                      <button onClick={()=> addToCart(product.id)} className='btn btn-success form-control mt-4'>+ Add to cart</button>
                    </div>
                </div>
                })}
              </div>
            </div>
  
  </>
}
