import React from 'react'
import sttyle from './LayOut.module.css';

import NavBar from './../NavBar/NavBar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function LayOut() {
  return <>
            <NavBar/>
            <Outlet></Outlet>
            <Footer/>
  </>
}
