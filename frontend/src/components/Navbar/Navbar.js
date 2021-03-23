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
          <img src = {logo} style = {{width: "100px" , height: "80px"}}/>
        </NavLink>
        <Bars />
        <NavMenu>
        
          <NavLink to='/Health Blog' activeStyle  style = {{fontSize: "20px" }}> <i class="fa fa-newspaper-o"></i>
            Health Blog and News Section
          </NavLink>
          <NavLink to='/Medicine Search' activeStyle style = {{fontSize: "20px" }}> <i class="fa fa-search"></i>
           Medicine Search
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn> 
          <NavBtnLink to='/SignUp'>Login</NavBtnLink> 
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
