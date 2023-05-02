import React, { Fragment, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Container,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
} from "reactstrap";
import Counter from "./Counter";
import styled from "styled-components";
import VideoPlayer from "react-simple-video-player";
import { BASE_URL } from "./Url";

const Circle = styled.div`
  background-color: rgba(128, 128, 128, 0.1);
  height: 100px;
  width: 100%;
  position: relative;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImg = styled.img`
  height: 100px;
  width: 70%;
  position: absolute;
  bottom: 0;
`;

const ProductContainer = styled.div`
  height: 240px;
  width: 150px;
  font-size: 13px;
  cursor: pointer;
  margin-bottom: 15px;

  &:hover {
    transform: scale(1.1);
    transition: all 0.5s ease;
  }
`;
const Details = styled.div`
  height: 120px;
  width: 100%;
`;

const ProductDetails = styled.p`
  color: #18a558;
`;

const Circ = styled.div`
  position: absolute;
  border-radius: 50%;
  border: 0.5px solid grey;
`;

const SmallCircle = styled(Circ)`
  width: 20px;
  height: 20px;
  z-index: 20;
  top: ${(prop) => prop.testPosition?.top}px;
  left: ${(prop) => prop.testPosition?.left}px;
  display: ${(prop) => prop.testPosition?.display};
`;

const ProductDetailsModal = (props) => {
  const [modal, setModal] = useState(false);
  const [testPosition, setTestPosition] = useState({
    top: 0,
    left: 0,
    display: "none",
  });

  const handleGrow = (event) => {
    const x = event.clientX;
    const y = event.pageY - 200;
    // const y = event.clientY-100;
    setTestPosition({ ...testPosition, top: y, left: x, display: "block" });
    setTimeout(
      () => setTestPosition({ ...testPosition, display: "none" }),
      1100
    );
  };

  const toggle = () => {
    setModal(!modal);
  };

  const HandleClick = () => {
    window.addEventListener("click", (event) => {
      handleGrow(event);
    });
    setTimeout(() => setModal(!modal), 1200);
    return () => window.removeEventListener("click", handleGrow);
  };

  const create = props.create;
  const product = props.product;

  const cardStyle = {
    margin: "8px",
    justifyContent: "left",
    textAlign: "center",
  };

  const subtitle = {
    fontSize: 18,
    fontWeight: "bold",
  };

  if (create) {
    var button = (
      <ProductContainer onClick={HandleClick}>
        <Circle>
          <ProductImg src={`${BASE_URL}${product.image}`} alt="product" />
        </Circle>
        <SmallCircle testPosition={testPosition} className="grow" />

        <Details>
          <div className="desc">
            <p>{product.category}</p>
            <div>{props.descriptionDisplay(product.description)}</div>
            <div className="amt">
              <div style={{ color: "green", fontSize: 15 }}>
                ₦{product.price}
              </div>
              <div>{product.quantity} left</div>
            </div>
          </div>
        </Details>
      </ProductContainer>
    );

    return (
      <Fragment>
        {button}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Product Details</ModalHeader>

          <ModalBody>
            <Container>
              <Card style={cardStyle}>
                {product.videofile ? (
                  <div className="m-auto align-self-center">
                    <h6>how it works</h6>
                    <VideoPlayer
                      url={`${BASE_URL}${product.videofile}`}
                      poster={`${BASE_URL}${product.image}`}
                      width={210}
                      height={210}
                      autoplay={false}
                    />
                  </div>
                ) : (
                  <img
                    key={product.id}
                    className="m-auto align-self-center imgStyle"
                    src={`${BASE_URL}${product.image}`}
                    alt="product"
                  />
                )}

                <CardBody>
                  <CardSubtitle style={subtitle}>
                    {product.description}
                  </CardSubtitle>
                  <CardText>{product.category}</CardText>
                  <ProductDetails>{product.detail}</ProductDetails>
                  <Counter
                    decrement={props.decrement}
                    increment={props.increment}
                    count={props.count}
                    quantity={product.quantity}
                  />
                  <button
                    className="add-cart"
                    onClick={() => {
                      props.HandleButtonClick(product, toggle);
                    }}
                  >
                    Add to cart
                  </button>
                </CardBody>
              </Card>
            </Container>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
};

export default ProductDetailsModal;
