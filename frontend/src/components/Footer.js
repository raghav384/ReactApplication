import React, { Component }from 'react';
import './Footer.css';  
import { Link } from 'react-router-dom';
import {Button} from "react-bootstrap"
import axios from 'axios';





class Footer extends Component {

    constructor(props){
    super(props)

    this.state={
        email: ''
    }
}
changeHandler=(e) => {
    this.setState({[e.target.name]: e.target.value})
}


submitHandler = e =>{
    e.preventDefault()
    axios.post('',this.state)
    .then(response =>{
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
}


render() {

const { email } = this.state

  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
        Want to receive exclusive Medicine offers? Subscribe to our newsletter
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
          <form onSubscribe={this.submitHandler}>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
              value = {email}
              onchange = {this.changeHandler}
            />
            
            <Button variant="secondary" size="lg">Subscribe</Button>
          </form>
        </div>
      </section>
      
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              HEALTHSCROLL
              <i class='fab fa-typo3' />
            </Link>
          </div>
          
        </div>
      
  );
}
}

export default Footer;