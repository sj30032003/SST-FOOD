import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import OrderItem  from './OrderItem';
export default function MyOrder() {
    return (
        <div className='bg-white'>
            <div>
                <Navbar />
            </div>
           <OrderItem></OrderItem>
            <Footer />
        </div>
    );
}
