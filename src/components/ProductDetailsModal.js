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
import { Variant } from "./Variant";
import { getVariants, productTotal } from "./utility/Utility";
import { useNavigate } from "react-router-dom";
import { addMultiToCart } from "../actions/auth";
import { connect } from "react-redux";

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
  const navigate = useNavigate();
  const token = localStorage.getItem("access");
  const email = localStorage.getItem("email");
  const [count, setCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [pickedProducts, setPickedProducts] = useState({});
  const [modal, setModal] = useState(false);
  const [testPosition, setTestPosition] = useState({
    top: 0,
    left: 0,
    display: "none",
  });

  const handleGrow = (event) => {
    const x = event.clientX;
    const y = event.pageY - 100;

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
  const allProducts = props.allProducts;

  const multiIncrement = (num, item) => {
    setCount(num + 1);
    if (num + 1 > 0) {
      const product = { ...item, quantity: num + 1 };
      setPickedProducts(product);
      updateCart(product);
    }
  };

  const multiDecrement = (num, item) => {
    setCount(num - 1);
    if (num > 0) {
      const product = { ...item, quantity: num - 1 };
      setPickedProducts(product);
      updateCart(product);
    }
  };

  const updateCart = (cart) => {
    if (cartItems.length > 0) {
      const index = cartItems.findIndex((ele) => {
        if (ele.id === cart.id) {
          return true;
        }
        return false;
      });
      if (index !== -1) {
        const items = [...cartItems];
        items[index] = cart;
        setCartItems(items);
      } else {
        const items = [...cartItems];
        items.push(cart);
        setCartItems(items);
      }
    } else {
      cartItems.push(cart);
      setCartItems(cartItems);
    }
  };

  const addMultiProduct = async (products, toggle) => {
    const finalProduct = products.filter((product) => {
      return product.quantity !== 0;
    });
    if (token != null) {
      if (finalProduct.length > 0) {
        await props.addMultiToCart(email, finalProduct);
        alert(
          `${finalProduct.length} ${finalProduct[0].description}(s) added to cart`
        );
        setCount(0);
        setCartItems([]);
        setPickedProducts({});
        toggle();
      }
    } else {
      navigate("/login");
    }
  };

  const productQuantity = productTotal(allProducts, product.description);

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
                ₦{product.price.toLocaleString()}
              </div>
              <div>{productQuantity} left</div>
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
                  {product.variant ? (
                    <div>
                      <h3>Variants</h3>
                      {getVariants(allProducts, product.description).map(
                        (item, index) => (
                          <div key={index}>
                            <Variant
                              key={index}
                              cartItems={cartItems}
                              pickedProducts={pickedProducts}
                              multiIncrement={multiIncrement}
                              multiDecrement={multiDecrement}
                              count={count}
                              item={item}
                              quantity={item.quantity}
                            />
                          </div>
                        )
                      )}
                      <button
                        className="add-cart"
                        onClick={() => {
                          addMultiProduct(cartItems, toggle);
                        }}
                      >
                        Add to cart
                      </button>
                    </div>
                  ) : (
                    <div>
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
                    </div>
                  )}
                </CardBody>
              </Card>
            </Container>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
};

export default connect(null, { addMultiToCart })(ProductDetailsModal);
