import React from 'react';
import axios from 'axios';
import { Editor } from "react-draft-wysiwyg";
import {EditorState} from "draft-js";
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class HealthBlog extends React.Component {
  constructor() {
    super();
    this.state = {
      input: {},
      errors: {},
      blogs: [],
      editorState: EditorState.createEmpty()
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
      axios.post('http://localhost:8000/api/blog_insertion', { blog_to_post })
      .then(res => {
        console.log('res');
        console.log(res);
        console.log(res.data);
        
        let input = {};
        input["title"] = "";
        input["author"] = "";
        input["short_description"] = "";
        input["file_upload"] = "";
        input["blog_content"] ="";
        axios.get('http://localhost:8000/api/blog_retrieval/approved').then(res=>{
        //console.log(res.data);
        this.setState({blogs:res.data,input:input, editorState : EditorState.createEmpty()})
        })
        .catch(error=>{
          this.setState({input:input, editorState : EditorState.createEmpty()});
        })
        
        alert('Blog Submitted successfully.');

      })
  }
 

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
  //const [editorState, seteditorState] = React.useState();
  /*const [blogs,setblogs]=React.useState([{
    title:"Blog1" ,date:"3/25/2021"  ,auther:"user1", shortcontent:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the" ,img:"https://smmagencepro.com/wp-content/uploads/2020/02/How-blogs-changed-the-world-1024x585.jpg"},
  {
    title:"Blog1" ,date:"3/25/2021"  ,auther:"user1", shortcontent:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the" ,img:"https://smmagencepro.com/wp-content/uploads/2020/02/How-blogs-changed-the-world-1024x585.jpg"
  },{
    title:"Blog1" ,date:"3/25/2021"  ,auther:"user1", shortcontent:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the" ,img:"https://smmagencepro.com/wp-content/uploads/2020/02/How-blogs-changed-the-world-1024x585.jpg"
  }]);*/
  
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
    <div className="container" >
      <div className="col-lg-6" >
      
       <div style={{margin:"0 auto",  width:"500px", padding:"20px",
       background:"#f9f9f9",
        border:"2px solid #333",
        marginTop:"20px"}} >
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
            <label for="author">Author:</label>
            <input className="form-control" 
              type="text"
              name="author"
              value={this.state.input.author}
              onChange={this.handleChange}
              placeholder="Enter your full name"
              id="author" /> 
              <div className="text-danger">{this.state.errors.author}</div></div>

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
        
        
        <Editor
          editorState={this.state.editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.seteditorState}
        />
        
        <br></br><br></br><br></br><br></br><br></br>
        <input type="submit" value="Submit" className="btn btn-success"></input>
        </form>
        </div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      </div>
      

      
      <div className="col-md-6 " style={{marginTop:"10px"}}>
    
		    {this.state.blogs.map(renderCard)}
	 
 </div>
    </div>

  );
}
}
export default HealthBlog;