import React from 'react'
import Profile from '../../components/user_seller/profile'
import Addressform from '../../components/user_seller/addressform'
export default function UserProfilewithaddressinfo() {
    return (
        <Profile used = {<Addressform></Addressform>}/>
    )
}