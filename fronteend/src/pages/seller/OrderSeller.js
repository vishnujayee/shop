import React from 'react'
import Sidebar from '../../components/Seller/seller-dashboard-components/Sidebar'
import '../../components/Seller/stats.css'
export default function OrderSeller({page}) {
  return (
    <div style={{display:'flex' , flexDirection:'row'}}>
        <Sidebar/>
        <div style={{width:'100%'}}>{page}</div>
    </div>
  )
}
