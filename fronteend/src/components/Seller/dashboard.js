import React, { useState } from 'react'
import  '../Seller/seller-dashboard-components/seller-components-css/dashboard.css';
import Rating from '@mui/material/Rating';
import Sidebar from './seller-dashboard-components/Sidebar';
import { LinkContainer } from 'react-router-bootstrap';
export default function Dashboard() {
  const [showplusrewiew,  changeplusreview] = useState(true);
  const [showtop,  changetop] = useState(true);
  return (
    <div  className='seller_dashboard_wrapper'>
    <Sidebar/>
    <div className='stats-main-page'>
    <div className='overall-basic-stats'>
    <div style={{display:'flex', flexDirection:'row', }}>
      <div style={{backgroundColor:'white', borderRadius:'6px', border:'2px dotted black',display:'flex',flexDirection:'column', maxWidth:'16rem', padding:'1rem', boxShadow:'3px black' , minWidth:'10rem' ,}}>
        <h6 style={{fontSize:'small'}}>Total net-Revenus this year :</h6>
        <span>$value</span>
      </div>
      <div style={{backgroundColor:'white', borderRadius:'6px', border:'2px dotted black',display:'flex',flexDirection:'column', maxWidth:'16rem' ,padding:'1rem', marginLeft:'1rem', minWidth:'10rem' ,boxShadow:'3px black'}}>
        <h6 style={{fontSize:'small'}}>This Month sales</h6>
        <span>$value</span>
      </div>
      <div style={{backgroundColor:'white', borderRadius:'6px', border:'2px dotted black',display:'flex',flexDirection:'column', maxWidth:'16rem' ,padding:'1rem', marginLeft:'1rem', minWidth:'10rem' ,boxShadow:'3px black'}}>
        <h6 style={{fontSize:'small'}}>This Month net sales</h6>
        <span>$value</span>
      </div>
      <div style={{backgroundColor:'white', borderRadius:'6px', border:'2px dotted black',display:'flex',flexDirection:'column', maxWidth:'16rem' ,padding:'1rem', marginLeft:'1rem', minWidth:'10rem' ,boxShadow:'3px black'}}>
        <h6 style={{fontSize:'small'}}>Today sales</h6>
        <span>$value</span>
      </div>
      <div style={{backgroundColor:'white', borderRadius:'6px', border:'2px dotted black',display:'flex',flexDirection:'column', maxWidth:'16rem' ,padding:'1rem', marginLeft:'1rem', minWidth:'10rem' ,boxShadow:'3px black'}}>
        <h6 style={{fontSize:'small'}}>Todal net sales</h6>
        <span>$value</span>
      </div>
      </div>
      <div style={{display:'flex', flexDirection:'row', marginTop:"2rem"}}>
      <div style={{backgroundColor:'white', borderRadius:'6px', border:'2px dotted black',display:'flex',flexDirection:'column', maxWidth:'16rem', padding:'1rem', boxShadow:'3px black' , minWidth:'10rem' ,}}>
        <h6 style={{fontSize:'small'}}>Today orders :</h6>
        <span>value</span>
      </div>
      <div style={{backgroundColor:'white', borderRadius:'6px', border:'2px dotted black',display:'flex',flexDirection:'column', maxWidth:'16rem' ,padding:'1rem', marginLeft:'1rem', minWidth:'10rem' ,boxShadow:'3px black'}}>
        <h6 style={{fontSize:'small'}}>Today Fullfilled order</h6>
        <span>value</span>
      </div>
      <div style={{backgroundColor:'white', borderRadius:'6px', border:'2px solid black',display:'flex',flexDirection:'column', maxWidth:'16rem' ,padding:'1rem', marginLeft:'1rem', minWidth:'10rem' ,boxShadow:'3px blue' , borderBottomRightRadius:'8px'}}>
        <LinkContainer style={{fontSize:'small', cursor:'grab'}} to={'/'}><h6 style={{fontSize:'small'}}>Pending Order</h6></LinkContainer>
        <span style={{color:'red'}}>value</span>
      </div>
      <div style={{backgroundColor:'white', borderRadius:'6px', border:'2px solid black',display:'flex',flexDirection:'column', maxWidth:'16rem' ,padding:'1rem', marginLeft:'1rem', minWidth:'10rem' ,boxShadow:'3px black'}}>
        <LinkContainer style={{fontSize:'small', cursor:'grab'}} to ={"/"}><h6 style={{fontSize:'small'}}>return order</h6></LinkContainer>
        <span style={{color:'red'}}>value</span>
      </div>
      </div>
      <div style={{backgroundColor:'white', borderRadius:'6px', border:'2px solid black',display:'flex',flexDirection:'column', maxWidth:'16rem' ,padding:'1rem', marginLeft:'1rem', minWidth:'10rem' ,boxShadow:'3px black', margin:'2rem'}}>
        <div style={{fontSize:'small',display:'flex', flexDirection:'column'}}>
        <span style={{fontSize:'1rem',margin:'0.3px', }}>Product Views Today :<span style={{margin:'0.1px', color:'blue', fontSize:'bold', marginLeft:'2px'}}>{1}</span></span>
        <span style={{fontSize:'1rem',margin:'0.3px'}}>Product Added to  cart :<span style={{margin:'0.1px', color:'blue', fontSize:'bold', marginLeft:'2px'}}>{1}</span> </span>
        <span style={{fontSize:'1rem',margin:'0.3px'}}>Today shop views:<span style={{margin:'0.1px', color:'blue', fontSize:'bold', marginLeft:'2px'}}>{1}</span> </span>
        </div>
        {/* <span style={{color:'red'}}>value</span> */}
      </div>
      <div >
      <span>TOP Products
      </span>
      <div>
     <div style={{border:'1px solid black'}}>today</div>
        {showtop && <div style={{border:"1px solid grey", borderRadius:'4px', backgroundColor:'gray'}}>
          <div className='hover-div'>Today top</div>
          <div className='hover-div' >weekly top</div>
          <div className='hover-div' >yearly top</div>
        </div>}
     </div>
      </div>
      
     
      <div style={{display:'flex', flexDirection:'row', border:'1px solid grey', borderRadius:'6px', marginTop:'1rem', marginRight:'2rem',}}>
        <div style={{display:'flex', flexDirection:'row' , margin:'1rem 2rem'}}>
        <span style={{ color:'gold', fontWeight:'bolder', textShadow:"6px golder", fontSize:'1.6rem'}}>1</span>
          <div><img src={require("../../devmateral/ecomimage/2448261.jpg")} alt='top-product ' style={{width:'80%'}}></img></div>
          <div>title</div>
          </div>
          <hr/>
          <div style={{display:'flex', flexDirection:'row' , margin:'1rem 2rem'}}>
          <span style={{ color:'gold', fontWeight:'bolder', textShadow:"6px golder", fontSize:'1.6rem'}}>2</span>
          <div><img src={require("../../devmateral/ecomimage/2448261.jpg")} alt='top-product ' style={{width:'80%'}}></img></div>
          <div>title</div>
          </div>
          <hr/>
          <div style={{display:'flex', flexDirection:'row' , margin:'1rem 2rem' ,boxShadow:'5px grey'}}>
          <span style={{ color:'gold', fontWeight:'bolder', textShadow:"6px golder", fontSize:'1.6rem'}}>3</span>
          <div><img src={require("../../devmateral/ecomimage/2448261.jpg")} alt='top-product ' style={{width:'80%'}}></img></div>
          <div>title</div>
          </div>
          <hr/>
      </div>
    </div>
    <div style={{display:'flex',flexDirection:'column', margin:'1rem 3rem'}}>
      <LinkContainer style={{backgroundColor:'gray',padding:'0.4rem', cursor:'pointer', borderRadius:'4px'}} to={'/'}><div >User Portal</div></LinkContainer>
      <div style={{border:'2px solid black', padding:'2rem', marginTop:'2rem'}}>
        <h6>Total reviews :{0} {showplusrewiew && <span style={{position:'absolute', backgroundColor:'orange', borderRadius:'8px'}}>+</span>}</h6>
    <Rating 
      name='users-revies'
      readOnly
      value={2.4}
      precision={0.5}
        size='100'
    />
      </div>
      
      </div>
    </div>
    
    </div>
  )
}
