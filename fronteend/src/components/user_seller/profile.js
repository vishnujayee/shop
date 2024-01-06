import React from 'react'
import Profilebar from './profilebar'
import Dataform from './personaldataform'
import './profile.css'
export default function profile(prop) {
return (
    <div className='main'>
        <Profilebar/>
        <div className='optioncontent'>
        {prop.used}
        </div>
        
    </div>
)
}
