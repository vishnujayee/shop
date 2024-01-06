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
    setphoto(prev => ([...prev , e.target.files[0]]))
    console.log(photos);
  }
  const handlesumbit = async(e) =>{
    e.preventDefault();
    const data = await addproduct({name:product.name , description:product.description , price:product.price , category:product.category}).unwrap();
    console.log(data);
  }
  return (
    <div className='container'>
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
          <CFormInput type="file" size="lg" id="formFileLg" label="ADD PRODUCT IMAGES" className='inpt'   onChange={changephoto}/>
        </CRow>
        <Divider />
        {/* {photos.length !==0 && photos.map((photo)=>{
          return(
            <CRow xs={{gutter:'10'}}>
              <img alt={photo.name} src={require( photo.name)} style={{width:'20px' ,margin:'2px 2px', backgroundSize:"cover"}}/>
            </CRow>
          )
        })} */}
        <Divider/>
        <CButton style={{ margin: '4px 3px', padding: '5px' }} size='lg' type ="submit">Sumbit</CButton>
      </CForm>
    </div>
  )
}