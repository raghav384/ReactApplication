import './Search.css';
import axios from 'axios';
import Loader from './loader.gif';
import {Component, Fragment} from 'react';
import pharmeasy from './VendorsLogo/pharmeasy.png'
import mg from './VendorsLogo/1mg.png'
import logo from './HealthScroll_Logo.PNG'
import Demo from '../CardDesign/Card'
import '../CardDesign/Box.css';
import { Card } from "react-bootstrap";
import React from "react";

class Search extends Component {

	constructor(props) {
		super(props);

		this.state = {
			query: '',
			results: {},
			loading: false,
			message: '',
		};
	}

	fetchSearchResults = (query) => {
		const searchUrl = `http://localhost:8000/api/getdata/`+query;
		axios.get(searchUrl)
			.then(res => {
				this.setState({
					results: res.data,
					loading: false
				})
			})
			.catch(error => {
				if (error) {
					this.setState({
						loading: false,
						message: 'Failed to fetch the data. Please check network'
					})
				}
			})
	};

	handleOnInputChange = (event) => {
		const query_value = event.target.value;
		this.setState({ query: query_value, message: '' });
	};

	renderSearchResults = () => {
	

		let results = Array.from(this.state.results);
		results = results.slice(1,5);
		console.log(results);

		//return <DemoUsinGBootStrapGrid dataToPass = {results} />

		const renderCard = (card, index) => {
			return (
			  <Card style={{ width: "18rem" }} key={index} className="box">
			  <Demo dataToPass = {card}  />
			  </Card>
			);
		  };
		
		return <div className="grid">{results.map(renderCard)}</div>;

		//const search_result = results.map((result, index) => {
		// // 	return (
		// 		<Card dataToPass = {result}  />
		// 	)
		// })
		// return(
		// 	<div className = "col">
		// 		{search_result}


    	// 	</div>
		//   )

	};

Search(){
	const query = this.state.query;
	this.fetchSearchResults(query);
};

render() {
	const { query, loading, message } = this.state;

	return (
		<div class="container">
			<div class="grid-container">
				<div class="healthScrollLogo">
					<img class="logo-style" src ={logo}></img>
				</div>
				<div class="Description">
					<h1>Deals of medicine from various pharmacies All in one place !!!</h1>
					<h3 class="left-align">Try searching for a medicine</h3>
				</div>
				<div class="SearchBar">
						<input
							type="text"
							class="searchbar-style"
							name="query"
							value={query}
							id="search-input"
							placeholder="Enter the medicine name to compare price"
							onChange={this.handleOnInputChange}
					/>
				</div>
				<div class="SearchButton">
					<button onClick={this.Search.bind(this)} class="button-style">Search</button>
				</div>
				<div class="Vendors">
					<table class="vendor_table_styling">
						<tr>
							<td><img class="img-style" src={pharmeasy}></img></td>
							<td><img class="img-style" src={mg}></img></td>
						</tr>
					</table>
				</div>
			</div>
			{/*	Error Message*/}
			{message && <p className="message">{message}</p>}

			{/*	Loader*/}
			<img src={Loader} className={`search-loading ${loading ? 'show' : 'hide'}`} alt="loader" />

        	<Fragment>
           	<div>
            {this.renderSearchResults()}
			
          	</div>
        	</Fragment>
    
			
		</div>
	)
}
}

export default Search