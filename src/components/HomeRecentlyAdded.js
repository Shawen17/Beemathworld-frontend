import React, {useEffect,useState,useMemo } from "react";
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import ProductCat from "./ProductCat";
import { useNavigate } from 'react-router-dom';
import {logout,addToCart} from '../actions/auth';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import VideoPlayer from 'react-simple-video-player';
import {descriptionDisplay} from '../containers/Products';
import styled from 'styled-components';
import ProductHome from './ProductHome';
import {BASE_URL} from './Url';


require('dotenv').config()



const CategoryContainer = styled.div`
    display:flex;
    flex-direction:column;
    margin:30px 15px 15px 15px;
    align-items:flex-start;
    justify-content:center;
`

const CategoryTitle = styled.h6`
    color: rgba(0,128,128,0.8);   
    font-weight:500;
    justify-content:flex-start;
    cursor:pointer;

    &:hover{
        text-decoration-line: underline;
        text-decoration-color: #18A558;
        text-decoration-thickness: 2px;
        transition: all 0.5s ease-in-out;
       }
`
const ImgSubCon = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between; 
    flex-wrap:wrap;
`
const Img = styled.div`
    display:flex;
    flex:18%;
`
const TopCon = styled.div`
    border-radius:6px;
    border:1px;
    display:flex;
    flex-wrap:wrap;
    margin-top:4px;
`

const TopImg = styled.div`
    display:flex;
    flex:15%;

    @media screen and (max-width: 768px){
        flex:30%}

