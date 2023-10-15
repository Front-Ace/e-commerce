import React, { useContext } from 'react'
import { cartContext } from '../../context/cartContext'
import { ColorRing } from 'react-loader-spinner'
import toast from 'react-hot-toast'

export default function Cart() {


  const {cartProducts,totalPrice,numOfCartItems,getUserCart,deleteProduct,updateCart}= useContext(cartContext)
  if (cartProducts === null) {
    return  <div className='vh-100 d-flex align-items-center justify-content-center'>
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
  
  async function deletElement(id) {
    const res = await deleteProduct(id);
    if (res.status === "success") {
      toast.success(`Product removed successfully`)
    }else{
      toast.error('error occured while deleting')
    }
  };
  async function updateCount(id,count) {
    const res = await updateCart(id,count);
    if (res.status === "success") {
      toast.success(`Product count changed`)
    }else{
      toast.error('error occured while changing count')
    }
  }

  return <div className='container bg-body-secondary mt-4 py-3 '>
            <h1 className='mb-3'>Shop Cart :</h1>
            <h3 className='text-success mb-3'>Total Price: {totalPrice} LE</h3>

            {cartProducts?.map(function (product,idx) {
              return <div key={idx} className="row align-items-center py-3 border-bottom border-3 ">
              <div className='col-sm-1'><img className='w-100' src={product.product.imageCover} alt="" /></div>
              <div className='col-sm-9'>
                <h5>{product.product.title}</h5>
                <h5 className=' text-success'>price : {product.price} LE </h5>
                <button className='btn btn-outline-danger' onClick={()=>deletElement(product.product.id)}><i className="fa-solid fa-trash-can text-success"></i> Remove</button>
              </div>
              <div className='col-sm-2'>
                <button onClick={()=>updateCount(product.product.id,product.count-1)} className='btn btn-outline-success'>-</button>
                <span className=' mx-3'> {product.count} </span>
                <button onClick={()=>updateCount(product.product.id,product.count+1)} className='btn btn-outline-success'>+</button>
              </div>
            </div>
            })}

            
  </div>
}
