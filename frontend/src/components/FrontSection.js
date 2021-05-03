import React from 'react';
import '../App.css';
import './FrontSection.css';
import  video from "./video/video1.mp4"





function FrontSection() {
  return (
    <div className='front-container'>

        <video> autoPlay loop muted<source src= {video} type='video/mp4'/>
        </video>
<h1>ADVENTURE AWAITS</h1>
      <p>What are you waiting for?</p>
      
      </div>

  );
}
export default FrontSection;