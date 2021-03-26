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

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
          <img src ="http://localhost:8000/api/image_retriever/HealthScroll.png" style = {{width: "100px" , height: "60px"}}/>
        </NavLink>
        <Bars />
        <NavMenu>
        
          <NavLink to='/Health Blog' activeStyle  style = {{fontSize: "20px" }}>
           <i class="fa fa-newspaper-o"></i>
           &nbsp;&nbsp;Health Blog 
          </NavLink>
          <NavLink to='/News Section' activeStyle  style = {{fontSize: "20px" }}>
           <i class="fa fa-newspaper-o"></i>
           &nbsp;&nbsp;News Section
          </NavLink>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;
          <NavLink to='/Medicine Search' activeStyle style = {{fontSize: "20px" }}> <i class="fa fa-search"></i>
          &nbsp;&nbsp;Medicine Search
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn> 
          <NavBtnLink to='/Sign Lup'>Log-in </NavBtnLink> 
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
