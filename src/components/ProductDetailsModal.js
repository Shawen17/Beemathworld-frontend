import React, { Fragment,useState } from "react";
import { Modal, ModalHeader, ModalBody, Container, Card, CardBody,
  CardSubtitle,  CardText } from "reactstrap";
import Counter from './Counter'; 
import styled from 'styled-components';
import VideoPlayer from 'react-simple-video-player';



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

const ProductContainer = styled.div`
  margin: 5px;
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
    height:220px;
    margin:3px;
    font-size:15px;

    ${Circle}{
      height:170px;
    }
    ${ProductImg}{
      height:150px;
      width:130px;
    }
}

`

const Details = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
`



const ProductDetailsModal=(props) =>{
  const[modal, setModal]=useState(false)
  
    

  const BASE_URL="http://127.0.0.1:8000"
  
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
          <ProductContainer onClick={toggle}>
            <Circle>
              <ProductImg src={`${BASE_URL}${product.image}`} alt="product"/>
            </Circle> 
            <div className='row product-text'>
              <div className='col-12 pull-left'><CardText>{props.descriptionDisplay(product.description)}</CardText></div>
            </div>
            <Details>
              <div className='product-text'>₦ {product.price}</div>
              <div style={{marginLeft:'auto'}}>{product.quantity} left</div>
            </Details>
            
          </ProductContainer>)
      
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
  
  export default ProductDetailsModal;