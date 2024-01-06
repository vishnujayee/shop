import React, { useState } from 'react'
import { Container,Row,Col,Form,FormGroup ,Button} from 'react-bootstrap'
import { Skeleton } from '@mui/material'
import { Link, useNavigate} from 'react-router-dom'
import './Signup.css'
import { Alert } from 'react-bootstrap'
import {useSignupMutation } from '../services/appapi'
export default function Signup() {
  const [email,setemail] = useState("");
  const [name,setname] = useState("");
  const [password,setpassword] = useState("");
  const [signup ,{error,isLoading , isError}] = useSignupMutation();
  const [dataok , setdataok] = useState(true);
  const [load , setload] = useState(false);
  const navigate = useNavigate();
  async function  handlesignup(e) {
    e.preventDefault();
    setload(true);
    if(!name || name.split().length === 0 || !email || email.split().length === 0 || !email.includes("@") || !password || password.split().length === 0 || password.length<8) {
      setdataok(false);
      setload(false);
      return;
    }
    await signup({name,email,password});
    if(!isLoading) setload(false);
    setemail("");
    setname("");
    setpassword("");
    navigate("/login")
  }
  return (
    load ? <div><Skeleton />
<Skeleton animation="wave" />
<Skeleton animation={false} /></div>
    :<Container >
    <Row className='box'>
    <Col md={6} className='signup_container'>
    <Form style={{width:"100%"}} onSubmit={handlesignup} >
    {isError && <Alert variant='danger'>{error.data}</Alert>}
    {!dataok && <Alert variant='danger'>{"please check your credietial and password must be gretaer than 8 and all input field is required"}</Alert>}
    <p>Create your account </p>
    <FormGroup>
    <Form.Label>Name</Form.Label>
    <Form.Control type ="text" placeholder = "Your Name" value = {name} onChange={(e)=>{setname(e.target.value)}} required />
    </FormGroup>
    <FormGroup>
    <Form.Label>Email ADDRESS</Form.Label>
    <Form.Control type ="email" placeholder = "something@gmail.com" value = {email}  onChange={(e)=>{setemail(e.target.value)}} required />
    </FormGroup>
    <FormGroup>
    <Form.Label>PASSWORD</Form.Label>
    <Form.Control type ="password" placeholder = " Enter password" value = {password}  onChange={(e)=>{setpassword(e.target.value)}} required />
    </FormGroup>
    <FormGroup>
        <Button type = "submit" disabled ={load}>Signup</Button>
    </FormGroup>
    <p>Account already Existed ? <Link to="/Login">Login to Your Account  </Link></p>
    </Form>
    </Col>
    <Col  className='signup_image_container'></Col>
    </Row>
    </Container>
  )
}
