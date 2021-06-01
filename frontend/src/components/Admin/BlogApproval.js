import React from 'react';
import axios from 'axios';
import { Button, Row, Col, ButtonGroup } from "react-bootstrap";
class BlogApproval extends React.Component {
    constructor() {
        super();
        this.state = {
            input: {},
            blogs: [],
            showData: false,
            current_id: '',
            show_feedback: false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    closeFeedback(){
        this.setState({
            show_feedback:false
        })
    }

    submitFeedback(){
         
        console.log(this.state.input,"grhfxghjhghftrhghcyhg")
        const insert_data = this.state.input
        axios.post('http://localhost:8000/api/blog_insert_feedback', {insert_data,_id:String(this.state.current_id) })
        .then(res => {        
        
            axios.get('http://localhost:8000/api/blog_retrieval/pending_for_review').then(res => {
                this.setState({
                    blogs:res.data,
                    input: {},
                    showData: false,
                    current_id: '',
                    show_feedback: false
                })
            })
        })
    
    }


    
    
      
 


    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value; 
        this.setState({
          input
        });
    }

    ChangeStatusApprove(object) {
        console.log(object);
        var link = 'http://localhost:8000/api/' + 'blog_status_update/' + String(this.state.current_id) + '/' + 'approved';
        axios.post(link).then(res => {
            console.log("Succesfully Updated Status to approved ");


            axios.get('http://localhost:8000/api/blog_retrieval/pending_for_review').then(res => {
                //console.log(res.data);
                this.setState({
                    blogs: res.data,
                    input: {},
                    showData: false,
                    current_id: '',
                    show_feedback: false
                })
            })


        })
    };
    ChangeStatusReject(object) {
        console.log(object);
        var link = 'http://localhost:8000/api/' + 'blog_status_update/' + String(this.state.current_id) + '/' + 'rejected';
        axios.post(link).then(res => {
            console.log("Succesfully Updated Status to Rejected");
        })
        axios.get('http://localhost:8000/api/blog_retrieval/pending_for_review').then(res => {
            //console.log(res.data);
            this.setState({
                blogs: res.data,
                input: {},
                showData: false,
                current_id: '',
                show_feedback: false
            })
        })
    };

    ViewCardData(object) {
        console.log(object)
        this.setState({
            showData: true,
            input: object.blog_to_post,
            current_id: object._id
        })

    }

    showFeedback(){
        this.setState({
            show_feedback:true
        })
    }


    componentDidMount() {

        axios.get('http://localhost:8000/api/blog_retrieval/pending_for_review').then(res => {
            console.log(res.data);
            this.setState({ blogs: res.data })
        })
    }


    render() {
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
                <div class="card" style={{ width: '500px' }}>
                    <div class="card-body" style={{ width: '500px', height: '50px' }}>
                        <h4 class="card-title">{card.blog_to_post.title}</h4>
                    </div>
                    <div className="container">
                        <div className="col-sm-6"><Button style={{ width: "80px" }} variant="success" onClick={() => this.ViewCardData(card)} >View</Button></div>
                        <br></br><br></br>
                    </div>
                </div>

            );
        };



        return (
            <div className="container" style={{ height: '500px' }}>
      
                <div className="col-lg-6 " style={{ marginTop: "40px" }}>
                {this.state.blogs.length>0? 
                <Button size="lg" variant="info" style={{marginLeft:'85px'}} disabled>Pending Blogs for Approval</Button>
                :null}
                <br></br>
                
                    {this.state.blogs.map(renderCard)}

                </div>


                {this.state.showData?
                <div className="col-md-6" >
                            <div style={{
                            margin: "0 auto", width: "450px", padding: "20px",
                            background: "#f9f9f9",
                            border: "2px solid #333",
                            marginTop: "67px"
                        }} >
                            <form>
                                <br></br>
                                <br></br>
                                <div className="form-group">
                                    <label for="title"> Title: </label>
                                    <input className="form-control"
                                        type="text"
                                        name="title"
                                        value={this.state.input.title}
                                        disabled
                                    />
                                    </div>
                                    <div className="form-group">
                                        <label for="short_description">Short Description:</label>
                                        <input className="form-control"
                                            type="text"
                                            name="short_description"
                                            value={this.state.input.short_description}
                                            disabled
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label for="description">Description:</label>
                                        <br></br>
                                        <textarea rows="4" cols="77"
                                            type="text"
                                            name="description"
                                            value={this.state.input.blog_content}
                                            disabled
                                        />
                                    </div>

                                    <div className="container">
                                        <div className="col-sm-4"><Button style={{ width: "80px" }} variant="success" onClick={() => this.ChangeStatusApprove()} > Approve</Button></div>
                                        <div className="col-sm-4"><Button style={{ width: "80px" }} variant="danger" onClick={() => this.ChangeStatusReject()} > Reject</Button></div>
                                        <div className="col-sm-4"><Button style={{ width: "100px" }} variant="info" onClick={() => this.showFeedback()} >Add Comments</Button></div>


                                        <br></br><br></br>
                                        <br></br>
                                    </div>

                                    {this.state.show_feedback?
                                    <div style={{backgroundColor:'#DEDEDE',height:'130px',padding:'5px'}}>
                                 
                                  <button type="button" onClick={() => this.closeFeedback()} class="close" aria-label="Close">
  <span style={{fontSize:'20px'}} aria-hidden="true">&times;</span>
</button>                                           

<br></br>
                                    <textarea rows="4" cols="73"
                                     name="feedback"
                                     value={this.state.input.feedback}
                                     onChange={this.handleChange}   
                                     placeholder="Enter Feedback Message"

                                    />
                                    <div className="col-sm-4"><Button style={{ width: "100px",marginLeft:'130px' }} variant="info" onClick={() => this.submitFeedback()} >Submit</Button></div>
                                  
<br></br><br></br>
                                </div>
                                :null}

                                       

        </form>
        </div>
        </div>
        :null}
                                

                        </div>
   
      
    
            
        );
    }
}
export default BlogApproval;