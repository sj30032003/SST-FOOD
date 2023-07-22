
import './App.css';
import Home from  './screens/Home'
import Login from './screens/Login'
import Signup from './screens/Signup';
import MyOrders from './components/MyOrders'
import About  from  './components/About'
import From   from  './components/Form'
import Users from './components/Users';
import { CartProvider } from './components/ContextReducer';
import { AuthProvider } from './components/AuthContext';
import AdminRoute from './components/AdminRoute';
import UserRoute from './components/UserRoute';
import AdminDashboard from './components/AdminDashboard';
import CategoryForm from './components/CategoryForm';
import Profile  from './components/Profile';
import { BrowserRouter as Router,Routes,Route,Link}from 'react-router-dom';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'  //npm i bootstrap-dark-5 boostrap
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <CartProvider>
    <AuthProvider>

    <Router>
<div>
  <Routes>
    <Route exact path ="/" element={<Home/>}></Route>
    <Route exact path ="/login" element={<Login/>}></Route>
    <Route exact path ="/createuser" element={<Signup/>}></Route>
    <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path='createItem' element={<From />} />
          <Route path = "users" element={<Users />} />
          <Route path ="createCategory" element={<CategoryForm/>}/>
    </Route>
        <Route path ="/dashboard" element ={<UserRoute/>}>
    <Route path="user" element={<Profile />} />
    <Route exact path ="myOrder" element={<MyOrders/>}></Route>
    </Route>
    <Route exact path = "/about" element={<About></About>}></Route>
  </Routes>
</div>
    </Router>
    </AuthProvider>
    </CartProvider>


  );
}

export default App;
