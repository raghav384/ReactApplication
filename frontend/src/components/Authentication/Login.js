import React, {Component} from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import axios from 'axios'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import './login.css';

export default class Login extends Component {
constructor(props) {
    super(props);
    
    this.state = {
        user_email:"",
        password: "",
        loginErrors:""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);    
    this.responseFacebook = this.responseFacebook.bind(this);
    this.responseGoogle =this.responseGoogle(this);
}
handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    })
}
handleSubmit(event) {
    axios.post('http://localhost:8000/api/authenticate_user',{
     user:{

         password: this.state.password,
         email:this.state.user_email   
     }
    },{ withCredentials:false })
    .then(response => {
        if(response.status === 200){
        this.props.handleSuccessfulAuth(response.data);
    }
    })
    .catch(error => {
      console.log(error);
    })
    event.preventDefault();


    }

responseFacebook = (response) => {
      console.log(response);
      axios.post('http://localhost:8000/api/register_user/fb_login',response).then((res)=>{
       console.log(res);
    });
    }
  
responseGoogle = (response) => {
      console.log(response);
      /*axios.post('http://localhost:8000/api/register_user/google_login',response).then((res)=>{
     });*/
  }

render(){
    return (
      <div>
      <div >
      <Card style={{ maxWidth: "400px" ,marginTop: "100px",backgroundColor:"#323635",borderRadius:"15px",fontSize :"large" }}>
        <Card.Body>
          <Form onSubmit={this.handleSubmit} style={{maxWidth: "400px"}}>
          <h2 className="text-center mb-4" style={{fontSize :"25px", color:"white"}}>Log In</h2>
            <Form.Group id="email">
              <Form.Label style={{ color:"white"}}>Email</Form.Label>
              <Form.Control type="email" name="user_email" value={this.state.user_email} onChange={this.handleChange} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label style={{ color:"white"}}>Password</Form.Label>
              <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            </Form.Group>
            <Button className="w-20" type="submit" style={{width:"50%",marginLeft: "90px",fontSize :"15px"}}>
              Log In
            </Button>
          </Form>  
        <div> 
          <br></br> 
       
        </div>
        <div>
      </div>
      
        </Card.Body>
      </Card>
      </div>
      <div style={{height:"100px"}}>
        <br></br>
        <br></br>
        <br></br>

      </div>
      </div>
    );
}
}