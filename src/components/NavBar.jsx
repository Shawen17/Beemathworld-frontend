import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {Search,Menu} from '@material-ui/icons';
import CartDetailsModal from './CartDetailsModal';
import {logout, fetchCart} from '../actions/auth';
import axios from "axios";
import Products from '../containers/Products';
import NavMenu from './NavMenu';
import Anouncement from './Anouncement';
require('dotenv').config()

const Container = styled.div`
      height:60px;
      background-color: whitesmoke;
      font-family: 'Urbanist', sans-serif;
      font-weight: bold;
      width:100vw;
      padding:0px 15px;
    `

const Wrapper = styled.div`
      padding:5px 20px;
      display: flex;
      justify-content: center;
      align-items:center
      position:relative;
`
export const SearchContainer = styled.div`
    margin-bottom:3px;
    border: 0.5px solid #18A558;
    border-radius:6px;
    align-items:center;
    justify-content:center;
    display:flex;
    height:40px;
    width:60%;

    @media screen and (max-width: 600px){
      width:100%}
`
const Input = styled.input`
      type: text;
      border:none;
      width:95%;
      border-style:none;
      &:focus {
        outline:none;
        border-color:none;
        border:none
      }
`
const Brand = styled.h1`
  color: #18A558;
  font-weight:bold;
`
const CartItem = styled.div`
    font-size:14px;
    cursor:pointer;
    align-items:center;
    justify-content:center;
    
`

const NavBar =(props)=> {
  const [show, setShow] = useState(false)
  const [toggle,setToggle]= useState(false)
  const cart= props.cartAdded
  const [del,setDel] = useState(false)
  const [searchValue,setSearchValue] = useState([])
  const [cartAdded,setCartAdded] = useState(props.cartAdded)
  const token = localStorage.getItem('access')
  const email = localStorage.getItem('email')

  const toggleModal=()=> {
    setToggle(
      !toggle
    );
  }


  const HandleInputChange = (event) =>{
    setSearchValue(event.target.value)
  }

  const deleteCartItem = async (product)=>{
    const body = JSON.stringify({product_id:product.id,email:email})
    const config ={
        headers:{
            'Content-Type':'application/json',
            'Authorization':`JWT ${token}`,
            'Accept':'application/json'
        }
    };
    axios.put(process.env.REACT_APP_REMOVE_CART_ITEM, body, config);
    setDel(!del)
}


  useEffect(()=>{
    
    props.fetchCart(email);
  },[cart,del])

  const onLogout = ()=>{
    props.logout()
    setCartAdded(!cartAdded)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    }, [show]);
    
    const handleScroll = () => {
    setShow(window.pageYOffset > 160);
    };
 

  return (
    <div>
      <div  style={{marginBottom:60,position:'fixed',zIndex:9,top:0,right:0,left:0}}>
        <Anouncement />  
        <Container>
          <Wrapper>
            <Link className='mr-auto nav-link'  to='/'>
              <Brand>Beemathworld</Brand></Link>
              
              <div className='navigation-menu' >
                  <SearchContainer>
                      <Input placeholder="search category, product.." value={searchValue}  onChange={HandleInputChange} /> 
                      <Search style={{ fontSize:16,color:'gray'}} />
                  </SearchContainer>
                  <NavMenu onLogout={onLogout}/>
              </div>

              <div className='hamburger' onClick={toggleModal}>
                <Menu  />
              </div>
              <CartItem>
                <CartDetailsModal
                onDeleteItem={deleteCartItem}
                create={true}
                count={props.cart.count.total}
                products={props.cart.products}
                resetState={props.resetState} />
              </CartItem>
          </Wrapper>
      </Container>
        {toggle ? (
          <div>
            <div className='menu-appear' >
              <SearchContainer className='search-con'>
                <Input placeholder="search category, Product.." value={searchValue}  onChange={HandleInputChange} /> 
                <Search style={{ fontSize:16,color:'gray'}} />
              </SearchContainer>
              <NavMenu  onLogout={onLogout}/>
            </div>
          </div>) : ''}
      
        
    </div> 
    {searchValue.length>2 ? <Products searchValue={searchValue} /> :''}
  </div>  
    )}
  
const mapStateToProps = state =>({
  isAuthenticated:state.auth.isAuthenticated,
  cart:state.auth.cart,
  cartAdded:state.auth.cartAdded
})

export default connect(mapStateToProps,{logout,fetchCart})(NavBar);













