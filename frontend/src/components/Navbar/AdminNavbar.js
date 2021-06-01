import React from 'react';
import { Component } from 'react';
import {Nav,NavLink,Bars,NavMenu,NavBtn,NavBtnLink} from './NavbarElements2';
import {Button} from 'react-bootstrap';
export default class Navbar2 extends Component{
  constructor(props){
    super(props);
}

  render() {
  
  return (
    <>
      <Nav>
        <NavLink to='/'>
          <img  alt = "" src ="http://localhost:8000/api/image_retriever/HealthScroll.png" style = {{width: "100px" , height: "60px"}}/>
        </NavLink>
        <Bars />
        <NavMenu>
        <NavLink to='/metricsDashboard' style = {{fontSize: "20px" }}> 
        <i class="fa fa-bar-chart" aria-hidden="true"></i>
          &nbsp;&nbsp;Metrics Dashboard 
        </NavLink>
          
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        
        
        <NavLink to='/blogApproval' activeStyle  style = {{fontSize: "20px" }}>
           <i class="fa fa-newspaper-o"></i>
           &nbsp;&nbsp;Blog Approval 
        </NavLink>
        
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </NavMenu>

        <NavLink to='/vendorAPI' activeStyle  style = {{fontSize: "20px" }}>
        <i class="fa fa-terminal" aria-hidden="true"></i>
           &nbsp;&nbsp;Vendor API Management Console
        </NavLink>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;
        <label> <br></br><h1 activeStyle  style = {{fontSize: "20px" ,color:"yellow"}}> Hello Admin  </h1></label>
      </Nav>
    </>
  );
}

}