import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Products from './containers/Products';
import DashBoard from './containers/DashBoard';
import CheckoutPage from './containers/CheckoutPage';
import ContactUs from './containers/ContactUs';
import FlashSale from './containers/FlashSale';
import Layout from './hoc/Layout';
import { Provider } from 'react-redux';
import store from './store';
import ProductCategory from './containers/ProductCategory';





const App = () =>{
  

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
        
          <Routes>
            <Route path='/' exact element={<Home />}  /> 
            <Route path='/dashboard' exact element={<DashBoard />}  /> 
            <Route path="/login" exact element={ <Login />} />
            <Route path="/products" exact element={<Products />} />
            <Route path="/products-category/:category"  element={<ProductCategory />} />
            <Route path="/flash-sales" exact element={<FlashSale />} />
            <Route path="/checkout" exact element={<CheckoutPage />} />  
            <Route path="/signup" exact element={<Signup />} />
            <Route path='/activate/:uid/:token' exact element={<Activate />}  />
            <Route path='/reset-password' exact element={<ResetPassword />}  />
            <Route path='/password/reset/confirm/:uid/:token' exact element={<ResetPasswordConfirm />}  />
            <Route path="/contact" exact element={<ContactUs />} />
           
          </Routes>
          
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}


export default App;
