import { Fragment } from "react"
import Product from "../components/product"
const updateproduct = () => {
    return (
        <Fragment>
            <div style={{margin:'4px 16px' ,padding:'14px' ,display:'flex',flexDirection:'column',justifyContent:'center' ,width:'100%'}}>
                <p>UPDATE PRODUCT</p>
                <Product />
            </div>
        </Fragment>
    )
}
export default updateproduct;