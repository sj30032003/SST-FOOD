import React, { useEffect, useState } from 'react'
import '../OrderItem.css';
import {useNavigate,useLocation} from  'react-router-dom';
import Loader from './Loader';
import cartImg from '../images/Cart.gif';
import { useAuth } from "./AuthContext";
export default function OrderItem() {
    const [auth, setAuth] = useAuth();
    let navigate= useNavigate();
    let location = useLocation();
if(!localStorage.getItem("authToken")){
    navigate("/login",{
        state:location.pathname
    });
  }

    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        // console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:5000/api/myOrderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': auth.token
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json();
            // console.log(response);
            await setorderData(response)
        })



        // await res.map((data)=>{
        //    console.log(data)
        // })


    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

     if(orderData.orderData===null){
        return <div style={{ backgroundColor:"black",height: "80vh", justifyContent: "center", alignItems: "center", display: "flex", position: "relative" }}>
        <img src={cartImg} alt="Background GIF" style={{ position: "absolute", width: "100%", height: "100%", objectFit: "contain" }} />
        <h2 className='fade-in'>Empty!😔</h2>
      </div>
     }

  return (
    <div className='mb=200px'>
      <div className='container' >
                <div className='row '>

                    {orderData !== {} ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div className='text-black' >
                                                    {arrayData.Order_date ? <div className='m-auto mt-5'>

                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :

                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3 mb-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                            <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                <div className="card-body text-black">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <span className='m-1'>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>



                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : ""
                        )
                    }) : ""}
                </div>


            </div>
    </div>
  )
}
// {"orderData":{"_id":"63024fd2be92d0469bd9e31a","email":"mohanDas@gmail.com","order_data":[[[{"id":"62ff20fbaed6a15f800125e9","name":"Chicken Fried Rice","qty":"4","size":"half","price":520},{"id":"62ff20fbaed6a15f800125ea","name":"Veg Fried Rice","qty":"4","size":"half","price":440}],"2022-08-21T15:31:30.239Z"],[[{"id":"62ff20fbaed6a15f800125f4","name":"Mix Veg Pizza","qty":"4","size":"medium","price":800},{"id":"62ff20fbaed6a15f800125f3","name":"Chicken Doub;e Cheeze Pizza","qty":"4","size":"regular","price":480}],"2022-08-21T15:32:38.861Z"]],"__v":0}}