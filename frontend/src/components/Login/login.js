import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
//import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
 // const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

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

  return (
    <div>
      <Card style={{ maxWidth: "400px" ,marginLeft :"500px",marginTop: "100px",backgroundColor:"#DCDCDC",borderRadius:"15px",fontSize :"large" }}>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} style={{maxWidth: "400px"}}>
          <h2 className="text-center mb-4" style={{fontSize :"25px"}}>Log In</h2>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-20" type="submit" style={{width:"50%",marginLeft: "90px",fontSize :"15px"}}>
              Log In
            </Button>
            <div className="w-100 text-center mt-2" >
        Need an account? <Link to="/SignUp">Sign Up</Link>
      </div>
          </Form>
          <Button  disabled={loading} className="w-100" type="submit" style={{borderColor:"#4169E1",backgroundColor : "#4169E1",width:"40%",marginTop:"20px",marginLeft: "3px",fontSize :"15px"}}>
              Login With Facebook
            </Button>
            <Button disabled={loading} className="w-100" type="submit" style={{borderColor:"#B22222",backgroundColor:"#B22222",width:"40%",marginTop:"20px",marginLeft: "3px",fontSize :"15px"}}>
              Login With Google
            </Button>
        </Card.Body>
      </Card>
      </div>
  )
}
