import React, { useState } from 'react'
import { CCol, CRow, CFormInput, CForm, CFormTextarea, CButton } from '@coreui/react'
import { Divider } from '@mui/material'
import { useAddproductMutation } from '../services/appapi'
import './product.css'
export default function Product() {
  const [addproduct, { isError, error }] = useAddproductMutation();
  const [name, setname] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [brandname, setbrandname] = useState("");
  const [description, setdescription] = useState("");
  const [datafal, setdatlfal] = useState(false);
  const [photos, setphoto] = useState([]);
  const [sendphoto, setsendphoto] = useState([]);
  const productchange = (e) => {
    switch (e.target.name) {
      case 'name':
        setname(e.target.value);
        break;
      case 'category':
        setcategory(e.target.value);
        break;
      case 'price':
        setprice(e.target.value);
        break;
      case "description":
        setdescription(e.target.value);
        break;
      case "brandname":
        setbrandname(e.target.value);
        break;
      default:
        break;
    }
    console.log(e.target.name, e.target.value);
  }
  const changephoto = (e) => {
  if (e.target.files[0]) {
    setsendphoto((prev) => [...prev, e.target.files[0]]);
    setphoto((p) => [...p, URL.createObjectURL(e.target.files[0])]);
  }
}
const delimage = (e) => {
  const id = e.target.dataset.id;
  setphoto((p) => {
    return p.filter((p) => p !== id);
  })
  setsendphoto((p) => {
    return p.filter((p) => p !== id);
  })
}
const handlesumbit = async (e) => {
  e.preventDefault();
  if (name.split(" ").length === 0 || !name || !price || price.split(" ").length === 0 || description.split(" ").length === 0 || !description || description.split(" ").length === 0) {
    console.log("please add proper detail and photo must atleast conatain one image ");
    setdatlfal(true);
    return;
  }
  if (photos.length === 0) {
    setdatlfal(true);
    return;
  }
  setdatlfal(false);
  try {

    console.log(sendphoto[0]);
    const data = await addproduct({ name: name, description: description, price: price, category: category, brandname: brandname, images:sendphoto[0]}).unwrap();
    console.log(data);
  } catch (error) {
    console.log("erroir");
  }

}
return (
  <div className='container'>
    {/* <div>div data on error sumbit</div> */}
    {datafal && <div style={{ color: 'red', fontSize: '0.7rem' }}>please add all data and img atleast one</div>}
    <CForm style={{ margin: '2px 5px' }} onSubmit={handlesumbit} encType="multipart/form-data">
      <CRow xs={{ gutter: 4 }}>
        <CCol md>
          <CFormInput
            type="text"
            id="floatingInputGrid"
            floatingLabel="productname"
            className='inpt'
            onChange={productchange}
            value={name}
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
            value={category}
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
            value={brandname}
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
            value={price}
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
            value={description}
            className='inpt'
            required

          ></CFormTextarea>
        </CCol>
      </CRow>
      <Divider style={{ backgroundColor: 'gray', margin: '12px 0' }} />
      <CRow xs={{ gutter: 1 }}>
        <CFormInput type="file" size="lg" id="formFileLg" label="ADD PRODUCT IMAGES" className='input' onChange={changephoto} />
      </CRow>
      <Divider />
      <p>choose multiple images</p>
      {photos.length > 4 && <p style={{ color: 'red', fontSize: '18px', fontWeight: 'bold' }}>You can choose only 4 photos of your product</p>}
      {photos.length > 0 && <div style={{ margin: '3px', borderBottom: '3px', display: 'flex' }}>
        {photos.map((img) => {
          return (<div style={{ border: '3px', borderRadius: '3px', borderColor: 'grey' }}><img alt='new_product' src={img} className='inputimage' onClick={delimage} style={{ backgroundSize: 'cover' }} data-id={img} /></div>)
        })}
      </div>}
      <Divider />
      <CButton style={{ margin: '4px 3px', padding: '5px' }} size='lg' type="submit">Sumbit</CButton>
    </CForm>
  </div>
)
}