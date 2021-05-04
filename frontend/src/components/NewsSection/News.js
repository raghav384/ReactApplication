import './News.css';
import axios from 'axios';
import {Component} from 'react'
import React from "react";
class News extends Component {

	constructor(props) {
		super(props);
		this.state = {
			query: '',
			results: {}
		};
	}

   componentDidMount(){
	   this.fetchSearchResults('saurav_tech');
   }

	fetchSearchResults = (query) => {
		const searchUrl = `http://localhost:8000/api/getNewsData/`+query;
		axios.get(searchUrl)
			.then(res => {
				this.setState({
					results: res.data
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

	
		


render() {
console.log(this.state.results);

let tempRes = Array.from(this.state.results);
const styles = {
	card: {
	  backgroundColor: '#B7E0F2',
	  borderRadius: 55,
	},
	cardImage: {
	  height: '20vh'
	}
  }
const renderCard = (card, index) => {
	return (
		<div class="card" style={{width: '900px'}}>
			<div class="card-horizontal" >
				<div class="img-square-wrapper" style={{width: '300px',height:'150px'}}>
					<img  src={card.urlToImage}  style={{width:'100%',height:'100%'}}alt="Not found"/>
				</div>
				<div class="card-body" style={{width: '600px', height: '150px'}}>
					<h4 class="card-title">{card.title}</h4>
					<p class="card-text" style={{fontSize:'11px'}}>{card.content}</p>
					<p class="card-text"style={{fontSize:'11px'}}>{card.description}</p>
				</div>
			</div>
			
			<div class="card-footer" style={{backgroundColor:'#282A2B'}}>
				<small class="text-muted" style={{color:'white'}}>By {card.author} &nbsp; &nbsp; Last Updated {card.publishedAt}  &nbsp; &nbsp; &nbsp; &nbsp; 
				<a class="card-text" href={card.url} >For More Info</a>
				</small>
			</div>
		</div>

	);
  };

	return (
	  <div class="grid-1">
		{tempRes.map(renderCard)}
	  </div>
	);

};
}

export default News;