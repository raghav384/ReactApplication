import React from "react";
import Signup from "./Signup.js";
import {Container,Row,Col} from "react-bootstrap";
//import {AuthProvider} from './Context/AuthContext';
export default function login() {
  return (
    
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh"}}
    >
      <div className="w-100" style={{ maxWidth: "400px"}}>
        <Signup/>
        </div>
        </Container>
       
  );
}