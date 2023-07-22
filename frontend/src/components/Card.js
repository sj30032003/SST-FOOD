import React,{useRef,useEffect,useState} from 'react'
import { useDispatchCart, useCart } from './ContextReducer'
import {useNavigate} from  'react-router-dom';

export default function Card(props) {
  let navigate= useNavigate();
    let options = props.options;
    // console.log(props);
    // let priceOptions =Object.keys(options);
    let priceOptions = options;
    //  console.log(priceOptions[0].price);
    // console.log(options);
    // console.log("hi");
    // console.log(priceOptions);
    // console.log(options[size]);
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState(1)
    // let foodItem = props.foodItem;
    // console.log(foodItem);
    let data= useCart()
    const priceRef = useRef();
    const dispatch = useDispatchCart();
    // console.log(prizeOptions);

    // console.log(foodItem);
    let finalPrice = qty*parseInt(options[size].price);
    const handleAddToCart = async () => {
      if(!localStorage.getItem("authToken")){
        navigate("/login");
      }
      // console.log(props.foodItem._id);
      let food = []
      for (const item of data) {
        if (item.id === props.foodItem._id) {
          food = [...food,item.size]
        }
      }
      // console.log(food)
      // console.log(new Date())

      if (food !== []) {
        // console.log("hello");
        for(const item of food){
        if (item === options[size].name) {
          await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice,size:options[size].name, qty: qty })
          return
        }
      }

          await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice,size:options[size].name,qty: qty,img: props.ImgSrc,Oriznal_Price:options[size].price,img:props.foodItem.img})
          console.log("Size different so simply ADD one more to the list")
          return
      }

      await dispatch({ type: "ADD", id: props.foodItem._id, Oriznal_Price:options[size], name: props.foodItem.name, price: finalPrice, qty: qty, size: options[size].name,img:props.foodItem.img })


      // setBtnEnable(true)

    }
    useEffect(()=>{
      // console.log("hi i am sourabh jain")
      // console.log(priceRef);
      setSize(priceRef.current.value);
    },[])
  return (
    <div>
      <div><div className="card mt-3  " style={{"width": "16rem","maxHeight":"360px"}}>
      <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "150px", objectFit: "fill" }} />
  <div className="card-body">
    <h5 className="card-title">{props.foodItem.name}</h5>

    <div className='container w-100'>
        <select className='m-2 h-100 bg-success rounded' onChange={(e)=>setQty(e.target.value)}>
            {Array.from(Array(6),(e,i)=>{
                return(
                    <option key={i+1} value={i+1}>{i+1} </option>
                )
            })}
        </select>
        <select className='m-2 h-100 bg-success rounded'ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
             {priceOptions.map((option,idx) => {
                return <option key={option.name} value={idx}>{option.name}</option>
              })}
        </select>
        <div className='d-inline h-100 fs-5'>₹{finalPrice}/-</div>
    </div>
    <hr></hr>
    <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>Add to Cart</button>
  </div>
</div></div>
    </div>
  )
}
