import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Card= ({img,title,shortcontent,auther,date})=>{
  return <div className=" blog-card container-fluid mt-3">
      <a  href="" >
      <h2>{title}</h2>
      <img className="img-fluid" src={img} />
      <p>{shortcontent}</p>
      <div className="d-flex" style={{justifyContent:'space-between'}}>
      <p>{date}</p>
      <p>{auther}</p>
      </div>

      </a>
  </div>
}
const HealthBlog = () => {
  const [editorState, seteditorState] = React.useState();
  const [blogs,setblogs]=React.useState([{
    title:"Blog1" ,date:"3/25/2021"  ,auther:"user1", shortcontent:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the" ,img:"https://smmagencepro.com/wp-content/uploads/2020/02/How-blogs-changed-the-world-1024x585.jpg"
  },
  {
    title:"Blog1" ,date:"3/25/2021"  ,auther:"user1", shortcontent:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the" ,img:"https://smmagencepro.com/wp-content/uploads/2020/02/How-blogs-changed-the-world-1024x585.jpg"
  },{
    title:"Blog1" ,date:"3/25/2021"  ,auther:"user1", shortcontent:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the" ,img:"https://smmagencepro.com/wp-content/uploads/2020/02/How-blogs-changed-the-world-1024x585.jpg"
  }]);
  return (
    <div
      className="container"
    >
      <div className="col-md-6">
        <input className="form-control mt-4" placeholder="Title"/>
        <input className="form-control mt-4 mb-4" placeholder="Author"/>
        <input className="form-control mt-4 mb-4" placeholder="Short Content"/>
        <input className="form-control mt-4 mb-4" type="file" />
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={seteditorState}
        />
        <button className="btn btn-primary mt-5 float-right">Submit</button>
      </div>
      <div className="col-md-6 "> 
        {blogs.map(x=>        <Card img={x.img} shortcontent={x.shortcontent} title={x.title} date={x.date} auther={x.auther} />)}
      </div>
    </div>
  );
};

export default HealthBlog;