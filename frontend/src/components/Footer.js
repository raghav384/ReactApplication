import React, { Component }from 'react';
import './Footer.css';  
import { Link } from 'react-router-dom';
import {Button} from "react-bootstrap"
import axios from 'axios';

class Footer extends Component {

    constructor(){
    super();

    this.state={
        email: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
handleChange(event) {
    let email = this.state.email;
    email = event.target.value;
    this.setState({email});
    
}

handleSubmit(event){
    event.preventDefault()
    const email = this.state.email;
    axios.post('http://localhost:8000/api/subscribe',{email})
    .then(response =>{
        console.log(response)
        if(response.data="Thankyou you for subscribing us !!!")
          alert('Succesfully Subscribed');
    })
    .catch(error => {
        console.log(error)
    })
    this.setState({email: ""});
}


render() {

const { email } = this.state

  return (
    <div class='footer-container'>
      <section class='footer-subscription'>
        <p class='footer-subscription-heading'>
        Want to receive exclusive Medicine offers? Subscribe to our newsletter
        </p>
        <p class='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              class='footer-input'
              name='email'
              type='email'
              placeholder='Enter your email address'
              value = {this.state.email}
              onChange = {this.handleChange}
            />
            <input type="submit" class='button-style' value="Subscribe"/>
            
          </form>
        </div>
      </section>
      
          <div class='footer-logo'>
            <Link to='/' class='social-logo'>
              HEALTHSCROLL
              <i class='fab fa-typo3' />
            </Link>
          </div>
          
        </div>
      
  );
}
}

export default Footer;