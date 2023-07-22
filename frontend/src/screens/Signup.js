import React,{useState} from 'react'
import Navbar from '../components/Navbar';
import {Link,useNavigate} from 'react-router-dom'
import Loader from '../components/Loader.js'
import toast, { Toaster } from 'react-hot-toast';
export default function Signup() {
const [credentials,setcredentials]=useState({name:"",email:"",geolocation:""})
const [loading ,setloading]= useState(false);
let navigate= useNavigate();
const handleSubmit = async (e) => {
  setloading(true)
    e.preventDefault();
    const response = await fetch("https://sst-food-backend.onrender.com/api/createuser", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })

    });
    const json = await response.json()
    setloading(false)
    if (json.sucess) {
      toast.success("signup successfully");
        navigate('/login');
      //save the auth toke to local storage and redirect
    //   localStorage.setItem('token', json.authToken)
    //   navigate("/login")
    }
    else {
      toast.error("Enter Valid Credentials")
    }
  }
//    const handleSubmit =async(e)=>{
//      e.preventDefault();
//      const response = await fetch("https://sst-food-backend.onrender.com/api/createuser",{
//         method:'POST',
//         header:{
//             'Content Type':'application/json'
//         },
//         body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation
//         })
//      })
//      const json = await response.json();
//      console.log(json);
//      if(!json.success){
//         alert('Enter valid Credentials')
//      }
//    }
   const onChange=(event)=>{
    setcredentials({...credentials,[event.target.name]:event.target.value})
   }
  return (
    <div style={{backgroundImage: 'url("https://source.unsplash.com/random/900x700/?food")', height: '100vh', backgroundSize: 'cover' }}>
    <div>
    <Navbar />
    <Toaster />
    </div>
    {loading?<Loader />:  <div className='container' >
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="name" className="form-label text-white">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
          </div>
          <div className="m-3">
            <label htmlFor="email" className="form-label text-white">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
          </div>
          <div className="m-3">
    <label htmlfor="exampleInputPassword1" className="form-label text-white">Address</label>
    <input type="text" className="form-control"  name='geolocation' value={credentials.geolocation} onChange={onChange}/>
  </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-white">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
        </form>
      </div>}

    </div>
  )
}
