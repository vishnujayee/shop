import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Row ,Col } from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
import categories from '../categories'
import './Home.css'
function Home() {
    return (
        <Fragment>
            <div className='div-home'>
            <img src={require('../devmateral/ecomimage/andy-hermawan-uFdCDgnoNVI-unsplash.jpg')} alt='home_banner'   className="home-banner"/>
            </div>
            <div className='feature_content' style={{display:'block'}}>
                <h2>Last product</h2>
                <div>
                    <Link to='/category/all' style={{ textAlign: "right", display: "block", textDecoration: "none" }}>see more</Link>
                </div>
                
            </div>
            <div className="recent-products-container container mt-4" style={{display:'block',}}>
            <h2>categories</h2>
                <Row>
                    {categories.map((category)=>(
                        <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`} className=''>
                            <Col md={4}>
                                <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`, gap: "10px" }} className="category-tile">
                                    {category.name}
                                </div>
                            </Col>
                        </LinkContainer>
                    ))}
                </Row>
                
                <div>helo</div>
            </div>
                
        </Fragment>
    )
}

export default Home
// style={{display:'block',width:'100%', height:'400px',}}
// style={{backgroundSize:'cover',width:'100%', height:'60vh',}}