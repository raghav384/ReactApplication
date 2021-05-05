import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';
import logo from './logo.PNG';
import login from "../Login/login";
const Navbar = () => {
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
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        
        <NavLink to='/HealthBlog/HealthBlog' activeStyle  style = {{fontSize: "20px" }}>
           <i class="fa fa-newspaper-o"></i>
           &nbsp;&nbsp;Health Blog 
        </NavLink>
        
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <NavLink to='/NewsSection' activeStyle  style = {{fontSize: "20px" }}>
          <i class="fa fa-newspaper-o"></i> &nbsp;&nbsp;News Section
        </NavLink>
          
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          
          <NavLink to='/login' activeStyle  style = {{fontSize: "20px" }}>
            <i class="fa fa-sign-in" aria-hidden="true"></i> &nbsp;&nbsp;Login
          </NavLink>
          
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;