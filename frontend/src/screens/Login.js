import React,{useState} from 'react';
import {Link,useNavigate,useLocation} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import toast, { Toaster } from 'react-hot-toast';
import {useAuth} from  '../components/AuthContext';
export default function Login() {
    const [credentials,setcredentials]=useState({email:"",password:""})
    const [loading,setloading]= useState(false);
    const [auth,setAuth]= useAuth();
    let navigate= useNavigate();
    let location = useLocation();
const handleSubmit = async (e) => {
    setloading(true);
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({  email: credentials.email, password: credentials.password})

    });
    setloading(false);
    const json = await response.json();

    if (json.success) {
      setAuth({
        ...auth,
        user:json.Data,
        token:json.authToken
      });
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      localStorage.setItem("auth",JSON.stringify(json.Data));
      toast.success("logges successfully");

      if(json.Data.role===1){

        navigate("/dashboard/admin")
        toast.success("Welcome you are Admin");
      }else{
      navigate(location.state||"/");
      }
    }
    else {
      toast.error("Enter Valid Credentials")
    }
  }
   const onChange=(event)=>{
    setcredentials({...credentials,[event.target.name]:event.target.value})
   }
  return (
    <div style={{backgroundImage: 'url("https://source.unsplash.com/random/900x700/?food")', height: '100vh', backgroundSize: 'cover' }}>
    <Toaster/>
      <div>
        <Navbar />
      </div>

      {loading?<Loader />:<div className='container'>
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3 text-white">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone.</div>
          </div>
          <div className="m-3 text-white">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/createuser" className="m-3 mx-1 btn btn-danger">New User</Link>
        </form>

      </div>}


    </div>
  )
}
