import './App.css';
import Home from './pages/Home';
import Wrapper from './components/common/Wrapper';
import NotFound from './pages/shop/NotFound';
import Sellerwrapper from './components/Seller/seller-dashboard-components/Seller_Wrapper';
import {
  Route,
  Routes,
  useNavigate,}
from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Addproduct from './pages/new_product';
import Updateproduct from './pages/ubdate_product';
import ALLproductPage from './pages/ALLproductPage';
import CategoryWisePage from './pages/CategoryWisePage';
import Productdetailpage from './pages/Product_detail_page';
import Cart from './pages/User/Cart';
import Order from './pages/User/Order';
import UserProfilewithmyinfo from './pages/User/UserProfilewithmyinfo';
import UserProfilewithaddressinfo from './pages/User/Userprofilewithaddressinfo';
import WHILSIST from './pages/User/WHILSIST';
import Checkout from './pages/User/Checkout';
import Notify from './pages/shop/Notify';
import { useEffect, useState } from 'react';
import { useLogintokenMutation } from './services/appapi';
import Dashboard  from './components/Seller/dashboard';
import All_Stats from './components/Seller/All_Stats';
import Product_stats from './components/Seller/Product_stats';
import Nav_Wrapper from './components/common/Nav_Wrapper';
import OrderSeller from './pages/seller/OrderSeller';
import Pendingorders from './components/Seller/Pendingorders';
import AllOrders from './components/Seller/AllOrders';
import NewOrders from './components/Seller/NewOrders';
import ReturnOrders from './components/Seller/ReturnOrders';
function App() {
  const navigate = useNavigate();
  const [logintoken,{isLoading, isError , error}] = useLogintokenMutation();
useEffect(()=>{
  if(localStorage.getItem("userauth")){ refrshtoken();}
  console.log("useeffect-call");
  async function refrshtoken(){
    const token = localStorage.getItem("userauth");
    if(!token || token == null) {
      localStorage.removeItem("userauth");
      console.log("log out")
      navigate("/");
      return;
    }
    const data =  await logintoken().unwrap().catch((err)=>{
      if(err) {
        localStorage.removeItem("userauth");
        console.log("need to login");
        navigate("/");
        return;
      }
    });
      if(isError || error){
        localStorage.removeItem("userauth");
        console.log("need to login");
        navigate("/");
        return;
      }
      const reftoken = data.token;
      if(!reftoken){
        localStorage.removeItem("userauth");
        navigate("/");
      }else{
      localStorage.setItem("userauth",reftoken);}
  }
},[])
  return (
    <div className="App" style={{width:'100%', height:'100%'}}>
    <Nav_Wrapper/>
      <Routes>
        <Route path='/' index element={<Home/>}/>
        <Route path='/signup' element ={<Signup/>}></Route>
        <Route path='/login' element ={<Login/>}></Route>
        <Route path='/products/all_product' element ={<ALLproductPage/>}></Route>
        <Route path='/products/category/:category/all' element ={<CategoryWisePage/>}></Route>
        <Route path='/products/:category/:product_id/product_detail' element ={<Productdetailpage/>}></Route>
        <Route path='/viewcart' element ={<Cart/>}></Route>
        <Route path='/orders' element ={<Order/>}></Route>
        <Route path='/new_product' element ={<Addproduct/>}></Route>
        <Route path='/update_product/:id' element ={<Updateproduct/>}></Route>
        <Route  path='/myprofile' element ={<UserProfilewithmyinfo></UserProfilewithmyinfo>}></Route>
        <Route path='/myprofile/address' element ={<UserProfilewithaddressinfo></UserProfilewithaddressinfo>}></Route>
        <Route path='/myprofile/whilist' element ={<WHILSIST/>}></Route>
        <Route path='/checkout' element ={<Checkout/>}></Route>
        <Route path='/notification' element ={<Notify/>}></Route>
        {/* <Route path='/register_seller/signup' element ={<Addproduct/>}></Route> */}
        {/* <Route path='/login_seller/login' element ={<Addproduct/>}></Route> */}
        <Route path='/seller/dashboard' element={<Wrapper urlto = "/seller/dashboard/home"/>}></Route> 
        <Route path='/seller/dashboard/home' element={<Sellerwrapper page = {<Dashboard/>}/>}> </Route> 
          <Route path='/seller/dashboard/all-stats' element={<Sellerwrapper page = {<All_Stats/>}/>}></Route>
          <Route path='/seller/dashboard/product-stats' element={<Sellerwrapper page = {<Product_stats/>}/>}></Route>
          <Route path='/seller/dashboard/allorders' element={<Sellerwrapper page = {<OrderSeller page={<AllOrders/>}/>}/>}></Route>
          <Route path='/seller/dashboard/pendingorders' element={<Sellerwrapper page = {<OrderSeller page={<Pendingorders/>}/>}/>}></Route>
          <Route path='/seller/dashboard/neworders' element={<Sellerwrapper page = {<OrderSeller page={<NewOrders/>}/>}/>}></Route>
          <Route path='/seller/dashboard/returns' element={<Sellerwrapper page = {<OrderSeller page={<ReturnOrders/>}/>}/>}></Route>
        {/* <Route path='/seller/sellerprofile' element ={<Addproduct/>}></Route> */}
        {/* <Route path='/seller/seller_shop/' element ={<Addproduct/>}></Route>
        <Route path='/admin/admin_panel/' element ={<Addproduct/>}></Route> */} 
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
