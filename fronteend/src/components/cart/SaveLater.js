import React from 'react'
import { ListGroupItem } from 'react-bootstrap'
import { ListItem } from '@mui/material'
import { useAddcartMutation } from '../../services/appapi';
import { useSelector } from 'react-redux';
export default function SaveLater() {
    const [addcart ,{isLoading , isError}] = useAddcartMutation();
    const userstate = useSelector((state)=>state.user);
    async function addtocartitem(e) {
        let datatag = e.target.dataset;
            let pid = datatag.pid;
            let price= datatag.price;
            const userid = userstate.user._id;
            await addcart({userid,productid:pid , price}).unwrap();
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
                                        {/* <div style={{display:'flex',flexDirection:'row'}}>
                                            <button className='cartbtn'>-</button>
                                            <input style={{width:'22px', margin:'0 3px'}} defaultValue={1}/>
                                            <button className='cartbtn'>+</button>
                                        </div> */}
                                        <div style={{display:'flex' ,flexDirection:'row',justifyContent:'space-between',padding:'2px'}}>
                                            <div style={{margin:'0 4px' }} className='savediv'  data-pid={"659ebfe71bf8e6d2573e17a6"} data-price ={"22"} onClick ={addtocartitem} >Add To Cart</div>
                                            <div style={{margin:'0 7px'}} className='savediv'  data-pid={"655056c9b81030fc0cab76fb"} data-price ={"22"}>Remov From Later</div>
                                        </div>
                                    </div></div>
                            </ListItem>
                        </ListGroupItem>
                    </div>
    )
}
