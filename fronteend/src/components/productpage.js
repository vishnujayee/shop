import React, { useEffect } from 'react'
import { useState } from 'react';
import { Card,ListGroup ,Alert } from 'react-bootstrap'
import './productpage.css'
import { LinkContainer } from 'react-router-bootstrap';
 import { useGetproductMutation } from '../services/appapi';
import { Skeleton } from '@mui/material';
function Productpage() {
    const [price,setprice] = useState(0);
    const handleinput = (e) =>{
        setprice(e.target.value)
        console.log(price);
    }
    let brand = ["zoya" ,"zafar" ,"gucci" ,"honda"];
    let checkeddata = [];
    const checkedmark =(e)=>{
        checkeddata.push(e.target.getAttribute('data-val'));
        console.log(checkeddata.map((item)=>{return(item)}));
    }
    const [getproduct, {isLoading , isError , error}] = useGetproductMutation();
    const [load ,setload] = useState(true);
    const [dta , setp] = useState(null);
    useEffect(()=>{
        getproducts()
        async function getproducts(){
            const dta = await getproduct().unwrap();
            setp(dta);
            if(isError || error) setload(false);
            if(!isLoading) setload(false);
        // const data = await fetch('https://fakestoreapi.com/products')
        //         .then(res=>res.json());
        //         console.log(data)
            }
    },[])
    return (
        load ? <div><Skeleton></Skeleton></div>:
        <div style={{margin:'2px 4px',padding:'2px'}}>
            {/* <Stack direction='horizontal' gap={5}   > */}
            { isError && <Alert>{error.message}</Alert>}
            <div  style={{display:'flex', flexDirection:'row'}}>
                <div className='filters'>
                <div className='cdiv'>
                <Card>
                                <label id='range'>Select Range of Price</label>
                                <input type='range' for="range" max={444444} step={10} onInput={handleinput} />
                                <h1>price:{price}$</h1>
                                
                            </Card>
                            <hr></hr>
                            </div>
                            <Card>
                            <div>
                                <p>Choose all brands</p>
                                <div className='check'>
                                {brand.map((item)=>{
                                    return(
                                    <>
                                <label id='checkbox'>{item}</label>
                                    <input type='checkbox' for="checkbox" data-val={item} onChange={checkedmark} ></input></>)
                                })
                                    
                                }
                                </div>
                                
                                </div>
                                
                            </Card>
                            <hr></hr>
                </div>
                    
                <div  className='list_products'>
                {dta.map((p)=>{
                    return(
                        <LinkContainer to={`/products/${p.category}/${p.name}/${p._id}/product_detail`}>
                        <div className='prshow'>
                            <Card style={{borderRight:'3px grey' ,margin:'2px 5px' ,padding:'5px'}}>
                                {p.image ? <Card.Img variant="top" src= {p.image} /> : <Card.Img variant="top" src= {require("../devmateral/ecomimage/2448261.jpg")}/>}
                                <Card.Body as='div'>
                                <ListGroup>
                                    <Card.Title className='change'>{p.title}</Card.Title>
                                </ListGroup>
                                    <ListGroup>
                                    <Card.Text >
                                    {p.description.substring(0,7)}<span style={{color:'blue' ,margin:'1px 5px'}} className ='changer'>Show MORE</span>
                                    </Card.Text>
                                    <span style={{color:'blue'}} >
                                    <Card.Text>{p.price}($)</Card.Text>
                                    </span>
                                    </ListGroup>
                                </Card.Body>
                            </Card></div></LinkContainer>
                            
                    )
                })}
                </div>
                </div>
            {/* </Stack> */}
        </div>
    )
}
export default Productpage
