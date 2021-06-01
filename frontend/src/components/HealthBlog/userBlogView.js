import React from 'react';
import axios from 'axios';
import { Editor } from "react-draft-wysiwyg";
import {EditorState} from "draft-js";
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Button,Row,Col,ButtonGroup} from "react-bootstrap";
class userBlogView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {},
      errors: {},
      blogs: [],
      editorState: EditorState.createEmpty(),
      showData : false,
      status : '',
      currentStatus :'Approved Blogs',
      current_id : ''
    };
  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    let input = this.state.input;
    let errors=this.state.errors;
    input[event.target.name] = event.target.value;
    errors[event.target.name]="";
  
    this.setState({
      input,errors
    });
  }

handleSubmit(event) {
  event.preventDefault();
  if(this.validate()){
      
      const blog_to_post = this.state.input;
      console.log(blog_to_post);
      blog_to_post["date"] = new Date();
      delete blog_to_post.feedback;
      axios.post('http://localhost:8000/api/blog_feedback_update', { blog_to_post,_id:String(this.state.current_id) })
      .then(res => {
        console.log('res');
        console.log(res);
        console.log(res.data);
        
        let email = this.props.user_details.email;
        let approved_url = "http://localhost:8000/api/blog_retrieval_by_email/"+ email+"/approved";        
        axios.get(approved_url).then(res=>{
        //console.log(res.data);
        this.setState({blogs:res.data,
            input: {},
            editorState: EditorState.createEmpty(),
            showData : false,
            status : '',
            currentStatus:'Approved Blogs'
        })
        
        alert('Blog Submitted successfully.');

      })
  })
}
}


ViewCardData(object){
    console.log(object)
this.setState({
    showData:true,
    input : object.blog_to_post,
    status:object.status,
    editorState : EditorState.createWithText(object.blog_to_post.blog_content),
    current_id:object._id
})

}



seteditorState = (editorState) => {
  this.setState({
    editorState,
  });
  let input = this.state.input;
  input["blog_content"] = this.state.editorState.getCurrentContent().getPlainText();
  console.log(input["blog_content"] );
  
};
  validate(){
    let input = this.state.input;
    let errors ={};
    let isValid = true;

    if (!input["title"]) {
      isValid = false;
      errors["title"] = "Please enter your title.";
    }

    if (!input["author"]) {
      isValid = false;
      errors["author"] = "Please enter your full name.";
    }

    if (!input["short_description"]) {
      isValid = false;
      errors["short_description"] = "Please enter short description for your blog.";
    }

    this.setState({
      errors: errors
    });

    return isValid;

  }

componentDidMount(){

let email = this.props.user_details.email;
let approved_url = "http://localhost:8000/api/blog_retrieval_by_email/"+ email+"/approved";     
console.log(approved_url);
axios.get(approved_url).then(res=>{
console.log(res.data);
this.setState({blogs:res.data})

})
}


getApprove = () =>{
        let email = this.props.user_details.email;
        let approved_url = "http://localhost:8000/api/blog_retrieval_by_email/"+ email+"/approved";     
        axios.get(approved_url).then(res=>{
        console.log(res.data);
        this.setState({blogs:res.data,
            input: {},
            editorState: EditorState.createEmpty(),
            showData : false,
            status : '',
            currentStatus:'Approved Blogs',
            current_id: '' 
        })
        })
}
getRejected = () =>{
    let email = this.props.user_details.email;
    let rejected_url = "http://localhost:8000/api/blog_retrieval_by_email/"+ email+"/rejected";     
    axios.get(rejected_url).then(res=>{
        console.log(res.data);
        this.setState({blogs:res.data,
            input: {},
            editorState: EditorState.createEmpty(),
            showData : false,
            status : '',
            currentStatus:'Rejected Blogs',
            current_id: ''})
        })
}
getPending = () =>{
    let email = this.props.user_details.email;
    let pendingreview_url = "http://localhost:8000/api/blog_retrieval_by_email/"+ email +"/pending_for_review"; 
    console.log(pendingreview_url)    
    axios.get(pendingreview_url).then(res=>{
        console.log(res.data);
        this.setState({blogs:res.data,
            input: {},
            editorState: EditorState.createEmpty(),
            showData : false,
            status : '',
            currentStatus:'Pending Blogs',
            current_id: ''})
        })
}
getFeedback = () =>{
    let email = this.props.user_details.email;
    let feedbackreceived_url = "http://localhost:8000/api/blog_retrieval_by_email/"+ email+"/feedback_received";     
    axios.get(feedbackreceived_url).then(res=>{
        console.log(res.data);
        this.setState({blogs:res.data,
            input: {},
            editorState: EditorState.createEmpty(),
            showData : false,
            status : '',
            currentStatus:'Feedback Added Blogs',
            current_id: ''})
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
          <div class="card-body" style={{width: '500px', height: '50px'}}>
            <h4 class="card-title">{card.blog_to_post.title}</h4>
               </div>
          <div className="container">
              <div className="col-sm-6"><Button style={{width:"80px"}}variant="success" onClick={() => this.ViewCardData(card)} >View</Button></div>       
             <br></br><br></br>          
        </div>      
      </div>
  
    );
    };



  return (
    <div className="container" style={{height:'500px'}}>
        
        <ButtonGroup size="lg" aria-label="Basic example"  style={{marginTop:"20px",marginLeft:"400px"}} >
    <Button variant="dark" onClick={this.getApprove}>Approved</Button>
    <Button variant="dark" onClick={this.getRejected}>Rejected</Button>
    <Button variant="dark" onClick={this.getPending}>Pending</Button>
    <Button variant="dark" onClick={this.getFeedback}>Admin Feedback</Button>
    </ButtonGroup>

      <div className="col-lg-6 " style={{marginTop:"40px"}}>
      {this.state.blogs.length>0?
      <Button size="lg" variant="info" style={{marginLeft:'85px'}}>{this.state.currentStatus} </Button>
       :null}
    {this.state.blogs.map(renderCard)}

</div>
      <div className="col-md-6" >
      {this.state.showData?
       <div style={{margin:"0 auto",  width:"400px", padding:"20px",
       background:"#f9f9f9",
        border:"2px solid #333",
        marginTop:"67px"}} >
        <form onSubmit={this.handleSubmit}>
        <br></br>
        <br></br>
        <div className="form-group">
         <label for="title"> Title: </label> 
            <input className="form-control" 
              type="text"
              name="title"
              value={this.state.input.title}
              onChange={this.handleChange}
              placeholder="Enter title"
              id="title" />

              <div className="text-danger">{this.state.errors.title}</div></div>    
      
      
          <div className="form-group">
            <label for="short_description">Short Description:</label>
              <input className="form-control" 
                type="text"
                name="short_description"
                value={this.state.input.short_description}
                onChange={this.handleChange}
                placeholder="Enter your blog's short description"
                id="short_description" /> 
                <div className="text-danger">{this.state.errors.short_description}</div>
          </div>
          {this.state.status=="feedback_received"?
          <div className="form-group">
            <label for="Feedback">Feedback:</label>
              <input className="form-control" 
                type="text"
                name="Feedback"
                value={this.state.input.feedback}
                onChange={this.handleChange}
                disabled
                id="Feedback" /> 
            </div>  
            :null}
        <Editor
          editorState={this.state.editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.seteditorState}
        />
        
        <br></br><br></br><br></br><br></br><br></br>
        {this.state.status=="feedback_received"?
        <input type="submit" value="Submit" className="btn btn-success"></input>:null}
        </form>
        </div>
:null}

<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        </div>
   
      
    </div>

  );
}
}
export default userBlogView;