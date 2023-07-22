import React,{useState,useEffect,createContext,useContext,useReducer} from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img,Oriznal_Price:action.Oriznal_Price }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "DROP":
            let empArray = []
            return empArray
        case "UPDATE":
            let arr = [...state]
            // console.log("joooo")
            // console.log(action);
            arr.find((food, index) => {
                if ((food.id === action.id)&&(food.size==action.size)) {
                    console.log(food.qty, parseInt(action.qty), parseInt(action.price) , food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + parseInt(food.qty), price: (action.price + food.price) }
                    return arr
                }


            })
            return arr
        default:
            console.log("Error in Reducer");
    }
};
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    // useEffect(()=>{
    //     dispatch({type:"Drop"});
    // },[])
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);