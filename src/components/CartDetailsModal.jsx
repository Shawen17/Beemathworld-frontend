import React, { Fragment, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import {useNavigate} from 'react-router-dom';
import {ShoppingCartOutlined} from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import styled from 'styled-components';
require('dotenv').config()



const Image = styled.div`
display:flex;
flex:1;
height:100%;
align-items:flex-end;
justify-content:center;

`
const Info = styled.div`
display:flex;
flex:1;
flex-direction:column;
justify-content:center;
align-items:flex-start;`

const Qty = styled.div`
display:flex;
font-size:10px
align-items:center;
justify-content:center`

const Quantity = styled.p`
flex:1
align-items:center;
justify-content:center;
`

const Cost = styled.p`
flex:1;
align-items:center;
justify-content:center`

const ItemContainer = styled.div`
display:flex;
justify-content:center;
margin-bottom:6px`

const Desc = styled.h3`
font-size:17px;
font-weight:bold;`

const Img= styled.img`
display:flex;
height:100px;
width:100px;
align-items:center;
justify-content:flex-end;`


const Container = styled.div`

direction: flex;
align-items:center;
justify-content:center;
flex-direction:column;
@media screen and (max-width: 600px){

  ${Desc}{
    font-size:15px;
    font-weight:500px;
  }
  ${Quantity}{
    font-size:12px
  }
  ${Cost}{
    font-size:12px
  }

}
`
const HorizontalLine = styled.div`

    border-bottom:1px solid #ccc;
    width:100%;
    margin:10px;
`


const CartDetailsModal =(props) => {
    const [toggle,setToggle]= useState({modal:false})
    
    
    const BASE_URL="http://127.0.0.1:8000"
    
    const toggleModal=()=> {
      setToggle({
        modal: !toggle.modal
      });
    }
    
    
    const navigate= useNavigate();

    const submitCartItems=()=>{
        var items=[]
        for (let i=0;i<props.products.length;i++){
          items.push(`${props.products[i].product_description} ${props.products[i].quantity}`)
        
        }
        items = items.join(', ')
        sessionStorage.setItem('products', items)
        
        setToggle({ modal: !toggle.modal});
        
        navigate('/checkout')
       }

      const create = props.create;
      
      const hasnoSelectedItem = props.count === 0
      
        
      var button = <Button onClick={toggleModal}>Edit</Button>;
      if (create) {
        button = (
            
            <div
              onClick={toggleModal}
            >
              <Badge badgeContent={props.count} color='primary' overlap="rectangular"><ShoppingCartOutlined /> </Badge>
            </div>
        );
      }
      
      
      return (
        <Fragment>
          {button}
          <Modal isOpen={toggle.modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Cart Items <span>{props.count}</span></ModalHeader>
  
            <ModalBody>
            {hasnoSelectedItem ? (<b>Nothing in your cart yet, so start picking</b>):(
            <div>
              {props.products.map((product)=>{
                  return(
              <Container key={product.id} >
                <ItemContainer>
                    <Image>
                      <Img src={`${BASE_URL}${product.product_image}`} alt="product" />
                    </Image>
                    <Info>
                        <Desc>{product.product_description}</Desc>
                        <Qty>
                            <Quantity>quantity: {product.quantity} <b>|</b>  </Quantity>
                            <Cost>amount: ₦{product.cost}</Cost>
                        </Qty>
                        <button className='add-cart' onClick={()=>props.onDeleteItem(product)}>Remove</button>
        
                    </Info>
                    
                    
                </ItemContainer>
                <HorizontalLine />
              </Container>)})}
              
            </div>)}
            {props.products.length>0 && <div className="counter mt-3" style={{display:'flex'}} ><button  onClick={submitCartItems} className='add-cart' >Checkout</button></div>}
              
            </ModalBody>
          </Modal>
        </Fragment>
      )
            }
            
    
    
    
  
  
  export default CartDetailsModal;