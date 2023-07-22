import React, { useState,useEffect } from 'react';
import '../OptionForm.css'; // Import the CSS file for styling
import {useAuth} from './AuthContext';
import Navbar from './Navbar';
import UserMenu  from './userMenu';
import toast, { Toaster } from "react-hot-toast";
const OptionForm = () => {
  const [optionCount, setOptionCount] = useState(1);
  const [optionValues, setOptionValues] = useState([]);
  const [auth,setAuth]= useAuth();
  const[categorys,setCategorys]=useState([])
  const [credentials,setcredentials]=useState({name:"",CategoryName:"",description:"",img:""})
  const handleOptionCountChange = (event) => {
    const count = parseInt(event.target.value);
    setOptionCount(count);
    setOptionValues(Array(count).fill('').map(() => ({ name: '', price: '' })));
  };

  const handleOptionNameChange = (event, index) => {
    const updatedOptions = [...optionValues];
    updatedOptions[index].name = event.target.value;
    setOptionValues(updatedOptions);
  };

  const handleOptionPriceChange = (event, index) => {
    const updatedOptions = [...optionValues];
    updatedOptions[index].price = event.target.value;
    setOptionValues(updatedOptions);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      // console.log(localStorage.getItem('userEmail'))
      await fetch("http://localhost:5000/api/Categorys", {
          // credentials: 'include',
          // Origin:"http://localhost:3000/login",
          method: 'GET',
          headers: {

              'authorization': auth.token
          },
      }).then(async (res) => {
          let response = await res.json();
          console.log(response)
          let Store=[];
          response.Categorys.map((val)=>{
            Store.push(val.CategoryName)
          })
          setCategorys(Store);
      })
    }
    fetchCategory();
  },[])
  console.log(categorys);
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(credentials);
  //   console.log(optionValues);
  //   // Handle form submission here
  // };
  const handleSubmit = async (e) => {
    // setloading(true)

      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/createItem", {
        // credentials: 'include',
        // Origin:"http://localhost:3000/login",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': localStorage.getItem("authToken")
        },
        body: JSON.stringify({options:optionValues, name: credentials.name, CategoryName: credentials.CategoryName, img :credentials.img, description: credentials.description })

      });
      const json = await response.json()
      // setloading(false)
      if (json.sucess) {
        toast.success("sucessfully submitted")
        // toast.success("signup successfully");
      }
      else {
        toast.error("Enter Valid Credentials")
      }
    }
  const renderOptionInputs = () => {
    return optionValues.map((option, index) => (
      <div key={index}>
        <label htmlFor={`optionName${index}`}>Option {index + 1} Name:</label><br />
        <input
          type="text"
          id={`optionName${index}`}
          name={`optionName${index}`}
          value={option.name}
          onChange={(event) => handleOptionNameChange(event, index)}
        /><br /><br />

        <label htmlFor={`optionPrice${index}`}>Option {index + 1} Price:</label><br />
        <input
          type="text"
          id={`optionPrice${index}`}
          name={`optionPrice${index}`}
          value={option.price}
          onChange={(event) => handleOptionPriceChange(event, index)}
        /><br /><br />
      </div>
    ));
  };
  const onchange=(event)=>{
    setcredentials({...credentials,[event.target.name]:event.target.value})
   }
  return (
    <div>
   <Toaster/>
    <div style={{backgroundImage: 'url("https://source.unsplash.com/random/900x700/?food")', minHeight:'100vh', backgroundSize: 'cover' }}>
    <Navbar/>
    <div className="row">
    <div className="col-md-3 mt-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
    <form className="option-form mt-2" onSubmit={handleSubmit}>
      <label htmlFor="CategoryName">Category Name:</label><br />
      {/* <input type="text" id="CategoryName" name="CategoryName"  value={credentials.CategoryName} onChange={onchange} /><br /> */}
      <select id="CategoryName" name="CategoryName" value={credentials.CategoryName} onChange={onchange} required>
  <option value="">Select a category</option>
  {categorys.map((category,i) => (
    <option className ="text-black" key={category} value={category}>
   {category}
    </option>
  ))}
</select>
      <label htmlFor="name">Dish Name:</label><br />
      <input type="text" id="name" name="name"  value={credentials.name} onChange={onchange} required/><br />

      <label htmlFor="img">Image URL:</label><br />
      <input type="text" id="img" name="img"  value={credentials.img} onChange={onchange} required /><br />

      <label htmlFor="optionCount">Number of Options:</label><br />
      <input
        type="number"
        id="optionCount"
        name="optionCount"
        min="1"
        value={optionCount}
        onChange={handleOptionCountChange} required
      /><br />

      {renderOptionInputs()}

      <label htmlFor="description">Description:</label><br />
      <textarea id="description" name="description"  value={credentials.description} onChange={onchange}  required/><br />

      <input type="submit" value="Submit" />
    </form>
    </div>
    </div>
    </div>
    </div>
  );
};

export default OptionForm;
