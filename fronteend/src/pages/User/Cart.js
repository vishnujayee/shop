import React, { useEffect, useState } from 'react'
import  {Button} from 'react-bootstrap'
import Cartutem from '../../components/cart/cartutem'
import '../User/userstyles/cart.css'
import { useSelector } from 'react-redux';
import { useAddcartMutation } from '../../services/appapi';
// import { ListItem } from '@mui/material'
import { useRemovecartMutation } from '../../services/appapi';
export default function Cart() {
    const [addcart] = useAddcartMutation()
    const [color,setcolor] = useState(1);
    let opt1 = "#FFFF"
    let opt2 = "whitesmoke"
    function changecolor(){
        setcolor(2);
    }
    function originalcolor(){
        setcolor(1);
    }
    const user = useSelector((state)=>state.user);
    // const id = user.user._id;
    // const [cart ,{isLoading}] = useGetcartMutation();
    // useEffect(()=>{
    //     const getcart = async() =>{
    //         await cart({id:user.user._id}).unwrap().then(()=>{
    //             console.log("get cart");
                
    //         })
    //     }
    //         getcart();
        
    // },[])
    const [removecart] = useRemovecartMutation();
    function saveforlater(e) {}
    function removefromlater(e) {}
    async function addtocart(e) {
        const productid = e.target.dataset.pid;
        const price = e.target.dataset.price;
        const userid = user.user._id;
        await addcart({productid ,price , userid}).unwrap().then((payload)=>{
            console.log(payload);
            console.log('add to cart');
        });
        
    }
    async function removefromcart(e) {
        const productid = e.target.dataset.pid;
        const price = e.target.dataset.price;
        const userid = user.user._id;
        await removecart({productid , userid , price}).unwrap().then(()=>console.log("removed"));
    }
    return (
        <div className='cart-main'>
            <div className='content'>
                <div className='car-items'>
                    <div className='address'>
                        <div>Deliver TO :<span> name, Pincode</span> <div>ADDRESS</div></div>
                        <div><Button style={{backgroundColor:color === 1 ? opt1 : opt2, color:'blue' , padding:'4px',borderRadius:'2px' ,margin:'3px 0'}} onMouseMove={changecolor} onMouseLeave={originalcolor}>Change</Button></div>
                    </div>
                    <Cartutem val1 = {"Save FOR LATER"} Val2 = {"REMOVE"} isorder={true} v1f1 = {saveforlater} v2f2 = {removefromlater}/>
                    {/* <div className='cart-placeorder'>
                        <div ><form><Button style={{backgroundColor:'orangered'}}>PLACEORDER</Button></form></div>
                    </div> */}
                </div>
                <div className='Save_later'>
                    <div>Save For Later (Total items)</div>
                    <div className='save-items'>
                        <Cartutem val1 = {"ADD TO CART"} Val2 = {"REMOVE"}  isorder={false} v1f1 = {addtocart} v2f2 = {removefromcart}/>
                    </div>
                </div>
            </div>
            <div className='price'>
                <div>
                            <div>PRiCE DETAIL</div>
                            <hr></hr>
                        <div>
                            <div className='pricetotal'>price(no of items)<span>PRice</span></div>
                            <hr></hr>
                            <div className='pricetotal'>DISCOUNT <span>value discount</span></div>
                            <hr></hr>
                            <div className='pricetotal'> TOTAL <span> FINAlPRice</span></div>
                        </div>
                </div>
            </div>
        </div>
    )
}
