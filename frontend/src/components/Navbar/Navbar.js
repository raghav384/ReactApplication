import React from 'react';
import { Component } from 'react';
import {Nav,NavLink,Bars,NavMenu,NavBtn,NavBtnLink} from './NavbarElements';
import Navbar1  from './Navbar1'
import Navbar2  from './Navbar2'

function Navbar(props) {
  const isLoggedIn = props.loggedInStatus;
  if (isLoggedIn == "LOGGED_IN") {
  return <Navbar2 />;} 
  return <Navbar1 />;
}
export default Navbar;
