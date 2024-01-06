import React from 'react'

export default function orderfilter(props) {
    return (
        <div style={{display:'flex',flexDirection:'column' , margin:'0 24px', padding:'5px',borderRadius:'3px'}}>
            <div >{props.title}</div>
        {props.label.map((item)=>{
            return(
                <div data-val ={item} style={{display:'flex'}}>
                <input type='checkbox' />
                <label>{item}</label>
            </div> 
            )
        })}
    </div>
    )
}
