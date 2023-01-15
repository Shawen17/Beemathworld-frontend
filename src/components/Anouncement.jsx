import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
    height:30px;
    background-color:#18A558;
    color:white;
    display:flex;
    align-items: center;
    justify-content: center;
    font-size:14px;
    font-weight:500;
  `





const Anouncement = () => {
  return (
    <Container>
       At Beemathworld you get the best household gadgets
    </Container>
  );
}

export default Anouncement;
