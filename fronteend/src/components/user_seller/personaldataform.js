import React, { Fragment } from 'react'
import { CCol,CRow,CFormInput,CFormCheck} from '@coreui/react'
export default function dataform() {
    return (
        // <div style={{backgroundColor:'whitesmoke' , width:'100%' }}>
        <Fragment>
        <span>PERSONAL INFORMATION <span style={{color:'blue'}}>Edit</span></span>
        <div style={{margin:'22px 0'}}>
            <CRow xs={{gutter:2}} >
                <CCol>
                    <CFormInput type='text' defaultValue={"myname"} disabled/>
                </CCol>
                <CCol>
                    <CFormInput type='text' defaultValue={"Last NAME"} disabled/>
                </CCol>
            </CRow>
            </div>
            <div>
            <span>YOUR GENDER</span>
            <CRow xs={{gutter:2}}>
            <CCol><CFormCheck inline id="inlineCheckbox1" value="option1" label="male" defaultChecked disabled/></CCol>
            <CCol><CFormCheck inline id="inlineCheckbox2" value="option2" label="female" disabled/></CCol>
            </CRow>
            </div>
            <div>
            <CRow xs={{gutter:1}}>
            <CCol><CFormInput inline id="inlineCheckbox1" value="myemail" label="email"  disabled/></CCol>
            </CRow>
            </div>
            <div>
            <CRow xs={{gutter:1}}>
            <CCol><CFormInput inline id="inlineCheckbox1" value="7006786019" label="phonenumber"  disabled/></CCol>
            </CRow>
            </div>
            </Fragment>
        // </div>
    )
}
