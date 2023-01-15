import React, {useEffect,useState,useMemo } from "react";
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import ProductDetailsModal from "../components/ProductDetailsModal";
import { useNavigate } from 'react-router-dom';
import {logout,addToCart} from '../actions/auth';
import { connect } from 'react-redux';
import {descriptionDisplay} from './Products';
import Pagination from '../components/Pagination';


require('dotenv').config()
let PageSize = 6;

const FlashSale =(props)=> {
    const [currentPage, setCurrentPage] = useState(1);
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
                ]
            }

    })
    const email = localStorage.getItem('email')
    const token = localStorage.getItem('access')
    const navigate= useNavigate()
    document.title = 'flash-sale'

    useEffect(()=>{
        const config ={
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        };
        axios.get(process.env.REACT_APP_RECENTLY_ADDED, config).then(res => setProducts({items:res.data}))

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

    

    //use usememo effect solely
     const flashSale = useMemo(()=>{
        return products.items.sales
    },[products])

    // var filteredProduct = flashSale.filter(function(product){ 
    //     return product.category.includes(searchValue) || product.description.includes(searchValue)
        
    // })

    const currentData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return flashSale.slice(firstPageIndex, lastPageIndex);
      }, [currentPage,flashSale]); 

    const flashSaleHeader=()=>(
        <div className="mt-3" style={{backgroundColor:'blueviolet',borderRadius:'6px'}}>
            <h1 style={{textAlign:'center'}}>Flash Sales</h1>
        </div>
    )

    
    return (
        <div className='container-fluid' style={{marginTop:'110px'}}>
            {flashSaleHeader()}
            
            <Row className="mt-3" style={{borderRadius:6,border:"1px"}}>
                {!products.items.recent || products.items.recent.length<=0 ? (<div width='50%' height='80%' className="text-center"><img src='/loading.gif' alt='loading..' /></div>):
                        (currentData.map(product=> (
                    <Col  xs="6" sm="6" md="3" lg="2" key={product.id} > 
                         <ProductDetailsModal 
                            
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
            <Pagination 
                
                className="pagination mt-5"
                currentPage={currentPage}
                totalCount={flashSale.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}/>
        </div>

    )
}
const mapStateToProps = state =>({
    isAuthenticated:state.auth.isAuthenticated
  })

export default connect(mapStateToProps,{addToCart,logout})(FlashSale);

