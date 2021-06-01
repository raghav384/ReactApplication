import React from 'react';
import { Component } from 'react';
import {Nav,NavLink,Bars,NavMenu,NavBtn,NavBtnLink} from './NavbarElements';
import Navbar1  from './Navbar1'
import Navbar2  from './Navbar2'
import AdminNavbar from './AdminNavbar'

function Navbar(props) {
  let isAdmin = false;
  const isLoggedIn = props.loggedInStatus;
  if(isLoggedIn == "LOGGED_IN"){
  isAdmin = props.user_details.isAdmin;}

  if (isLoggedIn == "LOGGED_IN") {
    if(isAdmin){return <AdminNavbar />;}
    return <Navbar2 user_details={props.user_details} />;  
  } 
  return <Navbar1 />;
}
export default Navbar;
