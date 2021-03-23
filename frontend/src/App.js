import React from 'react';
import Search from "./components/SearchBar/Search";
import Header from "./components/Header";
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NewsAndBlogs from './components/NewsSection/NewsAndBlogs';
import SignUp from './components/Navbar/Signup';

class App extends React.Component {
	render() {
		return (
			<div>
	<Router>
      <Navbar />
      <Switch>
        <Route path='/HealthBlog' component={NewsAndBlogs} />
        <Route path='/MedicineSearch' component={Search} />
        <Route path='/Signup' component={SignUp} />
		<Route path='/' component={Header} />
      </Switch>
    </Router>
				
			</div>
		);
	}
}
export default App;
