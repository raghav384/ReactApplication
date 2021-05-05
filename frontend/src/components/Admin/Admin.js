import React from 'react';
import axios from 'axios';
import {Button,Row,Col} from "react-bootstrap";
import './Admin.css';
class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
     blogs : [],
     vendor_count : 0,
     subscriber_count : 0,
     redirection_count : 0,
     total_users_count : 0,
     total_blog_pending : 0,
     total_blog_approved : 0,
     total_blog_rejected : 0,
     total_news : 0
    };
}


ChangeStatusApprove(object){
    console.log(object);
     var link = 'http://localhost:8000/api/' + 'blog_status_update/' + String(object._id)+ '/' + 'approved';   
    axios.post(link).then(res=>{
        console.log("Succesfully Updated Status to approved ");
        
        
        axios.get('http://localhost:8000/api/blog_retrieval/pending_for_review').then(res=>{
            //console.log(res.data);
            this.setState({blogs:res.data,total_blog_approved:this.state.total_blog_approved+1,total_blog_pending:this.state.total_blog_pending-1})
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
        this.setState({blogs:res.data,total_blog_rejected: this.state.total_blog_rejected+1,total_blog_pending:this.state.total_blog_pending-1})
    })

};

refreshContent = ()=> {
  console.log("reshreshssh")
  var rejected_Count =0;
  var approved_Count =0;
  var pending_Count =0;
  var blog_data = [];
  var total_news = 0;
  var redirection =0;
  var subscriber = 0;
  var users = 0;
  var vendors = 0;
  axios.get('http://localhost:8000/api/blog_retrieval/pending_for_review').then(res=>{
  pending_Count = res.data.length;
  blog_data = res.data;
  
  axios.get('http://localhost:8000/api/medicine_vendor_count').then(res=>{
  vendors = res.data
  
  axios.get('http://localhost:8000/api/user_count').then(res=>{
  users = res.data
  
  axios.get('http://localhost:8000/api/subscriber_count').then(res=>{
  subscriber = res.data
  
  axios.get('http://localhost:8000/api/blog_count/approved').then(res=>{
  approved_Count = res.data
  
  axios.get('http://localhost:8000/api/blog_count/rejected').then(res=>{
  rejected_Count = res.data
  axios.get('http://localhost:8000/api/getNewsData/saurav_tech').then(res=>{
  
  total_news = res.data.length
  
  axios.get('http://localhost:8000/api/redirection').then(res=>{
  redirection = res.data[0].redirection_count
  this.setState({blogs: blog_data,vendor_count : vendors,subscriber_count : subscriber,redirection_count : redirection,total_users_count : users,
      total_blog_pending : pending_Count,total_blog_approved : approved_Count,total_blog_rejected : rejected_Count,total_news : total_news})
    
  
  })
  
  
  
  
  })
  
  
  })
  
  
  })
  
  })
  
  })
  
  })
  
  })
  
  

}
   
componentDidMount(){
var rejected_Count =0;
var approved_Count =0;
var pending_Count =0;
var blog_data = [];
var total_news = 0;
var redirection =0;
var subscriber = 0;
var users = 0;
var vendors = 0;
axios.get('http://localhost:8000/api/blog_retrieval/pending_for_review').then(res=>{
pending_Count = res.data.length;
blog_data = res.data;

axios.get('http://localhost:8000/api/medicine_vendor_count').then(res=>{
vendors = res.data

axios.get('http://localhost:8000/api/user_count').then(res=>{
users = res.data

axios.get('http://localhost:8000/api/subscriber_count').then(res=>{
subscriber = res.data

axios.get('http://localhost:8000/api/blog_count/approved').then(res=>{
approved_Count = res.data

axios.get('http://localhost:8000/api/blog_count/rejected').then(res=>{
rejected_Count = res.data
axios.get('http://localhost:8000/api/getNewsData/saurav_tech').then(res=>{

total_news = res.data.length

axios.get('http://localhost:8000/api/redirection').then(res=>{
redirection = res.data[0].redirection_count
this.setState({blogs: blog_data,vendor_count : vendors,subscriber_count : subscriber,redirection_count : redirection,total_users_count : users,
    total_blog_pending : pending_Count,total_blog_approved : approved_Count,total_blog_rejected : rejected_Count,total_news : total_news})
  

})




})


})


})

})

})

})

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
      
       <div style={{margin:"0 auto",  width:"575px",height:"600px", padding:"20px",marginTop:"10px"}} >

        <div className="row" style={{height:"300px",backgroundColor:"whitesmoke"}}>
        <div className="row"  >
        <div className="col-md-10">
        <h2 style={{textAlign:"center",marginLeft:"200px",textDecoration:"underline"}}> Admin DashBoard </h2>
        
        </div>
       <div className="col-md-2">
         <Button variant="info" style={{width:"70px",height:"20px",marginTop:"4px",marginLeft:"40px",color:"black"}} onClick={this.refreshContent}>Refresh </Button>               
        </div>
        
          </div> 
         
<div class="grid-container-admin" >
         
  <div class="grid-item-admin">
    
   <p >Number of vendors</p>
   <p>{this.state.vendor_count}</p> 
  </div>
  <div class="grid-item-admin">
   
   <p>Number of Redirections</p>
   <p>{this.state.redirection_count}</p> 
  </div>
  <div class="grid-item-admin">
    <p>Total Users</p>
    <p>{this.state.total_users_count}</p>
  </div>  
  <div class="grid-item-admin">
  Blogs Approved : {this.state.total_blog_approved}<br></br>
  Blogs Rejected :&nbsp;&nbsp; {this.state.total_blog_rejected}<br></br>
  Blogs Pending  : &nbsp;&nbsp; {this.state.total_blog_pending}
   
  </div>
  <div class="grid-item-admin">
    <p>Current Number of News</p>
    <p>{this.state.total_news}</p>
  </div>
  <div class="grid-item-admin">
    <p>Subscriber Count</p>
    <p>{this.state.subscriber_count}</p>
  </div>  
  </div>
        </div>
        <br></br> 
        <div className="row" style={{height:"250px",backgroundColor:"whitesmoke"}}>
            
            <h2 style={{textAlign:"center",marginLeft:"150px",marginTop:"10px",textDecoration:"underline"}}> Vendor API MANAGEMENT </h2>
            <br></br>
            <form style={{marginRight:"40px",marginLeft:"100px",marginTop:"10px",fontSize:"10px"}}>
       
        <div className="form-group">
         <label for="company_name">Company Name: </label> 
            <input className="form-control" 
              type="text"
              name="company_name"
              placeholder="Enter Name"
              id="company_name" style={{width:"340px"}}/></div>    
      <div className="form-group">
            <label for="api_description">API Description</label>
            <input className="form-control" 
              type="text"
              name="api_description"
              placeholder="Enter API Description"
              id="api_description" /></div> 
          <div className="form-group">
            <label for="api">API Details</label>
              <input className="form-control" 
                type="text"
                name="api"
                placeholder="Enter the API"
                id="api" /> 
          </div>
        <input type="submit" value="Submit" className="btn btn-success"></input>
        </form>
            

            
        </div>        
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
