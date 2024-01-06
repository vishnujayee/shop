import React from 'react'
export default function Notification() {
    return (
        <div style={{width:'100%' , borderRadius:'4px',borderColor:'#FFF', borderStyle:'solid', margin:'8px 16px'}}>
        <div>ALL NOTIFICATION</div>
        <div style={{backgroundColor:'whitesmoke' , margin:'5px 8px' ,display:'flex' , flexDirection:'row', width:'100%'}}>
            <div style={{margin:'4px 9px'}}><img alt='product' src={require('../../devmateral/ecomimage/2448261.jpg')} style={{width:'100px',height:'100px' ,backgroundSize:'cover'}}/></div>
            <div style={{margin:'15px auto'}}>Your product has been delivered <div>Date</div></div>
        </div></div>
    )
}
