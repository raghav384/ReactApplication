import React from 'react';
import { Component } from 'react';
import '../../App.css';
import FrontSection from '../FrontSection';

export default class Home extends Component{
constructor(props) {
  super(props);
}

render(){
  console.log(this.props.loggedInStatus)
  return (
    <>
      <FrontSection/>
  
    </>
  );
}
}
