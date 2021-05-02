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
class App extends React.Component {
	render() {
		return (
			<div>
	<Router>
      <Navbar />
      <Switch>
        <Route path='/HealthBlog' component={HealthBlog} />
        <Route path='/NewsSection' component={NewsComponent} />
        <Route path='/MedicineSearch' component={Search} />
        <Route path='/login' component={login} />
        <Route path='/SignUp' component={Signup} />
        <Route path='/redirect/:id' component={Redirect} />
      </Switch>
    </Router>
			</div>
		);
	}
}
export default App;
