import React from 'react';
import axios from 'axios';
import { Editor } from "react-draft-wysiwyg";
import {EditorState} from "draft-js";
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class BlogCreation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {},
      errors: {},
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
      const author = this.props.user_details.firstName + " "+ this.props.user_details.lastName;
      const email = this.props.user_details.email;
      blog_to_post["date"] = new Date();
      blog_to_post["author"]= author;
      blog_to_post["email"] = email;
      console.log(blog_to_post);
      axios.post('http://localhost:8000/api/blog_insertion', { blog_to_post })
      .then(res => {
        
        let input = {};
        input["title"] = "";
        input["short_description"] = "";
        input["file_upload"] = "";
        input["blog_content"] ="";
        
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

    if (!input["short_description"]) {
      isValid = false;
      errors["short_description"] = "Please enter short description for your blog.";
    }

    this.setState({
      errors: errors
    });

    return isValid;

  }
  
render(){

  return (
    <div className="container" >
      <div className="col-lg-6" >
      
       <div style={{margin:"0 auto",  width:"500px", padding:"20px",
       background:"#f9f9f9",
        border:"2px solid #333",
        marginTop:"20px",marginLeft:'350px'}} >
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
    </div>

  );
}
}
export default BlogCreation;