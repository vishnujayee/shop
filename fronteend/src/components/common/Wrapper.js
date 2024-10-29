import React, { useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'

export default function Wrapper(props) {
    let navi =  useNavigate();
    useEffect(()=>{
        navi(props.urlto);
    },[])
  return (
    <div></div>
  )
}
