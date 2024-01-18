import React, { useState } from 'react'
import { CCol, CRow, CFormInput, CForm, CFormTextarea, CButton } from '@coreui/react'
import { Divider } from '@mui/material'
import { useAddproductMutation } from '../services/appapi'
import './product.css'
export default function Product() {
  const [addproduct ,{isError ,error}] = useAddproductMutation();
  const[product, changep] = useState({
    name:"",
    category:"",
    price:"",
    brandname:"",
    description:""
  })
  const [photos ,setphoto] = useState([]);
  const productchange = (e)=>{
    changep(prev => ({...prev , [e.target.name]:e.target.value}));
    console.log(product);
  }
  const changephoto = (e) =>{
    console.log(e.target.files[0])
    if(e.target.files[0]) {
      setphoto((p)=>[...p,URL.createObjectURL(e.target.files[0])]);
    }
  }
  const delimage = (e) =>{
    const id = e.target.dataset.id;
    setphoto((p)=>{
      return p.filter((p)=>p !== id);
    })
  }
  const handlesumbit = async(e) =>{
    e.preventDefault();
    const data = await addproduct({name:product.name , description:product.description , price:product.price , category:product.category}).unwrap();
    console.log(data);
  }
  return (
    <div className='container'>
    <div>div data on error sumbit</div>
      <CForm style={{ margin: '2px 5px' }} onSubmit={handlesumbit}>
        <CRow xs={{ gutter: 4 }}>
          <CCol md>
            <CFormInput
              type="text"
              id="floatingInputGrid"
              floatingLabel="productname"
              className='inpt'
              onChange={productchange}
              value={product.name}
              name='name'
              required
            />
          </CCol>
          <CCol md>
            <CFormInput
              type="text"
              id="floatingInputGrid"
              floatingLabel="product category"
              name='category'
              onChange={productchange}
              value={product.category}
              className='inpt'
              required
            />
          </CCol>
          <CCol>
            <CFormInput type="text"
              id="floatingInputGrid"
              floatingLabel="BRAND NAME"
              name='brandname'
              onChange={productchange}
              value={product.brandname}
              className='inpt'
              required
            />
          </CCol>
          <CCol md>
            <CFormInput
              type="number"
              id="floatingInputGrid"
              floatingLabel="price"
              name='price'
              onChange={productchange}
              value={product.price}
              className='inpt'
              required
            /></CCol>
        </CRow>
        <Divider style={{ backgroundColor: 'gray', margin: '12px 0' }} />
        <CRow xs={{ gutter: 2 }}>
          <CCol>
            <CFormTextarea
              id="description"
              label="ADD DETAIL ABOUT YOUR PRODUCT"
              rows={3}
              text="needed"
              name='description'
              onChange={productchange}
              value={product.description}
              className='inpt'
              required

            ></CFormTextarea>
          </CCol>
        </CRow>
        <Divider style={{ backgroundColor: 'gray', margin: '12px 0' }} />
        <CRow xs={{ gutter: 1 }}>
          <CFormInput type="file" size="lg" id="formFileLg" label="ADD PRODUCT IMAGES" className='input'   onChange={changephoto}/>
        </CRow> 
        <Divider />
        <p>choose multiple images</p>
      {photos.length >4 &&<p style={{color:'red', fontSize:'18px' ,fontWeight:'bold'}}>You can choose only 4 photos of your product</p>}
      {photos.length>0  && <div style={{margin:'3px',borderBottom:'3px' , display:'flex'}}>
        {photos.map((img)=>{
          return (<div style={{border:'3px',borderRadius:'3px',borderColor:'grey'}}><img alt='new_product' src={img} className='inputimage' onClick={delimage} style={{backgroundSize:'cover'}} data-id={img}/></div>)
        })}
      </div>}
        <Divider/>
        <CButton style={{ margin: '4px 3px', padding: '5px' }} size='lg' type ="submit">Sumbit</CButton>
      </CForm>
    </div>
  )
}