import React ,{useState,useEffect} from 'react'
import Navbar from './Navbar';
import {useAuth} from './AuthContext';
import toast, { Toaster } from "react-hot-toast";
export default function AdminDashboard() {


  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const { data } =  await fetch("http://localhost:5000/api/order-data", {
        // credentials: 'include',
        // Origin:"http://localhost:3000/login",
        method: 'GET',
        headers: {
          'authorization': auth.token
        },
    }).then(async (res) => {
        let response = await res.json();
        // console.log(response);
        await setOrders(response.orderData)
        // console.log(orders);

    });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
// console.log(orders);
function calculateTotalPrice(items) {
  let totalPrice = 0;

  for (let i = 1; i < items.length; i++) {
    totalPrice += items[i].price;
  }

  return totalPrice;
}
function calculateTotalQuantity(items) {
  let totalPrice = 0;

  for (let i = 1; i < items.length; i++) {
    totalPrice += parseInt(items[i].qty);
  }

  return totalPrice;
}
let count=1;
  return (
    <div>
    <Toaster/>
    <Navbar/>
    <h1 className="text-center">All Orders</h1>
    <div className="border shadow">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              {/* <th scope="col">Order_id</th> */}
              <th scope="col">email</th>
              <th scope="col"> amount</th>
              <th scope="col">date</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>

    {orders?.map((o) => {
      return (

        o.order_data ?
        o.order_data.slice(0).reverse().map((item) => {
            return (

//                 item.map((arrayData) => {

// })
<tbody>
<tr>
  <td>{count++}</td>
  {/* <td>{o._id}</td> */}
  <td>{o.email}</td>
  <td>{calculateTotalPrice(item)}</td>
  <td>{item[0].Order_date}</td>
  <td>{calculateTotalQuantity(item)}</td>
</tr>
</tbody>
            )
    }):"")
    })}
     </table>

</div>

    </div>
  )
}
