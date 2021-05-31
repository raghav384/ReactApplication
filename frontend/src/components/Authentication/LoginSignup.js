import React, {Component} from 'react'
import Registration from './Registration'
import Login from './Login'
import {Button,Row,Col} from "react-bootstrap";
export default class LoginSignup extends Component {
constructor(props){
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
}
handleSuccessfulAuth(data){
    this.props.handleLogin(data);
    this.props.history.push("/");

}
    render(){
        console.log(this.props.loggedInStatus);
    return (
        <div class="container">
            <div className="col-md-6" >
            <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
            </div>
            <div className="col-md-6" >
            <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
            </div>
            
        </div>
    );
}
}