import React, { Fragment } from 'react'
import Sidebar from './seller-dashboard-components/Sidebar'
import Chart from './seller-dashboard-components/Chart'
import ChartMonth from './seller-dashboard-components/ChartMonth'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
export default function All_Stats() {
  return (
    <div className='seller_dashboard_wrapper'>
    <Sidebar/>
    <div style={{width:'100%'}}>
        <div style={{display:'flex', flexDirection:'row', margin:'1rem'}}>
      <div style={{backgroundColor:'white', borderRadius:'6px', border:'2px dotted black',display:'flex',flexDirection:'column', maxWidth:'16rem', padding:'1rem', boxShadow:'3px black' , minWidth:'10rem' ,margin:'0.1rem'}}>
        <h6 style={{fontSize:'small'}}>Life Time Product Views :</h6>
        <span>$value</span>
      </div>
      <div style={{backgroundColor:'white', borderRadius:'6px', border:'2px dotted black',display:'flex',flexDirection:'column', maxWidth:'16rem', padding:'1rem', boxShadow:'3px black' , minWidth:'10rem' ,margin:'0.1rem'}}>
        <h6 style={{fontSize:'small'}}>Life Time Net Sales :</h6>
        <span>$value</span>
      </div>
      <div style={{backgroundColor:'white', borderRadius:'6px', border:'2px dotted black',display:'flex',flexDirection:'column', maxWidth:'16rem' ,padding:'1rem', marginLeft:'1rem', minWidth:'10rem' ,boxShadow:'3px black'}}>
        <h6 style={{fontSize:'small'}}>Life Time Product Add to Cart</h6>
        <span>$value</span>
      </div>
      <div style={{backgroundColor:'white', borderRadius:'6px', border:'2px dotted black',display:'flex',flexDirection:'column', maxWidth:'16rem' ,padding:'1rem', marginLeft:'1rem', minWidth:'10rem' ,boxShadow:'3px black'}}>
        <h6 style={{fontSize:'small'}}>Life Time Orders</h6>
        <span>$value</span>
      </div>
      <div style={{backgroundColor:'white', borderRadius:'6px', border:'2px dotted black',display:'flex',flexDirection:'column', maxWidth:'16rem' ,padding:'1rem', marginLeft:'1rem', minWidth:'10rem' ,boxShadow:'3px black'}}>
        <h6 style={{fontSize:'small'}}>Total Fulfilled Order</h6>
        <span>$value</span>
      </div>
      <div style={{backgroundColor:'white', borderRadius:'6px', border:'2px dotted black',display:'flex',flexDirection:'column', maxWidth:'16rem' ,padding:'1rem', marginLeft:'1rem', minWidth:'10rem' ,boxShadow:'3px black'}}>
        <h6 style={{fontSize:'small'}}>Total Shop Views</h6>
        <span>$value</span>
      </div>
      
      </div>
      <div style={{display:'flex', flexDirection:'row', margin:'2rem'}}>
      <div style={{backgroundColor:'white', borderRadius:'6px', border:'2px dotted black',display:'flex',flexDirection:'column', maxWidth:'16rem' ,padding:'1rem', marginLeft:'1rem', minWidth:'10rem' ,boxShadow:'3px black'}}>
        <h6 style={{fontSize:'small'}}>Product Available to Sus:</h6>
        <span>$value</span>
      </div>
      <div style={{backgroundColor:'white', borderRadius:'6px', border:'2px dotted black',display:'flex',flexDirection:'column', maxWidth:'16rem' ,padding:'1rem', marginLeft:'1rem', minWidth:'10rem' ,boxShadow:'3px black'}}>
        <h6 style={{fontSize:'small'}}>Total Suscriber</h6>
        <span>$value</span>
      </div>
      <div style={{backgroundColor:'white', borderRadius:'6px', border:'2px dotted black',display:'flex',flexDirection:'column', maxWidth:'16rem' ,padding:'1rem', marginLeft:'1rem', minWidth:'10rem' ,boxShadow:'3px black'}}>
        <h6 style={{fontSize:'small'}}>Total Suscribed Revenue</h6>
        <span>$value</span>
      </div>
      <div style={{backgroundColor:'white', borderRadius:'6px', border:'2px dotted black',display:'flex',flexDirection:'column', maxWidth:'16rem' ,padding:'1rem', marginLeft:'1rem', minWidth:'10rem' ,boxShadow:'3px black'}}>
        <h6 style={{fontSize:'small'}}>Waiting List for Stock</h6>
        <span>$value</span>
      </div>
      <div style={{backgroundColor:'white', borderRadius:'6px', border:'2px dotted black',display:'flex',flexDirection:'column', maxWidth:'16rem' ,padding:'1rem', marginLeft:'1rem', minWidth:'10rem' ,boxShadow:'3px black'}}>
        <p>go to user Site </p>
        <LinkContainer to={'/'}><Button>Seller Portal</Button></LinkContainer>
      </div>
      </div>
      <div>
      <div style={{display:'flex' , flexDirection:'row'}}>
      <p>Yearly order</p>
      <Chart />
      <p>Yearly Sales</p>
      <Chart />
      </div>
        <div style={{display:'flex' , flexDirection:'row'}}>
        <div style={{display:'flex', flexDirection:'column'}}>
        <p>Monthly orders</p>
        <ChartMonth/>
        </div>
        <div>
        <p>Monthly sales</p>
        <ChartMonth/>
        </div>
        
        
        </div>
        <div style={{display:'flex' , flexDirection:'row' }}>
        <p>today order</p>
        <ChartMonth/>
        <p>today sales</p>
        <ChartMonth/>
        </div>
        
      </div>
      </div>
      </div>
  )
}
