import React,{useEffect,useState,useMemo} from 'react';
import axios from 'axios';
import {Table} from 'reactstrap';
import {logout,addToCart} from '../actions/auth';
import { connect } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import ProductDetailsModal from '../components/ProductDetailsModal';
import Pagination from '../components/Pagination';
import {descriptionDisplay} from './Products';
import styled from 'styled-components';
import {BASE_URL} from '../components/Url';
require('dotenv').config()


const Items=styled.div`
    width:100%;
    margin-top:20px;
`

const SubTitle =styled.div`
    display:flex;
    align-items:flex-start;
    justify-content:flex-start;
    font-size:15px;
    font-weight:bold;
    
`

const Desc = styled.div`
    display:flex;
    margin-left:auto;
    color:#18A558;
    font-size:15px;
`

const TH = styled.th`
    font-size:17px;
`
const TD = styled.td`
    font-size:15px;
`

const Status=styled.div`
    font-size:15px;
    font-weight:bold;
`

const Container=styled.div`
    margin:130px 10px 10px 0px;
    width:vw;
    display:flex;
    align-items:center;
    justify-content:center;

    @media screen and (max-width: 768px){
        ${TH}{
            font-size:13px;
        }
        ${TD}{
            font-size:10px;
        }
        ${Status}{
            font-size:10px;
        }
    }
    
`

let PageSize = 10;

const DashBoard = (props) =>{
    const [count,setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    
    const [orders,setOrders] = useState({
        items: {
            orders:[    
                {id: 0, ref: '', item: '',ordered_on:'',ordered_by:'',contact_number:0,delivery_address:'',amount:0,delivered:false}
                ],
            products: [
                {id: 0, description: '', image: '', category:'',price:0,quantity:0 }
                ]
            }

    })
    
    const token= localStorage.getItem('access')
    const email = localStorage.getItem('email')
    const navigate= useNavigate()

    //use useMemo inplace of useEffect
    useEffect(()=>{
        document.title = 'orders'
        const body = JSON.stringify({email})
        const config ={
            headers:{
                'Content-Type':'application/json',
                'Authorization':`JWT ${token}`,
                'Accept':'application/json'
            }
        };
        
        axios.put(`${BASE_URL}/api/orders/`, body, config).then((res) =>{ 
                setOrders({items:res.data})}).catch((err)=>{
                    if(err.response){
                        props.logout()
                        navigate('/login')
                }});
                
        },[])


        const recentOrders = [...orders.items.products]
        
        const increment=(num)=>{
            setCount(num+1)
        }
        
        const decrement=(num)=>{
            if(num>0){
                setCount(num-1)
            }
        }

       const currentData = useMemo(() => {
            const allOrders = [...orders.items.orders]
            const firstPageIndex = (currentPage - 1) * PageSize;
            const lastPageIndex = firstPageIndex + PageSize;
            return allOrders.slice(firstPageIndex, lastPageIndex);
          }, [currentPage,orders]); 

        const orderPresent = orders.items.orders.length > 0

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

        const noPreviousOrders = () => (
            <div className='container mt-3 justify-content-center' style={{height:420,borderRadius:6,border:"1px",}}>
                <img className='center mt-4' style={{height:80,borderRadius:20,width:80}} src='/beemathLogo.png' alt='order'/>
                <h2 className='order-header'>You are yet to make any order</h2>
                <p className='mt-3' style={{textAlign:'center'}}> Start making orders so we can also suggest other products you might like</p>
                <button className='start-shopping-button center'><Link style={{textDecoration:'none',color:'white'}} to="/products">START SHOPPING</Link></button>
            </div>
        )

        const hasPreviousOrders = ()=>(
            <div style={{width:'100%',margin:'15px'}}>
                <div>
                    <Table borderless striped style={{borderRadius:'6px'}}>
                        <tbody>
                            <tr>
                                <TH>Order</TH>
                                <TH>Date</TH>
                                <TH>Items</TH>
                                <TH>Amount</TH>
                                <TH>Fullfillment</TH>
                            </tr>
                        
                            {currentData.map((product) => {
                                return(
                                <tr key={product.id}>
                                    <TD>{product.ref}</TD>
                                    <TD>{product.ordered_on}</TD>
                                    <TD>{product.item}</TD>
                                    <TD>{product.amount}</TD>
                                    <TD>{deliveryStatus(product.delivered)}</TD>
                                </tr>)
                            })}

                        </tbody>
                    </Table>
                    <Pagination 
                    key={currentPage}
                    className="pagination"
                    currentPage={currentPage}
                    totalCount={orders.items.orders.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}/>
                </div>
                <button className='start-shopping-button center'><Link className='nav-link' to="/products">START SHOPPING</Link></button>
                
                <Items>
                    <SubTitle>
                        <h6>Similar items you might like</h6>
                        <Desc><Link className='nav-link' to='/products' >SEE ALL</Link></Desc>
                    </SubTitle>
                        <Row>
                
                            {!orders.items.products || orders.items.products.length<=0 ? (<div width='50%' height='80%' className="text-center"><h4>start making orders</h4></div>):
                                    (recentOrders.slice(0,6).map(product=> (
                                <Col  xs="6" sm="4" md="3" lg="2" key={product.id} > 
                                    <div className='cardStyle'>
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
                                </Col>
                                    ))) }
                        </Row>
                </Items>
            </div>
        )


        const deliveryStatus = (status)=>{
            if(status===true){
                return <Status><span className="badge bg-success">fullfilled</span></Status>
            }else{
                return <Status><span className="badge bg-warning text-dark">unfullfilled</span></Status>
            }
        }
        

    return (
        <Container>
            {orderPresent? hasPreviousOrders(): noPreviousOrders()}
            
        </Container>
    )

}

    
export default connect(null,{logout,addToCart})(DashBoard);