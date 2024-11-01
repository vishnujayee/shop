import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
function Navigation() {
    let user = useSelector((state)=>state.user);
    return (
        <Navbar style={{width:'100%', margin:'0',display:'flex'}}>
        <Container className='nav-container'>
            <LinkContainer to={"/"}>
                <Navbar.Brand>Ecom</Navbar.Brand>
            </LinkContainer>
            {/* <div className='nav-contents'> */}
            <div style={{display:'flex', margin:'0 4rem',width:'90%'}}>
            <div style={{position:'absolute',left:'22.1rem', top:'1rem',borderBlockColor:'black', border:'0.33px solid black',backgroundColor:'grey',width:'fit'}}>All icon</div>
            <div style={{width:'80%'}}><input placeholder=' Enter product name seller name' style={{display:'inline-flex', width:"60%", marginTop:'0.33rem'}}/></div>
            <LinkContainer style={{ marginTop:'0.27rem', backgroundColor:'grey', padding:'0.3rem',width:'fit', marginLeft:'4rem', borderRadius:'4px', marginBottom:'0.33',maxWidth:'110px', cursor:'pointer'}} to={'/seller/dashboard/home'}><div style={{ marginTop:'0.27rem', backgroundColor:'grey', padding:'0.3rem',width:'fit', marginLeft:'4rem', borderRadius:'4px', marginBottom:'0.33',maxWidth:'110px'}}>Seller Portal</div></LinkContainer>
            </div>
            
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {!user && <LinkContainer to={"/login"}><Nav.Link >Login</Nav.Link></LinkContainer>}
                        {user && user.user.Email  && <NavDropdown title={`${user.user.Email}`} id="basic-nav-dropdown">
                        {user.user.Email && <>
                            <LinkContainer to = {'/myprofile'}>
                                <NavDropdown.Item>My Profile</NavDropdown.Item>
                            </LinkContainer>
                        </>}
                            {user.user.Email && <><LinkContainer to={"/orders"}>
                                <NavDropdown.Item >Orders</NavDropdown.Item>
                            </LinkContainer>
                                <LinkContainer to={"/viewcart"}>
                                    <NavDropdown.Item >
                                        Cart
                                    </NavDropdown.Item>
                                </LinkContainer>
                            </>} 
                                {user.user.isAdmin && 
                                    <LinkContainer to={"/dashboard-admin"}>
                                        <NavDropdown.Item >Dahboard</NavDropdown.Item>
                                    </LinkContainer>
                                }
                        {user.user.Email   && <>
                            <LinkContainer to = {'/myprofile/whilist'}>
                                <NavDropdown.Item>whilist</NavDropdown.Item>
                            </LinkContainer>
                        </>}
                        {user.user.Email && <>
                            <LinkContainer to = {'/myprofile/history'} >
                                <NavDropdown.Item>History</NavDropdown.Item>
                            </LinkContainer>
                        </>}
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                logout
                            </NavDropdown.Item>
                        </NavDropdown>}
                    </Nav>
                </Navbar.Collapse>
                </Container>
        </Navbar>
    )
}

export default Navigation