import React from "react";
import styled from "styled-components";

const Header = styled.h5`
  font-size: 17px;
  color: #18a558;
  text-decoration-line: underline;
  text-decoration-color: #18a558;
  text-decoration-thickness: 2px;
  margin-bottom: 20px;
`;

const Container = styled.div`
  margin: 110px 5px 20px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image:url('/about-us.jpg');
  background-size:cover;
  width:100%;
  height:100%;

  @media screen and (max-width: 600px) {
    ${Header} {
      font-size: 15px;
    }
  }
`;

const AboutUs = () => {
  document.title = "about-us";

  return (
    <Container>
      <Header>About Us</Header>
      <div>
        <p>
          Beemathworld is the home of amazing smart everyday household gadgets
          ranging from kitchen, sitting room, bathroom and electronic gadgets in
          general. We have varieties of items that will make your everyday life
          easy. From aesthetics of your home, ease of cooking in your kitchen,
          smart items your kids can play and learn with to selfcare gadgets that
          will make your rough day a smooth sailing one, we offer this and more.
        </p>
        <p>
          Check us out regularly to get new products with the latest
          technology.We offer both wholesale and retail and we deilver
          everywhere as our logistics team is well grounded to make this
          possible.
        </p>
      </div>
    </Container>
  );
};

export default AboutUs;
