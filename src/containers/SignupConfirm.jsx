import React from 'react';
import styled from 'styled-components';
import {OutboxOutlinedIcon} from '@mui/icons-material/OutboxOutlined';


const Container=styled.div`
    width:100%;
    height:100%;
    background-color: #18A558;
    display:flex;
    align-items:center;
    justify-content:center;
    margin-top:110px;
`
const AlertMessage=styled.div`
    display:flex;
    flex-direction:column;
    background-color:white;
    width:40%;
    align-items:center;
    justify-content:center;`

const Brand=styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    margin-bottom:30px;
    `


const SignupConfirm = () =>{
    return(
        <Container>
            <Brand>
                <img style={{height:60,borderRadius:20,width:60}} src='/beemathLogo.png' alt='beemath'/>
                <h2 style={{color:'white'}}>Beemathworld</h2>
            </Brand>
            
            <AlertMessage>
                <OutboxOutlinedIcon/>
                <h5>Verify your Email Address</h5>
                <p className='mt-4'>A verification link as been sent to you,
                    kindly verify your account.
                </p>

            </AlertMessage>
        </Container>
    )
   
}

    
export default SignupConfirm;