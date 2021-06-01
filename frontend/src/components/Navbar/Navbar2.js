import React from 'react';
import { Component } from 'react';
import {Nav,NavLink,Bars,NavMenu,NavBtn,NavBtnLink} from './NavbarElements2';
import {Button} from 'react-bootstrap';
export default class Navbar2 extends Component{
  constructor(props){
    super(props);
}

  render() {
 let username = this.props.user_details.firstName;
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
          
          &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          <NavLink to='/userView' activeStyle  style = {{fontSize: "20px" }}>
           <i class="fa fa-newspaper-o"></i>
           &nbsp;&nbsp;MyBlogs 
        </NavLink>
        
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        
        <NavLink to='/blogCreation' activeStyle  style = {{fontSize: "20px" }}>
           <i class="fa fa-newspaper-o"></i>
           &nbsp;&nbsp;Blog Creation 
        </NavLink>
        
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        
          <NavLink to='/blogDisplay' activeStyle  style = {{fontSize: "20px" }}>
           <i class="fa fa-newspaper-o"></i>
           &nbsp;&nbsp;Display Blogs 
        </NavLink>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        

        <NavLink to='/NewsSection' activeStyle  style = {{fontSize: "20px" }}>
          <i class="fa fa-newspaper-o"></i> &nbsp;&nbsp;News Section
        </NavLink>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;
        <label> <h1 activeStyle  style = {{fontSize: "20px" ,color:"yellow"}}> Hello {username}  </h1></label>
    
        </NavMenu>
      </Nav>
    </>
  );
}

}