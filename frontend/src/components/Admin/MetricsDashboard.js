import React from 'react';
import axios from 'axios';
import { Button, Row, Col } from "react-bootstrap";
import './Admin.css';
class MetricDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            vendor_count: 0,
            subscriber_count: 0,
            redirection_count: 0,
            total_users_count: 0,
            total_blog_pending: 0,
            total_blog_approved: 0,
            total_blog_rejected: 0,
            total_news: 0
        };

    }

    refreshContent = () => {
        console.log("reshreshssh")
        var rejected_Count = 0;
        var approved_Count = 0;
        var pending_Count = 0;
        var blog_data = [];
        var total_news = 0;
        var redirection = 0;
        var subscriber = 0;
        var users = 0;
        var vendors = 0;
        axios.get('http://localhost:8000/api/blog_retrieval/pending_for_review').then(res => {
            pending_Count = res.data.length;
            blog_data = res.data;

            axios.get('http://localhost:8000/api/medicine_vendor_count').then(res => {
                vendors = res.data

                axios.get('http://localhost:8000/api/user_count').then(res => {
                    users = res.data

                    axios.get('http://localhost:8000/api/subscriber_count').then(res => {
                        subscriber = res.data

                        axios.get('http://localhost:8000/api/blog_count/approved').then(res => {
                            approved_Count = res.data

                            axios.get('http://localhost:8000/api/blog_count/rejected').then(res => {
                                rejected_Count = res.data
                                axios.get('http://localhost:8000/api/getNewsData/saurav_tech').then(res => {

                                    total_news = res.data.length

                                    axios.get('http://localhost:8000/api/redirection').then(res => {
                                        redirection = res.data[0].redirection_count
                                        this.setState({
                                            blogs: blog_data, vendor_count: vendors, subscriber_count: subscriber, redirection_count: redirection, total_users_count: users,
                                            total_blog_pending: pending_Count, total_blog_approved: approved_Count, total_blog_rejected: rejected_Count, total_news: total_news
                                        })


                                    })




                                })


                            })


                        })

                    })

                })

            })

        })



    }

    componentDidMount() {
        var rejected_Count = 0;
        var approved_Count = 0;
        var pending_Count = 0;
        var total_news = 0;
        var redirection = 0;
        var subscriber = 0;
        var users = 0;
        var vendors = 0;
        axios.get('http://localhost:8000/api/blog_retrieval/pending_for_review').then(res => {
            pending_Count = res.data.length;

            axios.get('http://localhost:8000/api/medicine_vendor_count').then(res => {
                vendors = res.data

                axios.get('http://localhost:8000/api/user_count').then(res => {
                    users = res.data

                    axios.get('http://localhost:8000/api/subscriber_count').then(res => {
                        subscriber = res.data

                        axios.get('http://localhost:8000/api/blog_count/approved').then(res => {
                            approved_Count = res.data

                            axios.get('http://localhost:8000/api/blog_count/rejected').then(res => {
                                rejected_Count = res.data
                                axios.get('http://localhost:8000/api/getNewsData/saurav_tech').then(res => {

                                    total_news = res.data.length

                                    axios.get('http://localhost:8000/api/redirection').then(res => {
                                        redirection = res.data[0].redirection_count
                                        this.setState({
                                            vendor_count: vendors, subscriber_count: subscriber, redirection_count: redirection, total_users_count: users,
                                            total_blog_pending: pending_Count, total_blog_approved: approved_Count, total_blog_rejected: rejected_Count, total_news: total_news
                                        })


                                    })




                                })


                            })


                        })

                    })

                })

            })

        })










    }

    render() {


        return (
            <div className="container" >
                <div className="col-lg-6" >

                    <div style={{ margin: "0 auto", width: "575px", height: "600px", padding: "20px", marginTop: "10px" }} >

                        <div className="row" style={{ height: "300px", backgroundColor: "whitesmoke" }}>
                            <div className="row"  >
                                <div className="col-md-10">
                                    <h2 style={{ textAlign: "center", marginLeft: "200px", textDecoration: "underline" }}> Admin DashBoard </h2>

                                </div>
                                <div className="col-md-2">
                                    <Button variant="info" style={{ width: "70px", height: "20px", marginTop: "4px", marginLeft: "40px", color: "black" }} onClick={this.refreshContent}>Refresh </Button>
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




                    </div>





                </div>



            </div>

        );
    }
}
export default MetricDashboard;
