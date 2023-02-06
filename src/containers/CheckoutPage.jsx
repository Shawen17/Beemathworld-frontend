import React, {useState, useEffect } from 'react';
import {Form, Input, Table} from 'reactstrap';
import { PaystackButton } from 'react-paystack';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {checkout} from '../actions/auth';
import { connect } from 'react-redux';
import { Container,Title,FormDisplay } from './ContactUs';
import styled from 'styled-components';
import {BASE_URL} from '../components/Url';


const CheckInine = styled.div`
    display:flex;
    margin-top:5px;
    color:black;        
`
const Info=styled.div`
font-size:15px;

@media screen and (max-width: 600px){
    font-size:12px;
  }
`

require('dotenv').config()


const CheckoutPage=(props)=>{
    const [clicked,setClicked] = useState(false)
    const [checked,setChecked] = useState(false)
    const [inputs,setInputs] = useState({})
    const [locations,setLocations]=useState({
        items: {
            areas: [
                {id: 0, state: '', city: '', charge:0, door_delivery_charge:0}
                ],
            amount:0
            }
        })

    document.title = 'checkout'
    
    const user_state = localStorage.getItem('state')
    var total;
    
    let filteredLocations = locations.items.areas.filter((area)=>
           area.state === user_state 
        )

    
    
    const email = localStorage.getItem('email')
    const items = sessionStorage.getItem('products')

    console.log('email:',email,'items:',items)
    
    const productAmount=locations.items.amount.total
    const amount = parseInt(productAmount)
    
    

    if(checked){
        const userCity = filteredLocations.filter((city)=>
        city.charge===parseInt(inputs.select));

        var door_delivery = userCity[0].door_delivery_charge
        total = amount + parseInt(inputs.select) + door_delivery
    }else{
        total = amount + parseInt(inputs.select)
    }
     
    const navigate = useNavigate()


    const body = JSON.stringify({email:email})
    const config ={
            headers:{
                'Content-Type':'application/json',
                'Authorization':`JWT ${localStorage.getItem('access')}`,
                'Accept':'application/json'
            }
        }
    

    

    useEffect(()=>{
        
        axios.put(`${BASE_URL}/api/checkout/`, body, config).then(res => 
           setLocations({items:res.data})
        );
        return ()=>{
            axios.put(`${BASE_URL}/api/checkout/`, body, config).then(res => 
                setLocations({items:res.data})
           )
    }},[])
    
    const handleChecked = (e) =>{
        setChecked(e.target.checked) 
    }
   
    

    const handleChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    
    

    const HandleSubmit =async (event) =>{
        event.preventDefault()
        setClicked(true)
    }
    
    const componentProps = {
            email:email,
            amount:total * 100,
            publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
            text: "Pay Now",
            onSuccess: () =>{
                
                const body = JSON.stringify({ordered_by: email,
                       delivery_address:inputs.address,
                    contact_number: inputs.phone,
                    amount:total,
                    item:items
                     })
                
                const config ={
                    headers:{
                            'Content-Type':'application/json',
                            'Authorization':`JWT ${localStorage.getItem('access')}`,
                            'Accept':'application/json'
                            }
                        };
                axios.post(`${BASE_URL}/api/initiate-payment/`, body, config);
                props.checkout()
                
                alert("Thanks for doing business with us! Come back soon!!")

                navigate('/products')
            },
              
            onClose: () => alert("Wait! You need these awesome items, don't go!!!!"),
          }
    
    const formDisplay={
        width:'100%',
    }

    const checkboxDisplay={
        verticalAlign: 'middle',
        position: 'relative',
        bottom: '1px',
        marginRight:'3px',
    }
    
    const logistics = inputs.select

    const deliveryDetailView = (
        <div>
            <Title> Provide delivery details </Title>
            <Input className='mt-3' placeholder='Phone number' name='phone' type="number" value={ inputs.phone || ""} onChange={handleChange} required/>
            <Input  className='mt-3' type="select" name="select" id="exampleSelect" value={inputs.select || ""} onChange={handleChange} required>
                        <option value=''>select city</option>
                        {filteredLocations.map(location => (
                            <option key={location.id} value={location.charge}>{location.city}</option>
                        ))}
                        
            </Input>
            <Input className='mt-3'  placeholder='Full Address..' name='address' type="textarea" value={inputs.address || ""} onChange={handleChange} required/>
            {user_state!== 'lagos' ? 
            
            <CheckInine >
                <Input type='checkbox' style={checkboxDisplay}  name='check' value={ inputs.check || false} onChange={handleChecked} />
                 <Info>door-delivery(attracts additional charges)</Info>
            </CheckInine>
             : ''}
            <button className='checkout-button'  type='submit'>proceed to checkout</button>
            
        </div>
    )

    const makePaymentView= (
        <div>
            <p>Order breakdown</p>
            <Table borderless  style={{borderRadius:'6px',backgroundColor:'#D9DDDC'}}>
                <tbody>
                    <tr>
                        <td>Logistics :</td>
                        <td>₦{logistics}</td>
                    </tr>
                    <tr>
                        <td>Amount :</td>
                        <td>₦{amount}</td>
                    </tr>
                    {checked ? 
                    <tr>
                        <td>Door delivery :</td>
                        <td>₦{door_delivery}</td>
                    </tr>: ''}
                    
                    <tr style={{fontWeight:'bold'}}>
                        <td>Total :</td>
                        <td>₦{total}</td>
                    </tr>
                </tbody>
            </Table>

            <div className='mt-8'>
                <PaystackButton className='paystack-button' {...componentProps} />
            </div>
        </div>
        
        
    );

    return(
        <Container>
            <FormDisplay>
                <Form  style={formDisplay}  onSubmit={HandleSubmit}>
                    {clicked ? makePaymentView : deliveryDetailView}
                </Form>
            </FormDisplay>
        </Container>
    )
}



export default connect(null,{checkout})(CheckoutPage);