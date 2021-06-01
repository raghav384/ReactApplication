import React from 'react';
import Search from "./components/SearchBar/Search";
//import Header from "./components/Header";
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import login from './components/Login/login';
import Signup from './components/Login/Signup';
import NewsComponent from './components/NewsSection/NewsComponent';
import Redirect from './components/Redirect/redirect';
import BlogCreation from './components/HealthBlog/BlogCreation';
import Home from './components/pages/Home';
import Footer from './components/Footer'
import Admin from './components/Admin/Admin';
import UserView from './components/HealthBlog/userBlogView';
import LoginSignup from './components/Authentication/LoginSignup';
import BlogDisplay from './components/HealthBlog/BlogDisplay';
import MetricsDashboard from './components/Admin/MetricsDashboard';
import BlogApproval from './components/Admin/BlogApproval';
import VendorAPI from './components/Admin/VendorAPI';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }
    this.handleLogin = this.handleLogin.bind(this);
    
  }

handleLogin(data){
  this.setState({
    loggedInStatus:"LOGGED_IN",
    user:data.user
  })
}

	render() {
		return (
			<div>
        
        <video autoPlay loop muted play 
          style={{
            position:"absolute",
            width:"100%",
            top:"9%",
            height:"100%",
            objectFit:"cover",
            transform:"tranlate(-50%,-50%)",
            zIndex:-10
            
            }}>
          <source src='video1.mp4' type='video/mp4'  />
          </video>

         
          
	<Router> 
  <Navbar loggedInStatus ={this.state.loggedInStatus} user_details={this.state.user}/>
      <Switch>
      <Route exact path={"/blogCreation"}
        render= {props => (
          <BlogCreation {...props} loggedInStatus={this.state.loggedInStatus} user_details={this.state.user} />
        )	}/>

        <Route path='/NewsSection' component={NewsComponent} />
        <Route path='/MedicineSearch' component={Search} />
        <Route path='/login' component={login} />
        <Route path='/SignUp' component={Signup} />
        <Route path='/redirect/:id' component={Redirect} />
        <Route path='/blogDisplay'component={BlogDisplay} />
        <Route path='/Admin' component={Admin} />
        <Route path='/userView'
          render={props => (
            <UserView {...props} user_details ={this.state.user}/>
          )}/>
      	<Route exact path={"/"}
        render= {props => (
          <Home {...props} loggedInStatus={this.state.loggedInStatus} />
        )	}/>
        <Route 
        path={"/loginSignup"}
        render={props =>(
        <LoginSignup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />) }/>
      
      <Route path='/blogApproval' component={BlogApproval} />
        <Route path='/metricsDashboard'component={MetricsDashboard} />
        <Route path='/vendorAPI' component={VendorAPI} />
      
      </Switch>
      <Footer />
    </Router>
			</div>
		);
	}
}
export default App;
