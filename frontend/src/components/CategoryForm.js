import React,{useState} from 'react'
// import {useAuth} from './AuthContext'
import {useAuth} from './AuthContext';
import Navbar from './Navbar';
import UserMenu from './userMenu';
import '../OptionForm.css'; // Import the CSS file for styling
import toast, { Toaster } from "react-hot-toast";
export default function CategoryForm() {
    const[CategoryName,setCategoryName]=useState();
    const[auth,setAuth]= useAuth();
  const onchange = async(e)=>{
       setCategoryName(e.target.value);
  }
  const handleSubmit = async (e) => {
    // setloading(true)

      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/createCategory", {
        // credentials: 'include',
        // Origin:"http://localhost:3000/login",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': localStorage.getItem("authToken")
        },
        body: JSON.stringify({CategoryName:CategoryName })

      });
      const json = await response.json()
      // setloading(false)
      if (json.success) {
        toast.success("sucessfully submitted")
      }
      else {
        toast.error("Enter Valid Credentials")
      }
    }
  return (
    <div style={{backgroundImage: 'url("https://source.unsplash.com/random/900x700/?food")', minHeight:'100vh', backgroundSize: 'cover' }}>
        <Toaster/>
        <Navbar/>
        <div className="row">
    <div className="col-md-3 mt-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
<form className="option-form mt-4" style={{alignItems:"center"}}  onSubmit={handleSubmit}>
      <label htmlFor="CategoryName">Category Name:</label><br />
      <input type="text" id="CategoryName" name="CategoryName"  value={CategoryName}  onChange={(e) => setCategoryName(e.target.value)} required /><br />
      <input type="submit" value="Submit" />
    </form>
    </div>
    </div>
    </div>
  )
}




