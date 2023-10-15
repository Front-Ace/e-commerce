import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import HomeSlider from '../homeSlider/homeSlider';



export default function Brands() {
 
  async function getAllBrands() {
    return await axios.get('https://route-ecommerce.onrender.com/api/v1/brands')
  }
  const {data,isError,isFetched,isLoading}= useQuery("allBrands", getAllBrands );
  console.log(data?.data);


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

  async function getAllSubcategories(id) {
    const allSubCategories = await axios.get(` https://route-ecommerce.onrender.com/api/v1/categories/${id}/subcategories`)
    console.log(allSubCategories.data);
    
  }
  
 return <>
            
           <div className='container'>
              
              <div className="row">
                {data?.data.data.map(function (category,idx) {
                  return <div onClick={function () {
                    getAllSubcategories(category._id)
                    console.log(category._id);
                  }} key={idx} className="col-md-4 " style={{cursor:"pointer"}}>
                  <div className="product py-5">
                    <img style={{width:'100%',height:'300px'}} src={category.image} alt="product" />
                    <h3 className='text-success text-center mt-3'>{category.name}</h3>
                    
                  </div>
                </div>
                })}
              </div>
              
            </div>
  
  </>
}
