import React, {Component} from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import axios from 'axios'

export default class Registration extends Component {
constructor(props) {
    super(props);
    
    this.state = {
        firstName: "",
        lastName: "",
        user_email:"",
        password: "",
        password_confirmation:"",
        registrationErrors:""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);    
}
handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    })
}
handleSubmit(event) {
    axios.post('http://localhost:8000/api/register_website_user',{
     user:{
         firstName: this.state.firstName,
         lastName: this.state.lastName,
         password: this.state.password,
         email:this.state.user_email,
         isAdmin: false   
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
render(){
    return (
        <div >
        <div >
          
        <Card style={{ maxWidth: "400px" ,marginTop:"50px",backgroundColor:"#323635",borderRadius:"15px",fontSize :"large" }}>
          <Card.Body>
            
            <Form onSubmit={this.handleSubmit} >
            <Form.Group id="firstName">
                <Form.Label style={{ color:"white"}}>First Name</Form.Label>
                <Form.Control type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} required />
              </Form.Group>
              <Form.Group id="lastName">
                <Form.Label style={{ color:"white"}}>Last Name</Form.Label>
                <Form.Control type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} required />
              </Form.Group>
              <Form.Group id="email">
                <Form.Label style={{ color:"white"}}>Email</Form.Label>
                <Form.Control type="email" name="user_email" value={this.state.user_email} onChange={this.handleChange} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label style={{ color:"white"}}>Password</Form.Label>
                <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label style={{ color:"white"}}>Password Confirmation</Form.Label>
                <Form.Control type="password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange} required />
              </Form.Group>
              <Button className="w-20" type="submit" style={{width:"50%",marginLeft: "90px",fontSize :"15px"}} type="submit">
                Sign Up
              </Button>
              
            </Form>
          </Card.Body>
        </Card>
  </div>     
    <div>
      <br></br>
      <br></br>
       <br></br>
    </div>
  
      </div>
    );
}
}