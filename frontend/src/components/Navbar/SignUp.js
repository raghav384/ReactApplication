import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from 'react';
import { Container } from "react-bootstrap"
import Signup from "../Login/Signup";
import Login from "../Login/login";
class SignUp extends React.Component {
	render() {
    return (
      // <Container
      // className="d-flex align-items-center justify-content-center"
      //    style={{ minHeight: "100vh" }}
      // >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
            {/* <AuthProvider> */}
              <Switch>
              <Route path="/login" component={Login} />
                <Route path="/SignUp" component={Signup} />
             </Switch>
             {/* </AuthProvider> */}
          </Router> 
         </div>
      // </Container>
    )
}
}
export default SignUp;