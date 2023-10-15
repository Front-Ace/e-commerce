import axios from "axios";
import { createContext,React, useEffect, useState} from "react";

export const cartContext = createContext();

export default function CartContextProvider({children}) {
     
   const [cartProducts, setcartProducts] = useState(null)
   const [totalPrice, settotalPrice] = useState(0)
   const [numOfCartItems, setnumOfCartItems] = useState(0)

    async function addProductToCart(productId) {
         try {
                const{data}= await axios.post("https://route-ecommerce.onrender.com/api/v1/cart",{
                "productId": productId
             }, {
                headers: {token: localStorage.getItem('tkn')}
                });
               //  setnumOfCartItems(data.numOfCartItems);
               //  settotalPrice(data.data.totalCartPrice);
                getUserCart();
                return data;
         } catch (error) {
            console.log('error',error);
         }
    }
    async function getUserCart() {
      try {
         const {data} = await axios.get('https://route-ecommerce.onrender.com/api/v1/cart',
      {headers: {token: localStorage.getItem('tkn')}}
      );
      setnumOfCartItems(data.numOfCartItems)
      settotalPrice(data.data.totalCartPrice);
      setcartProducts(data.data.products)
      } catch (error) {
         console.log('error',error);
      }
    };
    async function deleteProduct(productId) {
      try {
         const{data} = await axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`, {
         headers: {token:localStorage.getItem('tkn')}
      })
         setnumOfCartItems(data.numOfCartItems)
         settotalPrice(data.data.totalCartPrice);
         setcartProducts(data.data.products)
         return data
      } catch (error) {
         console.log(console.error());
      }
    };

      async function updateCart(productId,count) {
         try {
            const {data}= await axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,{
            "count": count
        }, {
         headers:{token: localStorage.getItem('tkn')}
        })
            setnumOfCartItems(data.numOfCartItems)
            settotalPrice(data.data.totalCartPrice);
            setcartProducts(data.data.products)
        return data;
         } catch (error) {
            console.log(error);
         }
      }

    useEffect(function () {
      if (localStorage.getItem('tkn')) {
         getUserCart()
      }
    },[]);

    

    return <cartContext.Provider value={{addProductToCart, cartProducts,totalPrice,numOfCartItems,getUserCart,deleteProduct,updateCart}} >

         {children}

    </cartContext.Provider>
}