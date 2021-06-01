import React from 'react';
import Search from "./components/SearchBar/Search";
//import Header from "./components/Header";
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import login from './components/Login/login';
import Signup from './components/Login/Signup';
import NewsComponent from './components/NewsSection/NewsComponent';
import Redirect from './components/Redirect/redirect';
import HealthBlog from './components/HealthBlog/HealthBlog';
import Home from './components/pages/Home';
import Footer from './components/Footer'
import Admin from './components/Admin/Admin';
import userView from './components/HealthBlog/userBlogView';
class App extends React.Component {
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
      <Navbar />
      <Switch>
        <Route path='/HealthBlog' component={HealthBlog} />
        <Route path='/NewsSection' component={NewsComponent} />
        <Route path='/MedicineSearch' component={Search} />
        <Route path='/login' component={login} />
        <Route path='/SignUp' component={Signup} />
        <Route path='/redirect/:id' component={Redirect} />
        <Route path='/Admin' component={Admin} />
        <Route path='/userView' component={userView} />
      	<Route path='/' exact component={Home} />		

      </Switch>
      <Footer />
    </Router>
			</div>
		);
	}
}
export default App;
