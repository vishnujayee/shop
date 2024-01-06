import React from 'react'
import { Avatar } from '@mui/material'
import {ListItem} from '@mui/material'
import LocalMallSharpIcon from '@mui/icons-material/LocalMallSharp';
import ChevronRightSharpIcon from '@mui/icons-material/ChevronRightSharp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { ListGroupItem } from 'react-bootstrap'
import {Divider} from '@mui/material';
import './profile.css'
// import { Link } from 'react-router-dom';
export default function profilebar() {
    return (
        <div className='profileoption'>
            <div className='user' style={{display:'flex',flexDirection:'row' ,width:'100%' ,margin:'5px 8px' , backgroundColor:'whitesmoke',borderRadius:'3px',border:'1px white' , padding:'2px'}} >
            <Avatar src={require("../../devmateral/ecomimage/5450554.jpg")}  alt='user-name' style={{width:'50px%' ,backgroundSize:'cover' ,height:'50px'}}/>
                <div style={{margin:"1px 3px"}}>
                    hello,<div>Name</div>
                </div>
            </div>
            <div className='more-setting'>
            <ListGroupItem>
                <ListItem>
                    <div className='setdiv' style={{margin:'5px 4px' ,border:'2px white' , borderBottom: '1px black', borderBottomStyle:'solid' , cursor:'pointer'}}>
                    <LocalMallSharpIcon/>
                    {/* <Link to="/orders"> */}
                        MY ORDERS<ChevronRightSharpIcon/>
                    {/* </Link> */}
                    </div>
                </ListItem>
                <Divider style={{backgroundColor:'grey'}}/>
                <ListItem>
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <div style={{margin:'5px 8px' ,border:'2px white' , borderBottom: '1px black',borderBottomStyle:'solid'}} className='head'><AccountCircleIcon/>ACCOUNT SETTING</div>
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <div  className='setcon'>Profile information</div>
                        <div  className='setcon'>Manage Address</div>
                    </div>
                    </div>
                </ListItem>
                <Divider  style={{backgroundColor:'grey'}}/>
                <ListItem>
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <div style={{margin:'5px 4px' ,border:'2px white' ,color:'black',fontFamily:'sans-serif' , borderBottom: '1px black',borderBottomStyle:'solid'}} className='head'>MY STUFF</div>
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <div className='setcon'>My REWIEWS& RATING</div>
                        <div  className='setcon'>MY WHILST</div>
                        <div  className='setcon'>NOTIFICATIONS</div>
                    </div>
                    <Divider style={{backgroundColor:'grey'}}/>
                    <div className='setcon'><LogoutOutlinedIcon/>LOGOUT</div>
                    </div>
                </ListItem>
                
                
            </ListGroupItem>
            </div>
        </div>
    )
}
