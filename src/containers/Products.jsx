import React,{useState, useEffect, useMemo} from 'react';
import {Container, Row, Col } from 'reactstrap';
import ProductDetailsModal from '../components/ProductDetailsModal';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {logout,addToCart} from '../actions/auth';
import { connect } from 'react-redux';
import Pagination from '../components/Pagination';


require('dotenv').config()




let PageSize = 30;

export const descriptionDisplay = (description)=>{
    var limit = description.length
    if(limit>11){
        description = description.substr(0,15)
        description = description + '...'
        return description
    }else{
        return description
    }
}




const Products = (props) => {
    document.title = 'products'
    const [productValue,setProductValue]=useState({items:[]})
    const [count,setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const navigate= useNavigate()
    const token = localStorage.getItem('access')
    const email = localStorage.getItem('email')
    
    const increment=(num)=>{
        setCount(num+1)
            
        }
    
    const decrement=(num)=>{
        if(num>0){
            setCount(num-1)
        }
        
      }

   useEffect(()=>{
        
        const config ={
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        }
    };
    axios.get('https://shawen.pythonanywhere.com/api/giveaway/', config).then(res => setProductValue({items:res.data}))},[])

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
    
    var filteredProduct;

    if (typeof props.searchValue ==='undefined'){
         filteredProduct= productValue.items
    }else{
        filteredProduct = productValue.items.filter(function(product){ 
            return product.category.includes(props.searchValue) || product.description.includes(props.searchValue)
    })
    }

    const currentData = useMemo(() => {
            const firstPageIndex = (currentPage - 1) * PageSize;
            const lastPageIndex = firstPageIndex + PageSize;
            return filteredProduct.slice(firstPageIndex, lastPageIndex);
          }, [currentPage,props.searchValue,productValue]); 

    
    return(
        <Container style={{marginTop:'100px'}}>
           
            <Row>
                {!productValue.items || productValue.items.length<=0 ? (<div width='50%' height='80%' className="text-center"><img src='/loading.gif' alt='loading..' /></div>):
                        (currentData.map(product=> (
                    <Col  xs="6" sm="4" md="3" lg="2" key={product.id} > 
                        <div >
                            <ProductDetailsModal 
                            key={product.id}
                            create={true}
                            product={product}
                            resetState={props.resetState}
                            descriptionDisplay={descriptionDisplay}
                            HandleButtonClick={HandleButtonClick}
                            count={count}
                            decrement={decrement}
                            increment={increment}
                            />
                        
                        </div>
                    </Col>)))}
            </Row>
            <Pagination 
                
                className="pagination mt-5"
                currentPage={currentPage}
                totalCount={filteredProduct.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}/>
            
            
        </Container>
    )

}


export default connect(null,{addToCart,logout})(Products);