import React from 'react';
import { Component } from 'react';
import {Nav,NavLink,Bars,NavMenu,NavBtn,NavBtnLink} from './NavbarElements';
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
        <NavLink to='/MedicineSearch' style = {{fontSize: "20px" }}> <i class="fa fa-search"></i>
          &nbsp;&nbsp;Medicine Search
        </NavLink>
          
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       
        
        <NavLink to='/blogCreation' activeStyle  style = {{fontSize: "20px" }}>
           <i class="fa fa-newspaper-o"></i>
           &nbsp;&nbsp;Blog Creation 
        </NavLink>
        
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          
        
          <NavLink to='/blogDisplay' activeStyle  style = {{fontSize: "20px" }}>
           <i class="fa fa-newspaper-o"></i>
           &nbsp;&nbsp;Display Blogs 
        </NavLink>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         
        

        <NavLink to='/NewsSection' activeStyle  style = {{fontSize: "20px" }}>
          <i class="fa fa-newspaper-o"></i> &nbsp;&nbsp;News Section
        </NavLink>
          
    
        </NavMenu>
      </Nav>
    </>
  );
}

}