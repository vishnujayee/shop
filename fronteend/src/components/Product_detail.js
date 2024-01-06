import React, { useEffect, useState } from 'react'
import {CCarousel,CCarouselItem,CImage} from '@coreui/react'
import './productdetail.css'
import { Badge, Button } from 'react-bootstrap'
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import BoltIcon from '@mui/icons-material/Bolt';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductdetailMutation } from '../services/appapi';
import { Skeleton } from '@mui/material';
export default function Product_detail() {
    const navigate = useNavigate();
    const params = useParams();
    const [productdetail , {isLoading , isError ,error}] = useProductdetailMutation();
    const [pd , setpd] = useState(null);
    useEffect(()=>{
        detaildata();
        async function detaildata() {
            const id = params.product_id;
            if(!id) {
                // navigate("/");
                console.log("id not found");
                return;
            }
            const pdetail = await productdetail({id}).unwrap();
            if(isError || !pdetail) {
                console.log("product not found")
                // navigate("/products/all");
                return;
            }
            setpd(pdetail.product);
        }
    },[])
    // rating and organused data
    return (
        (pd === null || !pd) ? <div><Skeleton></Skeleton></div> : 
            <div className='main-div'>
                <div className='imge'>
                <FavoriteTwoToneIcon style={{position:'relative',left:'188px',top:'26px' ,zIndex:'1'}} />
                    <CCarousel controls indicators dark className='image-slider'>
                        <CCarouselItem>
                            {!pd.image ? <CImage className="d-block w-100 "  src={require("../devmateral/ecomimage/2448261.jpg")} alt="slide 1" /> : <CImage className='d-block w-100' src={pd.image}></CImage>}
                        </CCarouselItem> 
                        <CCarouselItem>
                            <CImage className="d-block w-100"   src={require("../devmateral/ecomimage/5450554.jpg")} alt="slide 2" />
                        </CCarouselItem>
                        <CCarouselItem>
                            <CImage className="d-block w-100"   src={require("../devmateral/ecomimage/andy-hermawan-uFdCDgnoNVI-unsplash.jpg")} alt="slide 3" />
                        </CCarouselItem>
                    </CCarousel>
                    <div>
                        <img  alt="img" src={require("../devmateral/ecomimage/2448261.jpg")} style={{width:'50px' ,height:'50px', backgroundSize:'cover', position:'relative',left:'-200px' ,border:'2pxblack' ,borderStyle:'solid'}}/></div>
                <div className='btn-div'>
                    <Button style={{backgroundColor:'orange', padding:'7px' }}><ShoppingCartSharpIcon/> ADD TO CART</Button>
                    <Button style={{backgroundColor:"red" ,padding:'7px'}}><BoltIcon/>BUY NOW  </Button>
                </div>
            </div>
            <div className='product-det'>
                <span style={{display:'block'}}>Product Full Nave And Model</span>
                <div >
                <Badge>4.3</Badge>
                <span style={{marginLeft:'5px'}}>No of coustmer ratings</span>
                <div>
                    <span>Extra discount </span>
                    <div style={{display:"flex",justifyContent:"space-between",marginTop:"3px"}}>
                        <div >1500rs</div>
                        <div>
                            <span style={{marginRight:'4px' }}>original price</span>
                            <span>15% off</span>
                        </div>
                    </div>
                </div>
                </div>
                
            </div>
            </div>
    )
}
