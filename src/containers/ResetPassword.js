import React, {useState} from 'react';
import {Input,Form} from 'reactstrap';
import { reset_password } from '../actions/auth';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const ResetPassword = ({reset_password}) =>{
    const [input,setInput]=useState()
    const [requestSent,setRequestSent]=useState(false)


    const handleSubmit= (e)=>{
        e.preventDefault()
        reset_password(input)
        setRequestSent(true)
        
    }

    const navigate = useNavigate()
    if(requestSent){
        return navigate('/password/reset/confirm/:uid/:token')
    }

    return(
        <div className='container mt-5'>
            <h2>Request Password Reset </h2>
            <Form className='mt-3' onSubmit={handleSubmit}>
                <Input type='email' name='email' value={input} onChange={(e)=>{setInput(e.target.value)}} required />
                <button className='btn btn-primary mt-3' type='submit'> Reset Password</button>
            </Form>

        </div>
    )
   

    }

    
export default connect(null,{reset_password})(ResetPassword);