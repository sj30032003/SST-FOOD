import { useState, useEffect } from "react";
import { useAuth } from './AuthContext';
import { Outlet } from "react-router-dom";
// import axios from "axios";
import Spinner from "./Spinner";

export default function AdminRoute() {
  // console.log("adminRoute");
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {

    async function authCheck(token) {
    // console.log(token);
        try {
          const response = await fetch("http://localhost:5000/api/admin-auth", {
               // credentials: 'include',
      // Origin:"http://localhost:3000/login",
            method: 'GET',
            headers: {
              'authorization': token
            },
          });

          if (response.ok) {
            setOk(true);
          }
        } catch (error) {
          console.log('Fetch error:', error);
        }
      }

    if (auth?.token) authCheck(auth.token);
  }, [auth?.token]);
  // console.log(ok);
  return ok ? <Outlet /> : <Spinner path="" />;
}