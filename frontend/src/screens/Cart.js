import React from 'react'
import Delete from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import {useNavigate} from  'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
export default function Cart() {
    let navigate= useNavigate();
    let data = useCart();
    let dispatch = useDispatchCart();
    // console.log(data);
    if (data.length === 0) {
        // console.log("hi");
      return (

        <div>
          <div className='m-5 w-100 text-center fs-3 text-white'>The Cart is Empty!</div>
        </div>
      )
    }
    // const handleRemove = (index)=>{
    //   console.log(index)
    //   dispatch({type:"REMOVE",index:index})
    // }

    const handleCheckOut = async () => {
      let userEmail = localStorage.getItem("userEmail");
      // console.log(data,localStorage.getItem("userEmail"),new Date())
      let response = await fetch("http://localhost:5000/api/OrderData", {
        // credentials: 'include',
        // Origin:"http://localhost:3000/login",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });
      console.log("JSON RESPONSE:::::", response.status)
      if (response.status === 200) {
        toast.success("your order has placed 🎊🎉")
        dispatch({ type: "DROP" })
        // navigate("/");
      }
    //   navigate("/");
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
      <div>
       <Toaster/>
        {/* {console.log(data)} */}
        <div className='container m-auto mt-5 table-responsive text-white  table-responsive-sm table-responsive-md' >
          <table className='table table-hover text-white'>
            <thead className='  fs-4 text-white'>
              <tr>
                <th scope='col' >#</th>
                <th scope='col' >Name</th>
                <th scope='col' >Quantity</th>
                <th scope='col' >Option</th>
                <th scope='col' >Amount</th>
                <th scope='col' ></th>
              </tr>
            </thead>
            <tbody>
              {data.map((food, index) => (
                <tr>
                  <th scope='row' >{index + 1}</th>
                  <td >{food.name}</td>
                  <td>{food.qty}</td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>

                  <td ><button type="button" className="btn p-0 btn-primary "><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td>
                  <td ><button type="button" className="btn p-0 btn-primary "><AddIcon onClick={() => { dispatch({ type: "UPDATE", id: food.id, price:parseInt(food.Oriznal_Price),size:food.size, qty: 1 }) }} /></button> </td>
                  {food.qty!==1?<td ><button type="button" className="btn p-0 btn-primary "><RemoveIcon onClick={() => { dispatch({ type: "UPDATE", id: food.id, price: parseInt(-food.Oriznal_Price),size:food.size, qty: -1 }) }}  /></button> </td>:""}</tr>
              ))}
            </tbody>
          </table>
          <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
          <div>
            <button className='btn bg-success mt-5'onClick={handleCheckOut

            } > Check Out </button>
          </div>
        </div>



      </div>
    )
  }