import React, { useEffect, useState } from 'react'
import Navigation from '../Navigation'
import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
export default function Nav_Wrapper() {
    const [shownav , changenav] = useState(false);
    let url = useLocation();
    useEffect(()=>{
        console.log(url.pathname.search("seller"));
        if(url.pathname.search("seller") === 1 || url.pathname.search("admin") === 1) {
            changenav(false);
            return;
        }
        changenav(true);
    },[url])
  return (
<Fragment>
    {shownav && <Navigation/>}
</Fragment>
  )
}
