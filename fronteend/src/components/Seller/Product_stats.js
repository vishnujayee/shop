import React, { Fragment, useEffect, useRef, useState } from 'react'
import Sidebar from './seller-dashboard-components/Sidebar'
import './stats.css'
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import BasicTable from './BasicTable';
import ChartMonth from '../Seller/seller-dashboard-components/ChartMonth'

export default function Product_stats() {
  const [parttoshow, changeparttoshow] = useState(0);
  let ref0 = useRef(null);
  let ref1 = useRef(null);
  let ref2 = useRef(null);
  const changepart =(e)=> {
    let part = e.target.dataset.part;
    if(part === parttoshow) return;
    console.log(part)
    if(!part || part < 0 || part > 2) return;
    console.log('here')
    changeparttoshow(part);
    if(part == 0) {
      ref0.current.style.backgroundColor = "purple"
      ref1.current.style.backgroundColor = "#CBC3E3"
      ref2.current.style.backgroundColor = "#CBC3E3"
    }else if(part == 1) {
      ref1.current.style.backgroundColor = "purple"
      ref0.current.style.backgroundColor = "#CBC3E3"
      ref2.current.style.backgroundColor = "#CBC3E3"
    }else if( part == 2) {
      ref2.current.style.backgroundColor = "purple"
      ref0.current.style.backgroundColor = "#CBC3E3"
      ref1.current.style.backgroundColor = "#CBC3E3"
    }
  } 
  
  return (
    <div className='seller_dashboard_wrapper'>
        <Sidebar/>
        <div style={{width:'100%'}}>
        <div style={{display:'flex', marginTop:'1rem,' , flexDirection:'row', marginLeft:'3rem'}}>
          <div className={"div_button"} style={{backgroundColor:'purple'}} onClick={changepart} data-part={0} ref={ref0}>All Prodcut</div>
          <div className={"div_button"} onClick={ changepart} data-part={1} ref={ref1}>Suscriptions</div>
            <div className={"div_button"} onClick={changepart} data-part={2} ref={ref2}>Waiting List</div>
        </div>
            <div className='showcase-content' style={{maxHeight:"40rem"}}>
            {parttoshow == 0 ? <Productwise/> :  parttoshow == 1 ? <Suscriptionwise/> : parttoshow == 2 ? <WaitingList/> : <LinkContainer to={'/seller/dashboard/home'}><Button>Error</Button></LinkContainer>}
            </div>
        </div>
    </div>
  )
}
function Productwise() {
  const [page, setPage] = React.useState(0);
  const[pageshow , setpageshow] = useState(false);
  const [pagedata , setpagedata] = useState([]);
  const handleChange = (event, value) => {
    setPage(value);
  };
  function createData(id,name, calories, fat, carbs, protein) {
    return {id,name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData("1",'Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData(2,'Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData(3,'Eclair', 262, 16.0, 24, 6.0),
    createData(4,'Cupcake', 305, 3.7, 67, 4.3),
    createData(5,'Gingerbread', 356, 16.0, 49, 3.9),
    createData(6,'Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData(7,'Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData(8,'Eclair', 262, 16.0, 24, 6.0),
    createData(9,'Cupcake', 305, 3.7, 67, 4.3),
    createData(10,'Gingerbread', 356, 16.0, 49, 3.9),
  ];
  const setpageinfo = (val) =>{
setpagedata([val]);
  }
  console.log(page)
  return (
    <Fragment>
      <div>
       <div>
        <Button >
        User Portal
        </Button>
        <Button style={{backgroundColor:'green'}}>
        Export
        </Button>
      </div>
      <div >
        <BasicTable
          rows={rows}
          setpagedata={setpageinfo}
          setpage={setpageshow}
        />
        <div style={{display:'flex' ,justifyContent:"row", marginLeft:'6rem'}}>
      <Typography>Page: {page}</Typography>
        <Stack spacing={2}>
      <Pagination count={10} page={page} onChange={handleChange} />
    </Stack>
        </div>
      </div>
    </div>
    {pageshow &&<PageData 
    pagedata = {pagedata}
    setpageshow ={setpageshow}
    />}
    </Fragment>
  )
}
function Suscriptionwise() {
  return (
    <div style={{display:'flex', flexFlow:'wrap', margin:'2rem'}}>
      <div style={{display:'flex', flexDirection:'row', backgroundColor:'white' , border:'2px black solid' , borderRadius:"6px", boxShadow:'2px black',maxWidth:"30rem", padding:'0.5rem', margin:"1rem"}}>
      <div style={{display:'flex',flexDirection:'column', borderRight:'2px black solid', marginRight:"0.5rem"}}>
        <div><img src= {require("../../devmateral/ecomimage/2448261.jpg")} style={{backgroundPosition:'cover'}} alt='product-name'/></div>
        <p>title of the product</p>
      </div>
      <div style={{display:'flex' , flexDirection:'column', padding:'0.5rem', margin:'0.5rem'}}>
      <div style={{margin:'0.2rem'}}>People Suscribed<span style={{color:"red"}}>{5}</span></div>
      <div style={{backgroundColor:"black" , borderRadius:'4px' , margin:'1rem', padding:'0.3rem' , color:"red"}}> Remove suscribe product</div>
      </div>
      </div>
    </div>
  )
}
function WaitingList() {
  return (
    <div style={{display:'flex', flexFlow:'wrap', margin:'2rem'}}>
      <div style={{display:'flex', flexDirection:'row', backgroundColor:'white' , border:'2px black solid' , borderRadius:"6px", boxShadow:'2px black',maxWidth:"30rem", padding:'0.5rem', margin:"1rem"}}>
      <div style={{display:'flex',flexDirection:'column', borderRight:'2px black solid', marginRight:"0.5rem"}}>
        <div><img src= {require("../../devmateral/ecomimage/2448261.jpg")} style={{backgroundPosition:'cover'}} alt='product-name'/></div>
        <p>title of the product</p>
      </div>
      <div style={{display:'flex' , flexDirection:'column', padding:'0.5rem', margin:'0.5rem'}}>
      <div style={{margin:'0.2rem'}}>People waits<span style={{color:"red"}}>{5}</span></div>
      <div style={{backgroundColor:"black" , borderRadius:'4px' , margin:'1rem', padding:'0.3rem' , color:"red"}}> Edit</div>
      </div>
      </div>
    </div>
  )
}
function PageData({pagedata ,setpageshow}) {
return (
  <div style={{overflow :"hidden" ,overflowY:"scroll", maxWidth:'100%', position:"relative", top:'-36rem', maxHeight:'60rem', backgroundColor:'white', border:"3px grey solid", borderTopLeftRadius:"8px", margin:'2rem', borderTopRightRadius:"6px" , height:'35rem'}}>
    <div style={{display:'flex', position:'relative' , left:'63rem', margin:'0.4rem'}}><button onClick={()=> setpageshow(false)} style={{color:'white', backgroundColor:'black', border:"4px", margin:'5px', padding:'5px',borderRadius:'6px'}}>close</button></div>
    <div style={{display:'flex', flexDirection:'column'}}>
      <div style={{display:'flex' , flexDirection:'row', maxWidth:'60rem'}}>
        <div style={{backgroundColor:'#CBC3E3', borderRadius:"6px" , boxShadow:'2px black solid' , border:'2px black solid', padding:'5px', margin:'1rem'}}>Life Time Views <span style={{color:'blue'}}>{999}</span></div>
        <div style={{backgroundColor:'#CBC3E3', borderRadius:"6px" , boxShadow:'2px black solid' , border:'2px black solid', padding:'5px', margin:'1rem'}}>Product Save in List <span style={{color:'blue'}}>{999}</span></div>
        <div style={{backgroundColor:'#CBC3E3', borderRadius:"6px" , boxShadow:'2px black solid' , border:'2px black solid', padding:'5px', margin:'1rem'}}>Life Time Revenue Generate <span style={{color:'blue'}}>{999}</span></div>
        <div style={{backgroundColor:'#CBC3E3', borderRadius:"6px" , boxShadow:'2px black solid' , border:'2px black solid', padding:'5px', margin:'1rem'}}>Total Qty Sell <span style={{color:'blue'}}>{999}</span></div>
      </div>
      <div style={{display:'flex' , flexDirection:'row', maxWidth:'55rem', margin:'2rem'}}>
        <ChartMonth/>
        <ChartMonth/>
      </div>
      <div style={{display:'flex' , flexDirection:'row', maxWidth:'50rem'}}>
      <div style={{backgroundColor:'#CBC3E3', borderRadius:"6px" , boxShadow:'2px black solid' , border:'2px black solid', padding:'5px', margin:'1rem'}}>Today Views <span style={{color:'blue'}}>{999}</span></div>
        <div style={{backgroundColor:'#CBC3E3', borderRadius:"6px" , boxShadow:'2px black solid' , border:'2px black solid', padding:'5px', margin:'1rem'}}>Today Qty sell <span style={{color:'blue'}}>{999}</span></div>
        <div style={{backgroundColor:'#CBC3E3', borderRadius:"6px" , boxShadow:'2px black solid' , border:'2px black solid', padding:'5px', margin:'1rem'}}>Today Revenue <span style={{color:'blue'}}>{999}</span></div>
      </div>
      <div style={{display:'flex' , flexDirection:'row', maxWidth:'50rem'}}>
      <div style={{backgroundColor:'#CBC3E3', borderRadius:"6px" , boxShadow:'2px black solid' , border:'2px black solid', padding:'5px', margin:'1rem'}}>Total Suscribers <span style={{color:'blue'}}>{999}</span></div>
        <div style={{backgroundColor:'#CBC3E3', borderRadius:"6px" , boxShadow:'2px black solid' , border:'2px black solid', padding:'5px', margin:'1rem'}}>Total Suscribed Revenue <span style={{color:'blue'}}>{999}</span></div>
        <div style={{backgroundColor:'#CBC3E3', borderRadius:"6px" , boxShadow:'2px black solid' , border:'2px black solid', padding:'5px', margin:'1rem'}}>Today gain<span style={{color:'blue'}}>{999}</span></div>
        <div style={{backgroundColor:'#CBC3E3', borderRadius:"6px" , boxShadow:'2px black solid' , border:'2px black solid', padding:'5px', margin:'1rem'}}>Today Loss <span style={{color:'blue'}}>{999}</span></div>
        <div style={{backgroundColor:'#CBC3E3', borderRadius:"6px" , boxShadow:'2px black solid' , border:'2px black solid', padding:'5px', margin:'1rem'}}>Today Qty sell <span style={{color:'blue'}}>{999}</span></div>
      </div>
          <div style={{display:'flex' , flexDirection:'row', maxWidth:'50rem'}}>
            <ChartMonth/>
            <ChartMonth/>
          </div>
    </div>
  </div>
  
)
}
// {{overflow :"hidden" ,overflowY:"scroll", maxWidth:'100%', position:"relative", top:'-29rem', maxHeight:'70rem', backgroundColor:'white', border:"3px grey solid", borderTopLeftRadius:"8px", margin:'2rem', borderTopRightRadius:"6px"}}
