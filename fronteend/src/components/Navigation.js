import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LinkContainer } from 'react-router-bootstrap'
function Navigation(props) {
    const [user ,setuser] = useState({
        Email:"hii@gmail.com",
        isAdmin:false,
        
    })
    return (
        <Navbar  >
            <Container >
                <Navbar.Brand href="/">Ecom</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {!user && <LinkContainer to={"/login"}><Nav.Link >Login</Nav.Link></LinkContainer>}
                        {user  && <NavDropdown title={`${user.Email}`} id="basic-nav-dropdown">
                            {user.isAdmin ? <><LinkContainer to={"/orders"}>
                                <NavDropdown.Item >Orders</NavDropdown.Item>
                            </LinkContainer>
                                <LinkContainer to={"/cart"}>
                                    <NavDropdown.Item >
                                        Cart
                                    </NavDropdown.Item>
                                </LinkContainer>
                            </> :
                                <>
                                    <LinkContainer to={"/dashboard-admin"}>
                                        <NavDropdown.Item >Dahboard</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to={"/create-new-product"}><NavDropdown.Item >Addproduct</NavDropdown.Item></LinkContainer>
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