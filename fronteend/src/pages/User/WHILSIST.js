import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import Profilebar from '../../components/user_seller/profilebar'
export default function WHILSIST() {
    return (
        <div style={{display:'flex' ,width:'100%'}}>
            <Profilebar/>
            <div style={{width:'100%' ,padding:'18px'}}>
                <div style={{margin:'0 5px',marginTop:'18px' ,backgroundColor:'whitesmoke' , borderColor:'grey' ,borderStyle:'solid',width:'100%',padding:'14px'}}>MY WHILSILT(ITEMS)</div>
                <hr></hr> 
                <div style={{display:'flex' , flexDirection:'row' ,padding:'2px' ,width:'100%' , backgroundColor:'whitesmoke', borderColor:'grey' ,borderStyle:'solid' , margin:'7px 14px' ,justifyContent:'space-between'}}>
                    <div ><img alt='productid' src={require("../../devmateral/ecomimage/2448261.jpg")} style={{width:'100px' ,height:'100px' , backgroundSize:'cover', margin:'4px 13px' }}/>
                    
                    </div>
                    <div style={{display:'flex' , flexDirection:'row',justifyContent:'space-between', margin:'4px 22px' ,padding:'5px'}}>
                        <div style={{width:'100%',padding:'4px'}}>
                            <div>name <span>rating</span></div>
                            <div>price</div>
                        </div>
                    </div>
                        <div><DeleteIcon/></div>
                </div>
            </div>
        </div>
    )
}
