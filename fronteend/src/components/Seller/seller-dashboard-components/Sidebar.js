import React, { useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Badge from '@mui/material/Badge';
// import { Link } from 'react-router-dom';
export default function Sidebar() {
    const [sidebar1, setsidebar1] = useState(false);
    const [sidebar2, setsidebar2] = useState(true);
    const [profile, setprofile] = useState(false);
//     const [contentshow ,setshoe] = useState(true);
// const contentbar = (event)=>{
    
// }
const hideorshow = (event)=>{
    console.log("clicked");
    console.log(event);
    if(event.target.dataset.id && event.target.dataset.id == '1') {
        console.log(event.target.dataset.id);
        setsidebar1((state)=> !state);
    }
    if(event.target.dataset.id && event.target.dataset.id == '2') {
        setsidebar2((state)=> !state);
    }
    if(event.target.dataset.seller && event.target.dataset.seller == '1') {
        setprofile((state)=> !state);
    }
}


  return (
    <div className='dashboard-sidebar'>
    <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}} className='sidebar-content-div'>
    <span data-seller = {1} onClick={hideorshow}>seller profile<KeyboardArrowDownIcon/></span>
        {/* <div onClick={contentbar}>icon</div> */}
        {profile && <div className='hidden-content'>
        <hr/>
        <LinkContainer to={"/seller/myshop"} activeStyle={{color:"orange", backgroundColor:'white'}}><div>shop</div></LinkContainer>
        <LinkContainer to={'/seller/profile'} activeStyle={{color:"orange", backgroundColor:'grey'}} ><div>profile</div></LinkContainer>
    </div>}
    </div>
    <hr/>
    <div  className='sidebar-content-div'>
    <span data-id = {1} onClick={hideorshow}>dashboard<KeyboardArrowDownIcon/></span>
    {sidebar1 === true && <div className='hidden-content'>
    <hr/>
    <LinkContainer to={'/seller/dashboard/home'} activeStyle={{color:"orange", backgroundColor:'grey'}} ><div>Home</div></LinkContainer>
    <LinkContainer to={'/seller/dashboard/all-stats'} activeStyle={{color:"orange", backgroundColor:'grey'}}><div>All stats</div></LinkContainer>
    <LinkContainer to={'/seller/dashboard/product-stats'} activeStyle={{color:"orange", backgroundColor:'grey'}}><div>Product stats</div></LinkContainer>
    </div>}
    </div>
    
    <hr/>
    <div className='sidebar-content-div'>
    <span data-id = {2} onClick={hideorshow}>orders<KeyboardArrowDownIcon/></span>
    {sidebar2 && <div className='hidden-content'>
    <hr/>
    <LinkContainer to={"/seller/dashboard/allorders"} activeStyle={{color:"orange", backgroundColor:'grey'}}><div>All orders</div></LinkContainer>
    <LinkContainer to={"/seller/dashboard/pendingorders"} activeStyle={{color:"orange", backgroundColor:'grey'}} ><div><Badge badgeContent= {444} color='warning'>pending orders</Badge></div></LinkContainer>
    <LinkContainer to={"/seller/dashboard/neworders"} activeStyle={{color:"orange", backgroundColor:'grey'}}><div><Badge badgeContent= {100} max ={99} color='warning'>New Orders</Badge></div></LinkContainer>
    <LinkContainer to={"/seller/dashboard/returns"} activeStyle={{color:"orange", backgroundColor:'grey'}}><div><Badge badgeContent= {100} max ={99} color='warning'>Return Orders</Badge></div></LinkContainer>
    </div>}
    </div>
    <hr/>
    <div className='sidebar-content-div'>Ratings & Reviews</div>
    <hr/>
    <div className='sidebar-content-div'>Products</div>
    <hr/>
    <div className='sidebar-content-div'>Notifications</div>
    <hr/>
    <button>LOGOUT</button>
    </div>
  )
}
