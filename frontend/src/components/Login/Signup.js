import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
//import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import axios from 'axios'

export default function Signup() {
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
 // const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }
    axios
    .post('http://localhost:8000/api/register_user/website_signup',{
      "firstName":firstNameRef.current.value,
      "lastName":lastNameRef.current.value,
      "email" : emailRef.current.value,
      "password" : passwordRef.current.value,
      "confirmPassword": passwordConfirmRef.current.value
    })
    .then(response => {
      if(response)
        console.log(response)
    })
    .catch(error => {
    //  console.log("hell2");
      console.log(error);
    })
    try {
      setError("")
      setLoading(true)
   //   await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <div className="container-fluid" style={{backgroundColor:"#43f7ca"}}>
      <div >
      <Card style={{ maxWidth: "400px" ,marginLeft :"500px",marginTop:"50px",backgroundColor:"#323635",borderRadius:"15px",fontSize :"large" }}>
        <Card.Body>
          <h2 className="text-center mb-4" style={{fontSize :"25px",color:"white"}}>Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} >
          <Form.Group id="firstName">
              <Form.Label style={{ color:"white"}}>First Name</Form.Label>
              <Form.Control type="text" ref={firstNameRef} required />
            </Form.Group>
            <Form.Group id="lastName">
              <Form.Label style={{ color:"white"}}>Last Name</Form.Label>
              <Form.Control type="text" ref={lastNameRef} required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label style={{ color:"white"}}>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label style={{ color:"white"}}>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label style={{ color:"white"}}>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-20" type="submit" style={{width:"50%",marginLeft: "90px",fontSize :"15px"}} type="submit">
              Sign Up
            </Button>
            <div className="w-100 text-center mt-2" style={{ color:"white"}}>
        Already have an account? <Link to="/login">Log In</Link>
      </div>
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
  )
}
