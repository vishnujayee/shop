import React, {useState } from 'react'
import  {Button} from 'react-bootstrap'
import Cartutem from '../../../src/components/cart/Cartutem'
import '../User/userstyles/cart.css'
import SaveLater from '../../components/cart/SaveLater'
export default function Cart() {
    const [color,setcolor] = useState(1);
    let opt1 = "#FFFF"
    let opt2 = "whitesmoke"
    function changecolor(){
        setcolor(2);
    }
    function originalcolor(){
        setcolor(1);
    }
    return (
        <div className='cart-main'>
            <div className='content'>
                <div className='car-items'>
                    <div className='address'>
                        <div>Deliver TO :<span> name, Pincode</span> <div>ADDRESS</div></div>
                        <div><Button style={{backgroundColor:color === 1 ? opt1 : opt2, color:'blue' , padding:'4px',borderRadius:'2px' ,margin:'3px 0'}} onMouseMove={changecolor} onMouseLeave={originalcolor}>Change</Button></div>
                    </div>
                    <Cartutem  isorder={true}/>
                </div>
                <div className='Save_later'>
                    <div>Save For Later (Total items)</div>
                    <div className='save-items'>
                        <SaveLater/>
                    </div>
                </div>
            </div>
            <div className='price'>
                <div>
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
        </div>
    )
}
