import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import './login.css';
import axios from "axios";

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    axios
      .post('http://localhost:8000/api/authenticate_user',{
        "email" : emailRef.current.value,
        "password" : passwordRef.current.value
      })
      .then(response => {
        if(response == "user_not_found")
        {
          //alert and routing
          //<Redirect to = {{ pathname: "/login" }} />
        }
       // console.log("hell1");
        console.log(response)
      })
      .catch(error => {
      //  console.log("hell2");
        console.log(error);
      })
    try {
      setError("")
      setLoading(true)
     // await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }
  const responseFacebook = (response) => {
    console.log(response);
    axios.post('http://localhost:8000/api/register_user/fb_login',response).then((res)=>{
     console.log(res);
  });
  }

  const responseGoogle = (response) => {
    axios.post('http://localhost:8000/api/register_user/google_login',response).then((res)=>{
   });
}

  return (
    <div>
      <div >
      <Card style={{ maxWidth: "400px" ,marginLeft :"500px",marginTop: "100px",backgroundColor:"#323635",borderRadius:"15px",fontSize :"large" }}>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} style={{maxWidth: "400px"}}>
          <h2 className="text-center mb-4" style={{fontSize :"25px", color:"white"}}>Log In</h2>
            <Form.Group id="email">
              <Form.Label style={{ color:"white"}}>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label style={{ color:"white"}}>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-20" type="submit" style={{width:"50%",marginLeft: "90px",fontSize :"15px"}}>
              Log In
            </Button>
            <div className="w-100 text-center mt-2" style={{ color:"white"}}>
        Need an account? <Link to="/SignUp">Sign Up</Link>
      </div>
      </Form>  
        <div> 
          <br></br> 
        <FacebookLogin 
        appId="3825163174199146" //APP ID NOT CREATED YET
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="loginBtn loginBtn--facebook"
        />
        
        <GoogleLogin
        clientId="644415206269-8dtrmg5l216aueioc1sl64euocbls8ru.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cssClass="loginBtn loginBtn--google"
      />
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
  )
}
