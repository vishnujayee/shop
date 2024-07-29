import React, { Fragment } from 'react' 
import './Home.css'
import { grey } from '@mui/material/colors'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Product_Carsoul_List from '../components/shop/product_carsoul_list'
//trending product
//searchrd product 
// sale product banner
//add baneer
//noting content then recently added products
function Home() {
    const user = useSelector((state)=>state.user);
    return (
        <Fragment>
        <span>message- to get message</span>
        {user && user.isAdmin && <div>DashBoard</div>}
            <div className='div-home'>
            <img src={require('../devmateral/ecomimage/andy-hermawan-uFdCDgnoNVI-unsplash.jpg')} alt='home_banner'   className="home-banner"/>
            <Link to={"/products/all_product"}><div style={{backgroundColor:grey}}>Shop Now</div></Link>
            </div>
            <div className='Add_banner_with_page'>
                <img src={require('../devmateral/ecomimage/andy-hermawan-uFdCDgnoNVI-unsplash.jpg')} alt='add_content'/>
            </div>
            <div className='feature_content' style={{display:'block'}}>
                <h3>Trending product</h3>
                <Product_Carsoul_List/>
            </div>
            <div className='feature_content' style={{display:'block'}}>
                <h3>Most Searched Products</h3>
            </div>
            <div className='Add_banner_to_product'>
                <img src={require('../devmateral/ecomimage/andy-hermawan-uFdCDgnoNVI-unsplash.jpg')} alt='add_content'/>
            </div>
            <div className='feature_content' style={{display:'block'}}>
                <h3>Recently Added</h3>
            </div>
            <div className="recent-products-container container mt-4" style={{display:'block',}}>
            <div>see more</div>
            </div>
                
        </Fragment>
    )
}

export default Home