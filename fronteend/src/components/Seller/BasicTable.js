import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
export default function BasicTable({cols,rows, setpagedata, setpage}) {
  return (
    <div style={{maxWidth:'60rem',border:'2px black solid', margin:'2rem' , marginLeft:'4rem',maxHeight:'25rem' , overflow:'scroll'}}>
    <TableContainer>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
            onClick = {()=>{
              setpage(true);
              setpagedata(row.id);
              }}
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className='table'
              
              
            >
              <TableCell component="th" scope="row" >
              <img src={require("../../devmateral/ecomimage/2448261.jpg")} style={{width:'50px' , height:'50px'}} />
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {/* } */}
    </div>
  );
} 
