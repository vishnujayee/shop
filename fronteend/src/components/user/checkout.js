import React from 'react'
import { Button } from 'react-bootstrap'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import AddIcon from '@mui/icons-material/CheckOutlined'
export default function checkout() {
    return (
        <div style={{margin:'4px 4px' , padding:'8px' ,display:'flex' ,flexDirection:'row' }}>
        <div style={{margin:'5px 14px' , padding:'12px' , width:'100%'}}>
        <div style={{display:'flex' , flexDirection:'row' , justifyContent:'space-between'  ,backgroundColor:'whitesmoke', borderRadius:'3px',padding:"4px" , margin:'8px 15px' }}>
            <div style={{margin:"4px 8px"}}>1.login <CheckOutlinedIcon/><div style={{margin:'2px 5px' }}>RHYTHM,7006786019</div></div>
            <Button style={{backgroundColor:'white', color:'blue' ,margin:'4px 8px'  }}>CHANGE</Button>
        </div>
            <div>
                <div style={{margin:'4px 8px' ,padding:'8px' ,backgroundColor:'whitesmoke',borderRadius:'4px',borderColor:'white', width:'100%'}}>
                <div>2.<CheckOutlinedIcon/>DELIVERY ADDRESS</div>
        <div style={{marginBottom:'12px' }}><span>MANAGE ADDRESS</span></div>
        
        <div className='addaddress' style={{ borderStyle:'solid',backgroundColor:'#FFF',padding:'8px',color:'blue',display:'flex', flexDirection:'row', alignItems:'flex-start' ,marginBottom:'22px' ,borderColor:'grey'}}><AddIcon/>ADD NEW ADDRESS</div>
        <div style={{display:'flex' ,flexDirection:'row' ,backgroundColor:'#FFF',borderRadius:'3px',borderColor:'lightblack',borderStyle:'solid',justifyContent:'space-between' }}>
        <div style={{display:'flex' ,flexDirection:"column", margin:'4px 4px' ,padding:'5px'}}>
            <span style={{color:'black',fontWeight:'bolder' ,margin:'4px 8px'}}><input type='checkbox'></input>RHYTHM 7006786019</span>
            <span>hno 35 sarwal jammu</span>
            <div>EDIT</div>
            </div>
        </div>
        </div>
            </div>
            <div style={{backgroundColor:'whitesmoke' ,margin:"7px 8px"}}>
            <div >
                3.ORDER SUMMARY AND FORM
            </div></div>
            <div style={{backgroundColor:'whitesmoke' ,margin:"7px 8px"}}>
            <div >4.PAYMENT</div></div>
        </div>
        <div style={{marginTOP:'4px', marginRight:'15px' , padding:'16px' ,borderColor:'whitesmoke', border:'2px' , borderStyle:'solid'}}>
                            <div>PRiCE DETAIL</div>
                            <hr></hr>
                        <div>
                            <div className='pricetotal'>price(no of items)<span>PRice</span></div>
                            <hr></hr>
                            <div className='pricetotal'>DISCOUNT <span>value discount</span></div>
                            <hr></hr>
                            <div className='pricetotal'> TOTAL <span> FINAlPRice</span></div>
                        </div>
                </div>
                </div>
    )
}
