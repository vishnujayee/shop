import React from 'react'
import { Fragment } from 'react'
import AddIcon from '@mui/icons-material/Add'
import Addressextra from './addressextra'
export default function addressform() {
    return (
        <Fragment>
        <div style={{margin:'4px 8px' ,padding:'8px' ,backgroundColor:'whitesmoke',borderRadius:'4px',borderColor:'white', width:'100%'}}>
        <div style={{marginBottom:'12px' }}><span>MANAGE ADDRESS</span></div>
        
        <div className='addaddress' style={{ borderStyle:'solid',backgroundColor:'#FFF',padding:'8px',color:'blue',display:'flex', flexDirection:'row', alignItems:'flex-start' ,marginBottom:'22px' ,borderColor:'grey'}}><AddIcon/>ADD NEW ADDRESS</div>
        <div style={{display:'flex' ,flexDirection:'row' ,backgroundColor:'#FFF',borderRadius:'3px',borderColor:'lightblack',borderStyle:'solid',justifyContent:'space-between' ,padding:'20px'}}>
        <div style={{display:'flex' ,flexDirection:"column", margin:'4px 4px' ,padding:'5px'}}>
            <span style={{color:'black',fontWeight:'bolder' ,margin:'4px 8px'}}>RHYTHM 7006786019</span>
            <span>hno 35 sarwal jammu</span>
            </div>
            <div><Addressextra/></div>
        </div>
        </div>
            </Fragment>
    )
}
