import React from 'react';
import Search from "./components/SearchBar/Search";
//import Header from "./components/Header";
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import login from './components/Login/login';
import Signup from './components/Login/Signup';
import NewsAndBlogs from './components/NewsSection/NewsAndBlogs';

class App extends React.Component {
	render() {
		return (
			<div>
	<Router>
      <Navbar />
      <Switch>
        <Route path='/HealthBlog' component={NewsAndBlogs} />
        <Route path='/MedicineSearch' component={Search} />
        <Route path='/login' component={login} />
        <Route path='/SignUp' component={Signup} />
      </Switch>
    </Router>
			</div>
		);
	}
}
export default App;
