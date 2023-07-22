import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import Items from '../components/Items'
import { Toaster } from 'react-hot-toast';



export default function Home() {

  return (
    <div>
    <Toaster/>
    <Navbar> </Navbar>
    <Items></Items>
    <Footer> </Footer>
    </div>
  )
}
