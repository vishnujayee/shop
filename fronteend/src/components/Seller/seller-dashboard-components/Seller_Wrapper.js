import React from 'react'
import { useState } from 'react';
export default function Seller_Wrapper(props) {
    console.log("checking is seller")
    const [isok , setok] = useState(true);
  return (
    <div>
    {isok ? props.page : <div>error</div>}
    </div>
  )
}
