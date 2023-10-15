import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import LayOut from './components/LayOut/LayOut';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Products from './components/Products/Products';
import NotFound from './components/NotFound/NotFound';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Profile from './components/profile/profile';
import AuthenticationContext from './context/authcontext'
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './components/productDetails/productDetails';
import CartContextProvider from './context/cartContext';
import { Toaster } from 'react-hot-toast';
import Cart from './components/Cart/Cart';
import ForgetPassword from './components/forgetPassword/forgetPassword';
import ForgetPassword2 from './components/forgetPassword2/forgetPassword2';
import ResetPassword from './components/resetPassword/resetPassword';
 

const clientQuery =new QueryClient();
let routers = createHashRouter([
  {path:'/' , element: <AuthenticationContext> <LayOut/> </AuthenticationContext> ,children: [
    {index: true , element: <ProtectedRoute> <Products/> </ProtectedRoute>},
    {path: 'signup' , element: <Signup/>},
    {path:'products' , element:  <ProtectedRoute> <Products/> </ProtectedRoute>},
    {path:'login' , element: <Login/>},
    {path:'*' , element: <NotFound/>},
    {path:'categories' , element:<ProtectedRoute> <Categories/> </ProtectedRoute>},
    {path:'brands' , element: <ProtectedRoute> <Brands/> </ProtectedRoute>},
    {path:'productDetails/:id' , element: <ProtectedRoute> <ProductDetails/> </ProtectedRoute>},
    {path:'cart' , element: <ProtectedRoute> <Cart/> </ProtectedRoute>},
    {path: 'profile' , element: <Profile/>},
    {path: 'forgetPassword' , element: <ForgetPassword/>},
    {path: 'forgetPassword2' , element: <ForgetPassword2/>},
    {path: 'resetPassword' , element: <ResetPassword/>}
  ]}
])
function App() { 
  return <>
  <CartContextProvider>
  <QueryClientProvider client={clientQuery}>
  <RouterProvider router={routers}/>
  <Toaster/>
  </QueryClientProvider>
  </CartContextProvider>
  </>
}

export default App;
