import React,{useState} from 'react'
import Badge from "@material-ui/core/Badge";
import {Link,useNavigate} from 'react-router-dom'
import Cart from '../screens/Cart';
import Model from '../Modal';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import toast from 'react-hot-toast';
export default function Navbar() {
  let data= useCart();
  let dispatch = useDispatchCart();
  const [cartView,setCartView]= useState(false);
  const navigate= useNavigate();
  const handleLogout=()=>{
     localStorage.removeItem("authToken");
     localStorage.removeItem("userEmail");
     localStorage.removeItem("auth");
     toast.success("logout successfully");
     dispatch({ type: "DROP" });
     navigate("/login");
  }
  let Name ="";
  Name = localStorage.getItem("auth")?JSON.parse(localStorage.getItem("auth")).name.split(" ")[0].toUpperCase():"";
  return (
      <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="/"><DeliveryDiningOutlinedIcon style={{fontSize :"50"}}></DeliveryDiningOutlinedIcon> SST FOOD</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
      {(localStorage.getItem("authToken"))?
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/dashboard/user">{Name}</Link>
        </li>:""}
        {/* {JSON.parse(localStorage.getItem("auth"))?.role==1?<li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/dashboard/createItem">New Item</Link>
        </li>:""}
        {JSON.parse(localStorage.getItem("auth"))?.role==1?<li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/dashboard/createCategory">New Category</Link>
        </li>:""} */}
        {JSON.parse(localStorage.getItem("auth"))?.role===1?<li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/dashboard/users"> Users</Link>
        </li>:""}
        {JSON.parse(localStorage.getItem("auth"))?.role===1?<li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/dashboard/admin"> Orders</Link>
        </li>:""}
        {/* {(localStorage.getItem("authToken"))?
        <li className="nav-item">
        <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
      </li>:""

        } */}

        <li className="nav-item">
        <Link className="nav-link active fs-5" aria-current="page" to="/about">About Us</Link>
      </li>


      </ul>
      {(!localStorage.getItem("authToken"))?
      <div className='d-flex'>

          <Link className="btn bg-white text-success mx-1" to="/login">login</Link>


          <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>

        </div>
    :
    <div>
     <div className="btn bg-white text-success mx-1" onClick={()=>{setCartView(true)}}>My cart{" "}
     <Badge color="primary">{data.length}</Badge>
     </div>
{cartView?<Model onClose={()=>setCartView(false)}><Cart></Cart></Model>:null}
    <div className="btn bg-white text-danger mx-1" onClick={handleLogout}>Logout</div>
    </div>
    }

    </div>
  </div>
</nav>
    </div>
  )
}
