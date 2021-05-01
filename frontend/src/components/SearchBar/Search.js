import './Search.css';
import axios from 'axios';
import Loader from './loader.gif';
import {Component, Fragment} from 'react'

import Demo from '../CardDesign/Card'
import '../CardDesign/Box.css';
import { Card } from "react-bootstrap";
import React from "react";
import Pagination from '../Pagination/Pagination';
import '../Pagination/Pagination.css';

class Search extends Component {

	constructor(props) {
		super(props);

		this.state = {
			query: '',
			results: {},
			loading: false,
			message: '',
			currentPageResults: [],
    		currentPage: null,
    		totalPages: null,
			renderRequired : 0,
			newObject : false

		};
	}


	onPageChanged = data => {
		const { results } = this.state;
		let tempArr = Array.from(results);
		const { currentPage, totalPages, pageLimit } = data;
	
		const offset = (currentPage - 1) * pageLimit;
		const currentPageResults = tempArr.slice(offset, offset + pageLimit);       	
		this.setState({ currentPage, currentPageResults, totalPages});
		
	};


	fetchSearchResults = (query) => {
		const searchUrl = `http://localhost:8000/api/getdata/`+query;
		axios.get(searchUrl)
			.then(res => {
				
				const totalPages = Math.ceil(res.data.length / 20);
    			const currentPage = Math.max(0, Math.min(1, totalPages)); 
    		    let tempArr = Array.from(res.data);
				const offset = (currentPage - 1) * 20;
				const currentPageResults = tempArr.slice(offset, offset + 20);


				this.setState({
					results: res.data,
					loading: false,
					currentPage : currentPage,
					currentPageResults : currentPageResults,
					totalPages : totalPages
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
		console.log(this.state.newObject,this.state.renderRequired)
		const {
			results,
			currentPageResults,
			currentPage,
			totalPages,
			renderRequired,
			newObject
		  } = this.state;
		  let tempRes = Array.from(results);
		  const totalRecords = tempRes.length;
		  if ( totalRecords === 0 ) return <h2> </h2>;
          //console.log(results,currentPageResults,currentPage,totalPages)	  
		  const headerClass = [
			"text-dark py-2 pr-4 m-0",
			currentPage ? "border-gray border-right" : ""
		  ]
			.join(" ")
			.trim();

			
	  const renderCard = (card, index) => {
		  return (
			<Card style={{ width: "18rem" }} key={index} className="box">
			<Demo dataToPass = {card}  />
			</Card>
		  );
		};

		  return (

			<div className="container mb-5">
			  <div className="row d-flex flex-row py-5">
				<div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
				  <div className="d-flex flex-row align-items-center">
					<h2 className={headerClass}>
					  <strong className="text-secondary">{totalRecords}</strong>{" "}
					  Results
					</h2>
					{currentPage && (
					  <span className="current-page d-inline-block h-100 pl-4 text-secondary">
						Page <span className="font-weight-bold">{currentPage}</span> /{" "}
						<span className="font-weight-bold">{totalPages}</span>
					  </span>
					)}
				  </div>
				  <div className="d-flex flex-row py-4 align-items-center">
				  <Pagination
				newObject={newObject}  
				renderAgain={renderRequired}  
				totalRecords={totalRecords}
				pageLimit={20}
				pageNeighbours={1}
				onPageChanged={this.onPageChanged}
			  />
				  </div>
				</div>
				
			  </div>
			  <div className="grid">{currentPageResults.map(renderCard)}</div>
			</div>
			
		  );
		



	  // let results = Array.from(this.state.results);
	  // results = results.slice(1,5);
	  // console.log(results);

	  //return <DemoUsinGBootStrapGrid dataToPass = {results} />

	  //return <div className="grid">{results.map(renderCard)}</div>;

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
			<div><br></br></div>
			<div class="grid-container">
				<div class="healthScrollLogo">
					<img class="logo-style" src ="http://localhost:8000/api/image_retriever/HealthScroll.png"></img>
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
							<td><img class="img-style" src="http://localhost:8000/api/image_retriever/pharmeasy.png"></img></td>
							<td><img class="img-style" src="http://localhost:8000/api/image_retriever/1mg.png"></img></td>
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