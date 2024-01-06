import React from "react"
import Product from "../components/product"
const addproduct = () =>{
    return (
        <div style={{margin:'4px 16px' ,padding:'14px' ,display:'flex',flexDirection:'column',justifyContent:'center' ,width:'100%'}}>
            <p>Add Detail Of New Product</p>
            <Product/>
        </div>
    )
}
export default addproduct;
