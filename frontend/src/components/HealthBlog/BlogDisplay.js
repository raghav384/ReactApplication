import React from 'react';
import axios from 'axios';

class BlogDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      blogs: [],
    };
  }

componentDidMount(){

axios.get('http://localhost:8000/api/blog_retrieval/approved').then(res=>{
console.log(res.data);
this.setState({blogs:res.data})

})
}

render(){
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
      <div class="card" style={{width: '500px'}}>  
          <div class="card-body" style={{width: '500px', height: '100px'}}>
            <h4 class="card-title">{card.blog_to_post.title}</h4>
            <p class="card-text" style={{fontSize:'11px'}}>{card.blog_to_post.short_description}</p>
            <p class="card-text"style={{fontSize:'11px'}}>{card.blog_to_post.blog_content}</p>
          </div>
      
        <div class="card-footer" style={{backgroundColor:'#282A2B'}}>
          <small class="text-muted" style={{color:'white'}}>By {card.blog_to_post.author} &nbsp; &nbsp; Last Updated {card.blog_to_post.date}  &nbsp; &nbsp; &nbsp; &nbsp; 
          
          </small>
        </div>
      </div>
  
    );
    };

  return (
    <div className="container">
        <div className="col-md-6 " style={{marginTop:"20px",marginBottom:"100px"}}>
    
		    {this.state.blogs.map(renderCard)}
        <br></br><br></br><br></br><br></br><br></br>
	 
 </div>
    </div>

  );
}
}
export default BlogDisplay;