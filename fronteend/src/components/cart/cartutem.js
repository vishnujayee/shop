import React from 'react'
import {Button,   ListGroupItem } from 'react-bootstrap'
import { ListItem } from '@mui/material'
import { useRemovecartMutation ,useInccartitemMutation , useDeccartitemMutation } from '../../services/appapi';
import { useSelector } from 'react-redux';
export default function Cartutem(props) {
    const [removecart ,{isLoading , isError}] = useRemovecartMutation();
    const [inccartitem] = useInccartitemMutation();
    const [deccartitem] = useDeccartitemMutation();
    const userstate = useSelector((state)=>state.user);
    async function removecartitem(e) {
        let datatag = e.target.dataset;
            let pid = datatag.pid;
            let price= datatag.price;
            const userid = userstate.user._id;
            await removecart({userid,productid:pid , price}).unwrap();
    }
    async function incqty(e) {
        let datatag = e.target.dataset;
            let pid = datatag.pid;
            let price= datatag.price;
            const userid = userstate.user._id;
            await inccartitem({userid,productid:pid , price}).unwrap();
    }
    async function decqty(e) {
        let datatag = e.target.dataset;
            let pid = datatag.pid;
            let price= datatag.price;
            const userid = userstate.user._id;
            await deccartitem({userid,productid:pid , price}).unwrap();
    }
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
                                            <button className='cartbtn' data-pid={"659adec8303b6ad201f0cf44"} data-price = {"22"} onClick={decqty}>-</button>
                                            <input style={{width:'22px', margin:'0 3px'}} defaultValue={1}/>
                                            <button className='cartbtn' data-pid={"659adec8303b6ad201f0cf44"}  data-price ={"22"} onClick ={incqty}>+</button>
                                        </div>
                                        <div style={{display:'flex' ,flexDirection:'row',justifyContent:'space-between',padding:'2px'}}>
                                            <div style={{margin:'0 4px' }} className='savediv'  data-pid={"655056c9b81030fc0cab76fb"} data-price ={"22"} data-tag = {"savelater"}>Saveforlater</div>
                                            <div style={{margin:'0 7px'}} className='savediv' onClick={removecartitem} data-pid={"659adec8303b6ad201f0cf44"} data-price ={"22"} data-tag = {"removefromcart"}>Remove</div>
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
