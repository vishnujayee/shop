import React, { useEffect } from 'react'
import Orderfilter from '../../components/order/orderfilter'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import StarIcon from '@mui/icons-material/Star';
import {Button,Row}  from 'react-bootstrap'
import '../User/userstyles/order.css'
import { useGetordersMutation } from '../../services/moreapi';
import { useSelector } from 'react-redux';
export default function Order() {
    const user = useSelector((state)=>state.user.user);
    const [getorders] = useGetordersMutation();
    useEffect(()=>{
        async function orders() {
            await getorders({userid:user._id}).unwrap().then(()=>console.log("fetch orders"));
        }
        orders();
    },[])
    return (
        <div className='ordermain'>
            <div className='filterorder'>
            <div>FILTERS</div>
            <Orderfilter title = {"ORDER STATUS"} label={["ON THE WAY","DELIVERED","CANCELLED","RETURN"]}></Orderfilter>
            <Orderfilter title = {"ORDER TIME"} label={[2023,2022,2021,2020,"pastorder"]}/>
            </div>
            <div className='allorders'>
                <div className='serach-order' style={{display:'flex',flexDirection:'row' ,borderRadius:'3px' , borderStyle:'solid' ,borderColor:'whitesmoke' ,width:'100%',margin:'6px 0' , justifyContent:'space-between' }}>
                    <div style={{width:'100%'}}>
                        <input placeholder='search your order' type='text' style={{padding:'6px', height:'100%' , width:'100%'  ,border:'none'}}/>
                    </div>
                    <Button size='sm' style={{borderRadius:'3px' , border:'none' ,padding:'1px' ,margin:'0 2px'}}>
                        <SearchOutlinedIcon/>
                        <span>search order</span>
                    </Button>
                </div>
                <div className='prev-order'>
                    <div style={{display:'flex',flexDirection:'row',margin:'0 15px'}}>
                        <img alt="order-id" src={require("../../devmateral/ecomimage/2448261.jpg")} style={{backgroundSize:'cover',width:'100px',height:"100px", margin:'3px 5px'}}/>
                        <div>
                            <Row><span>product name</span></Row>
                            <Row><span>varient</span> </Row>
                        </div>
                    </div>
                    <div style={{margin:'0 15px'}}>Price</div>
                    <div style={{display:'flex',flexDirection:'column' ,margin:'0  18px'}}>
                        <div style={{display:'flex', flexDirection:'row'}}>
                            <div style={{borderRadius:'5px',backgroundColor:'green',borderStyle:'solid',borderColor:'green' ,width:'10px',height:'10px' ,marginTop:'6px', marginRight:'5px'}}></div>
                            <span>Delivered</span>
                        </div>
                        <div><span>your item has been delivered</span></div>
                        <div style={{display:'flex' ,flexDirection:'row'}} className='reviewdiv'>
                        <StarIcon style={{color:'blue' ,marginRight:'2px'}}/>
                        <span style={{color:'blue'}} className='reviewspan'>RATE & REVIEW PRODUCT</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
