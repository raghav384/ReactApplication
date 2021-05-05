import React, { Component } from 'react';
import Lottie from "react-lottie";
import Animation from '../../animations/9513-preloader.json'
import './redirect.css';
import axios from 'axios';

class Redirect extends Component {
    defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Animation,

    rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
    

},
};
   
componentDidMount() {
    
    const { history } = this.props;
    console.log(this.props.location.sampleParam);

    setTimeout(() => {
    window.location.replace(this.props.location.redirectUrl)
    }, this.props.location.redirectTime);
    

    axios.post('http://localhost:8000/api/redirection_count_increase').then(res=>{
       
    })
    
    

}

render() {
    return (
        <div className="con-flex">

        <div className="d-flex-main d-col">
        <div className="d-flex-main d-row">
        <img src="http://localhost:8000/api/image_retriever/HealthScroll.png" className="w-img"/>
        <div className="w-img">
        <Lottie options={this.defaultOptions}/>
        </div>
        <img src={this.props.location.destination_image_href} className="w-img"/>
        </div>
        <h2 className="f-head">You found a great deal on <span>HealthScroll</span> we will be redirecting to the following
        website <span>{this.props.location.destination_name}</span></h2>
        </div>
        </div>
        );
        };
        }

export default Redirect;