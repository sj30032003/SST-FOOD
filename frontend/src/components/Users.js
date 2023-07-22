import React,{useState,useEffect} from 'react'
import {useAuth} from './AuthContext';
import Navbar from './Navbar';
export default function Users() {
    const [auth, setAuth] = useAuth();
    const [allUsers,setAllUsers] = useState([]);
    const getUsers = async () => {
      try {
        const { data } =  await fetch("http://localhost:5000/api/users", {
          // credentials: 'include',
          // Origin:"http://localhost:3000/login",
          method: 'GET',
          headers: {
            'authorization': auth.token
          },
      }).then(async (res) => {
          let response = await res.json();
          // console.log(response);
          await setAllUsers(response.users)
        //   console.log(allUsers);

      });

      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      if (auth?.token) getUsers();
    }, [auth?.token]);

  return (
    <div>
    <Navbar/>
    <h1 className="text-center">All Users</h1>
    <div className="border shadow">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              {/* <th scope="col">Order_id</th> */}
              <th scope="col">id</th>
              <th scope="col"> email</th>
              <th scope="col">name</th>
              <th scope="col">location</th>
              <th scope="col">role</th>

            </tr>
          </thead>

    {allUsers?.map((u,i) => {
      return (

<tbody>
<tr>
  <td>{i+1}</td>
  {/* <td>{o._id}</td> */}
  <td>{u._id}</td>
  <td>{u.email}</td>
  <td>{u.name}</td>
  <td>{u.location}</td>
  <td>{u.role}</td>
</tr>
</tbody>
      )})}
     </table>

</div>

    </div>
  )
}
