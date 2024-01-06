import React from 'react'
import {Button,   ListGroupItem } from 'react-bootstrap'
import { ListItem } from '@mui/material'
export default function cartutem(props) {
    return (
        <div className='cart-list'>
                        <ListGroupItem style={{width:"100%"}}>
                            <ListItem>
                                <div style={{display:'flex', flexDirection:'column'}}>
                                    <div style={{display:'flex',flexDirection:'row'}}>
                                        <img src={require("../../devmateral/ecomimage/5450554.jpg")} alt='productname' />
                                        <div style={{marginRight:"6px"}}><div>product name</div><div>Seller name</div> <div>discount <div>price</div></div></div>
                                    </div>
                                    <div style={{display:'flex' ,flexDirection:'row',justifyContent:'space-between',padding:'6px',margin:'4px'}}>
                                        <div style={{display:'flex',flexDirection:'row'}}>
                                            <button className='cartbtn'>-</button>
                                            <input style={{width:'22px', margin:'0 3px'}} defaultValue={1}/>
                                            <button className='cartbtn'>+</button>
                                        </div>
                                        <div style={{display:'flex' ,flexDirection:'row',justifyContent:'space-between',padding:'2px'}}>
                                            <div style={{margin:'0 4px' }} className='savediv' onClick={props.v1f1} data-pid={"655056c9b81030fc0cab76fb"} data-price ={"22"} >{props.val1}</div>
                                            <div style={{margin:'0 7px'}} className='savediv' onClick={props.v2f2} data-pid={"655056c9b81030fc0cab76fb"} data-price ={"22"}>{props.Val2}</div>
                                        </div>
                                    </div></div>
                            </ListItem>
                        </ListGroupItem>
                        {props.isorder && <div className='cart-placeorder'>
                        <div ><form><Button style={{backgroundColor:'orangered'}}>PLACEORDER</Button></form></div>
                    </div>}
                    </div>
    )
}
