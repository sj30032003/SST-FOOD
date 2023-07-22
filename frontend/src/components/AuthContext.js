import React,{useState,useEffect,createContext,useContext,useReducer} from 'react'
const AuthContext = createContext();
const AuthProvider =({children})=>{
    const [auth,setAuth]= useState({user:null,token:null});
    useEffect(()=>{
        const data= localStorage.getItem("auth");
        if(data){
            const parsedData= JSON.parse(data);
            setAuth({
                ...auth,
                user:parsedData,
                token:localStorage.getItem("authToken")
            })
        }
    //eslint-disable-next-line
    },[]);
    return (<AuthContext.Provider value={[auth,setAuth]}>
        {children}
    </AuthContext.Provider>
    )
}
 const useAuth =()=> useContext(AuthContext);
export {useAuth,AuthProvider};