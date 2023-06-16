import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { Form } from "reactstrap";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import { SearchContainer } from "../components/NavBar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import styled from "styled-components";
import { Container, Title, FormDisplay } from "./ContactUs";

const Input = styled.input`
  type: ${(props) => props.type};
  margin-left: 10px;

  width: 100%;
  border: none;
  border-style: none;
  &:focus {
    outline: none;
    border-color: none;
    border: none;
  }
`;

export const Outline = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  align-items: flex-start;
  justify-content: flex-start;
  color: black;

  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`;

const Login = ({ login, isAuthenticated, loginFailed }) => {
  const [inputValues, setValues] = useState({});

  document.title = "login";

  const buttonStyle2 = {
    borderRadius: "6px",
    height: "30px",
    textAlign: "center",
    margin: "4px",
  };

  const HandleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues((values) => ({ ...values, [name]: value.trim() }));
  };
  const history = useHistory();
  // const navigate = useNavigate();

  const HandleSubmit = (e) => {
    e.preventDefault();
    const email = inputValues.email;
    const password = inputValues.password;
    login(email, password);
  };

  if (isAuthenticated) {
    // navigate("/products");
    history.goBack();
  }

  const formDisplay = {
    width: "100%",
  };

  return (
    <Container>
      <Title> Login to your account </Title>
      {loginFailed ? <div>Username or Password incorrect</div> : ""}
      <FormDisplay style={{ justifyContent: "center" }}>
        <Form style={formDisplay} onSubmit={HandleSubmit}>
          <SearchContainer className="mt-3" style={{ width: "100%" }}>
            <Input
              placeholder="abc@example.com"
              name="email"
              value={inputValues.email || ""}
              type="email"
              onChange={HandleChange}
            />
            <MailOutlineOutlinedIcon />
          </SearchContainer>
          <SearchContainer className="mt-3" style={{ width: "100%" }}>
            <Input
              placeholder="password"
              name="password"
              value={inputValues.password || ""}
              type="password"
              onChange={HandleChange}
            />
            <LockOutlinedIcon />
          </SearchContainer>
          <div style={buttonStyle2}>
            <button className="login-button" type="submit">
              Login
            </button>
          </div>
        </Form>
        <Outline>
          <Link
            className="signup-link mt-5"
            style={{ marginLeft: 0 }}
            to="/signup"
          >
            New User? Signup
          </Link>
          <p style={{ display: "flex" }} className="mt-3">
            Forgot Password?{" "}
            <Link className="signup-link" to="/reset-password">
              Reset Password
            </Link>
          </p>
        </Outline>
      </FormDisplay>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loginFailed: state.auth.failed,
});

export default connect(mapStateToProps, { login })(Login);
