import React from 'react';
import Navbar from "./components/Navbar"
import Search from "./components/SearchBar/Search";
import Header from "./components/Header";
class App extends React.Component {
	render() {
		return (
			<div>
				<Navbar/>
				<Header/>
				<Search/>
			</div>
		);
	}
}
export default App;