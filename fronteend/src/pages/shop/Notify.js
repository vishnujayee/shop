import React from 'react'
import Profilebar from '../../components/user_seller/profilebar'
import Notification from '../../components/common/Notification'
export default function Notify() {
    return (
        <div style={{display:'flex' , flexDirection:'row' }}>
            <Profilebar/>
            <Notification/>
        </div>
    )
}