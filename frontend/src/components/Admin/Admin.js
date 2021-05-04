import React from 'react';
import axios from 'axios';
import {Button} from "react-bootstrap";
class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
     blogs : []      
    };
}


ChangeStatusApprove(object){
    console.log(object);
     var link = 'http://localhost:8000/api/' + 'blog_status_update/' + String(object._id)+ '/' + 'approved';   
    axios.post(link).then(res=>{
        console.log("Succesfully Updated Status to approved ");
        
        
        axios.get('http://localhost:8000/api/blog_retrieval/pending_for_review').then(res=>{
            //console.log(res.data);
            this.setState({blogs:res.data})
        })
    
    
    })
   };
ChangeStatusReject(object){
    console.log(object);
     var link = 'http://localhost:8000/api/' + 'blog_status_update/' + String(object._id)+ '/' + 'rejected';   
    axios.post(link).then(res=>{
        console.log("Succesfully Updated Status to Rejected");
    })
    axios.get('http://localhost:8000/api/blog_retrieval/pending_for_review').then(res=>{
        //console.log(res.data);
        this.setState({blogs:res.data})
    })

};

   
componentDidMount(){

axios.get('http://localhost:8000/api/blog_retrieval/pending_for_review').then(res=>{
console.log(res.data);
var output = [];
for (var i =0 ;i <res.data.length;i++){
 if(res.data[0].status == "pending_for_review")
 {
     output.push(res.data[i])
 }
}


this.setState({blogs: output})



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
           
          <div className="container">
              <div className="col-sm-6"><Button style={{width:"80px"}}variant="success" onClick={() => this.ChangeStatusApprove(card)} > Approve</Button></div>          
              <div className="col-sm-6"><Button style={{width:"80px"}}variant="danger"onClick={() => this.ChangeStatusReject(card)} > Reject</Button></div>
             <br></br><br></br>          
        </div>

        <div class="card-footer" style={{backgroundColor:'#282A2B'}}>
          <small class="text-muted" style={{color:'white'}}>By {card.blog_to_post.author} &nbsp; &nbsp; Last Updated {card.blog_to_post.date}  &nbsp; &nbsp; &nbsp; &nbsp; 
          
          </small>
        </div>

        
      </div>
  
    );
    };





  return (
    <div className="container" >
      <div className="col-lg-6" >
      
       <div style={{margin:"0 auto",  width:"575px",height:"600px", padding:"20px",
       background:"#f9f9f9",
        marginTop:"10px"}} >
        
 


      </div>
      </div>

      
      <div className="col-md-6 " style={{marginTop:"10px"}}>
    
		    {this.state.blogs.map(renderCard)}
	 
 </div>
    </div>

  );
}
}
export default Admin;
