import React from 'react';
import Search from "./components/SearchBar/Search";
import Header from "./components/Header";
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HealthBlog from './components/Navbar/Health Blog';
import SignUp from './components/Navbar/Sign up';
import Redirect from './pages/redirect'
class App extends React.Component {
	render() {
		return (
			<div>
	<Router>
      <Navbar />
      <Switch>
        <Route path='/Health Blog' component={HealthBlog} />
        <Route path='/News Section' component={HealthBlog} />
        <Route path='/Medicine Search' component={Search} />
        <Route path='/Sign up' component={SignUp} />
		<Route path='/' exact component={Header} />
		<Route path='/redirect' component={Redirect} />
      </Switch>
    </Router>
				
			</div>
		);
	}
}
export default App;
