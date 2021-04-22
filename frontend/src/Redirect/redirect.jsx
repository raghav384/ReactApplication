import React from 'react';
import Lottie from "react-lottie";
import Animation from '../../animations/9513-preloader.json'
import {useHistory, useLocation} from 'react-router-dom'
import './redirect.css';

export default () => {
    const history=useHistory();
    const location=useLocation();

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: Animation,

      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
       
    },
    };
    React.useEffect(()=>{

        if(location&&location.state&&location.state.redirectUrl)
        setTimeout(() => {
                window.location.replace(location&&location.state&&location.state.redirectUrl?location.state.redirectUrl:"")
            }, location&&location.state&&location.state.redirectTime?location.state.redirectTime:0);
    },[])
    return  <div className="con-flex">
        <div className="d-flex-main d-col">
            <div className="d-flex-main d-row">
          <img src={location&&location.state&&location.state.fromimg?location.state.fromimg:undefined} className="w-img"/>
            <div className="w-img">
            <Lottie options={defaultOptions} />
            </div>
            <img src={location&&location.state&&location.state.toimg?location.state.toimg:undefined} className="w-img"/>
            </div>
        <h2 className="f-head">You found a great deal on <span>{location&&location.state&&location.state.from?location.state.from:undefined}</span> we will be redirecting to the following websites <span>{location&&location.state&&location.state.to?location.state.to:undefined}</span>  </h2>
        </div>
    </div>
}