`



const HomeRecentlyAdded =(props)=> {
    
    const [count,setCount] = useState(0)
    const [products,setProducts] = useState({
        items: {
            recent:[    
                {id: 0, poster: '', videofile: ''}
                ],
            top: [
                {id: 0, description: '', image: '', category:'',price:0,quantity:0 }
                ],
            sales: [
                {id: 0, description: '', image: '', category:'',price:0,quantity:0 }
                ],
            all: [
                {id: 0, description: '', image: '', category:'',price:0,quantity:0 }
            ],
            }

    })
    const email = localStorage.getItem('email')
    const token = localStorage.getItem('access')
    
    const navigate= useNavigate()

    


    useEffect(()=>{
        const config ={
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        };
        axios.get('https://shawen.pythonanywhere.com/api/recent/addition/', config).then(res => setProducts({items:res.data}))

    },[])

    const increment=(num)=>{
        setCount(num+1)
            
        }
    
    const decrement=(num)=>{
        if(num>0){
            setCount(num-1)
        }
        
      }


    const HandleButtonClick= async (product,toggle)=>{
        if(token!=null){
            if(count>0){
                props.addToCart(email,product,count)
                alert(`${count} ${product.description} added to cart`)
                setCount(0)
                toggle()
            }
            
        } else {
        navigate('/login')
        }
    }

    
    const recentProducts = useMemo(() => {
        return products.items.recent.slice(0,11);
      }, [products]); 

    const topSelling = useMemo(()=>{
        return products.items.top
    },[products])

    const flashSale = useMemo(()=>{
        return products.items.sales.slice(0,6)
    },[products])

    const Kitchen = useMemo(()=>{
        const filtered = products.items.all.filter(function(product){
            return product.category.includes('kitchen')
        })
        return filtered
    },[products])

    const Bathroom = useMemo(()=>{
        const filtered = products.items.all.filter(function(product){
            return product.category.includes('bathroom')
        })
        return filtered
    },[products])
    

    const Electronics = useMemo(()=>{
        const filtered = products.items.all.filter(function(product){
            return product.category.includes('electronics')
        })
        return filtered
    },[products])

    const Household = useMemo(()=>{
        const filtered = products.items.all.filter(function(product){
            return product.category.includes('household-accessories')
        })
        return filtered
    },[products])

    
    

    const flashSaleHeader=()=>(
        <div id="fsh-sale">
            <h4 className="flash">Flash Sales <span style={{marginLeft: 'auto'}}><Link className="nav-link" to="/flash-sales">view all</Link></span></h4>
        </div>
    )

    
    return (
        <div className='mt-3' >
            
            
                <CategoryTitle>Newly Added</CategoryTitle>
                <div className='scroll-container' >
                    {!products.items.recent || products.items.recent.length<=0 ? (<div width='50%' height='80%' className="text-center"><img src='/loading.gif' alt='loading..' /></div>):
                        (recentProducts.map(product=> (
                    <div className='gridscroll' key={product.id}>
                        <div style={{margin:'4px',width:170}}>
                        <VideoPlayer 
                                
                                url={`${BASE_URL}${product.videofile}`} 
                                poster={`${BASE_URL}${product.poster}`}
                                width='100%'
                                height={170}
                                autoplay={false}/>
                        </div>
                    </div>
                    )))}
                </div>
                

            <div style={{display:'flex',flexDirection:'column',marginTop:'15px'}}>
            <h5><span className='pull-left' style={{fontWeight:'bold',marginLeft:'5px'}}>Top selling items</span></h5>
            <TopCon>
                
                {!products.items.top || products.items.top.length<=0 ? (<div width='50%' height='80%' className="text-center"><img src='/loading.gif' alt='loading..' /></div>):
                        (topSelling.map(product=> (
                    <TopImg key={product.id}> 
                        
                            <ProductHome 
                            
                            
                            create={true}
                            product={product}
                            descriptionDisplay={descriptionDisplay}
                            HandleButtonClick={HandleButtonClick}
                            count={count}
                            decrement={decrement}
                            increment={increment} />
                        
                    </TopImg>)))}
            </TopCon>
            </div>

            {Electronics.length>0 ?
            <CategoryContainer>
                
                <Link className="nav-link" to={{
                    pathname:'/products-category/electronics',}} >
                    <CategoryTitle>Smart gadgets</CategoryTitle>
                </Link>
                <ImgSubCon>
                {!products.items.all || products.items.all.length<=0 ? (<div width='50%' height='80%' className="text-center"><img src='/loading.gif' alt='loading..' /></div>):
                        (Electronics.slice(0,6).map(product=> (
                    <Img key={product.id}> 
                        
                            <ProductCat 
                            
                            product={product}
                             />
                        
                    </Img>)))}
                </ImgSubCon>
            </CategoryContainer> : '' }

            {Household.length>0 ? 
            <CategoryContainer>
                <Link className="nav-link" to={{
                    pathname:'/products-category/household-accessories',}} >
                    <CategoryTitle>Household Items</CategoryTitle>
                </Link>
                <ImgSubCon>
                {!products.items.all || products.items.all.length<=0 ? (<div width='50%' height='80%' className="text-center"><img src='/loading.gif' alt='loading..' /></div>):
                        (Household.slice(0,6).map(product=> (
                    <Img key={product.id}> 
                        
                            <ProductCat 
                            
                            product={product}
                             />
                        
                    </Img>)))}
                </ImgSubCon>
            </CategoryContainer> : ''}

            {Kitchen.length>0? 
            <CategoryContainer>
                <Link className="nav-link" to={{
                    pathname:'/products-category/kitchen',}} >
                    <CategoryTitle>Kitchen Items</CategoryTitle>
                </Link>
                <ImgSubCon>
                {!products.items.all || products.items.all.length<=0 ? (<div width='50%' height='80%' className="text-center"><img src='/loading.gif' alt='loading..' /></div>):
                        (Kitchen.slice(0,6).map(product=> (
                    <Img key={product.id}> 
                        
                            <ProductCat 
                            
                            product={product}
                             />
                        
                    </Img>)))}
                </ImgSubCon>
            </CategoryContainer>: ''}

            {Bathroom.length>0 ? 
            <CategoryContainer>
                <Link className="nav-link" to={{
                    pathname:'/products-category/bathroom',}} >
                    <CategoryTitle>Bathroom Items</CategoryTitle>
                </Link>
                <ImgSubCon>
                {!products.items.all || products.items.all.length<=0 ? (<div width='50%' height='80%' className="text-center"><img src='/loading.gif' alt='loading..' /></div>):
                        (Bathroom.slice(0,6).map(product=> (
                    <Img key={product.id}> 
                        
                            <ProductCat 
                            
                            product={product}
                             />
                        
                    </Img>)))}
                </ImgSubCon>
            </CategoryContainer>: ''}
           
           
                        
           
            
            {products.items.sales.length>0? flashSaleHeader():''}
            <Row style={{borderRadius:6,border:"1px"}}>
            {!products.items || products.items.length<=0 ? (<div width='50%' height='80%' className="text-center"><img src='/loading.gif' alt='loading..' /></div>):
                        (flashSale.map(product=> (
                    <Col  xs="4" sm="4" md="3" lg="2" key={product.id} > 
                        
                            <ProductHome 
                            
                            key={product.id}
                            create={true}
                            product={product}
                            descriptionDisplay={descriptionDisplay}
                            HandleButtonClick={HandleButtonClick}
                            count={count}
                            decrement={decrement}
                            increment={increment} />
                        
                    </Col>)))}
            </Row>

            
        </div>

    )
}
const mapStateToProps = state =>({
    isAuthenticated:state.auth.isAuthenticated
  })

export default connect(mapStateToProps,{addToCart,logout})(HomeRecentlyAdded);

