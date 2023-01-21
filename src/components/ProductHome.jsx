import React, { Fragment,useState } from "react";
import { Modal, ModalHeader, ModalBody, Container, Card, CardBody,
  CardSubtitle,  CardText } from "reactstrap";
import Counter from './Counter'; 
import styled from 'styled-components';
import VideoPlayer from 'react-simple-video-player';
import {BASE_URL} from './Url';



const Circle = styled.div`
  display:flex;
  height:220px;
  position:relative;
  flex-wrap:wrap;
`
const ProductImg = styled.img`
  height:200px;
  width:150px;
  borderRadius:6px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`

const Price= styled.div`
    font-family: 'Urbanist', sans-serif;
    color: black;
    font-weight: bold;
    font-size: 14px;
    margin-left: 2px;
`
const Qty = styled.div`
font-family: 'Urbanist', sans-serif;
color: black;
font-weight: bold;
font-size: 12px;
margin-left: auto;
`

const ProductContainer = styled.div`
  margin: 0px;
  justify-content:center;
  text-align:left;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  font-size: 20px;
  height:270px;
  cursor:pointer;

  &:hover{
    transform: scale(1.1);
    transition: all 0.5s ease;
  }
  @media screen and (max-width: 768px){
    height:150px;
    margin:1px;
    font-size:10px;

    ${Circle}{
      height:110px;
    }
    ${ProductImg}{
      height:90px;
      width:80px;
    }
    ${Price}{
        font-size: 10px;
    }
    ${Qty}{
        font-size: 8px;
    }
}

`
const Details = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
`


const ProductHome=(props) =>{
  const[modal, setModal]=useState(false)
  
    

  
  
  const toggle = () => {
      setModal(!modal)
    };
   
    
  const create = props.create;
  const product = props.product;
  
  const cardStyle={
      margin:"8px",
      justifyContent:'left',
      textAlign:'center'
  }

  if (create) {
        const button = (
          <div className='container-fluid'> 
            <ProductContainer onClick={toggle}>
                <Circle>
                <ProductImg src={`${BASE_URL}${product.image}`} alt="product"/>
                </Circle> 
                <div className='row product-text-hm'>
                <div className='col-12 pull-left '><CardText>{props.descriptionDisplay(product.description)}</CardText></div>
                </div>
                <Details>
                <Price>₦ {product.price}</Price>
                <Qty>{product.quantity} left</Qty>
                </Details>
                
            </ProductContainer>
          </div> )
      
  return (
        <Fragment>
          {button}
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Product Details</ModalHeader>
  
            <ModalBody>
              
              <Container>
              
                <Card style={cardStyle}>

                {product.videofile? (<div className="m-auto align-self-center">
                    <h6>how it works</h6>
                        <VideoPlayer 
                          
                          url={`${BASE_URL}${product.videofile}`} 
                          poster={`${BASE_URL}${product.image}`}
                          width={190}
                          height={190}
                          autoplay={false}/>
                    </div>) :  <img key={product.id} className="m-auto align-self-center imgStyle"  src={`${BASE_URL}${product.image}`} alt="product" />}  
                  
                        <CardBody>
                            <CardSubtitle>{product.description}</CardSubtitle>
                            <CardText>{product.category}</CardText>
                            <p>{product.detail}</p>
                            <Counter decrement={props.decrement} increment={props.increment} count={props.count} quantity={product.quantity} />
                            <button className="add-cart" onClick={()=>{props.HandleButtonClick(product,toggle)}}>Add to cart</button>
                        </CardBody>
                </Card>
              </Container>
            </ModalBody>
          </Modal>
        </Fragment>
      );
    }
  }
  
  export default ProductHome;