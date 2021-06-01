import React from 'react';
import axios from 'axios';
import {Button,Row,Col} from "react-bootstrap";
import './Admin.css';
class VendorAPI extends React.Component {
  constructor() {
    super();
    this.state = {
    };
}

onSubmit(){
  console.log("HelloWorld");
}


render(){
  return (
    <div className="container" >
      <div className="col-lg-6" >
      
       <div style={{margin:"0 auto",  width:"575px",height:"800px", padding:"20px",marginTop:"10px"}} >

       
        <div className="row" style={{height:"500px",backgroundColor:"whitesmoke"}}>
            
            <h2 style={{textAlign:"center",marginLeft:"150px",marginTop:"10px",textDecoration:"underline"}}> Vendor API Management Console </h2>
            <br></br>
            <form style={{marginRight:"40px",marginLeft:"100px",marginTop:"10px",fontSize:"10px"}}>
       
        <div className="form-group">
         <label for="vendor_name">Vendor Name: </label> 
            <input className="form-control" 
              type="text"
              name="vendor_name"
              placeholder="Enter Vendor Name"
              id="vendor_name" style={{width:"340px"}}/></div>    
      <div className="form-group">
            <label for="api_url">API base url</label>
            <input className="form-control" 
              type="text"
              name="api_base_url"
              placeholder="Enter API base url"
              id="api_base_url" /></div> 
          <div className="form-group">
            <label for="product_id_start">Product ID Start</label>
            <input className="form-control" 
              type="text"
              name="product_id_start"
              placeholder="Enter starting value of product id"
              id="product_id_start" /></div> 
          <div className="form-group">
            <label for="product_id_ends">Product ID End</label>
              <input className="form-control" 
                type="text"
                name="product_id_end"
                placeholder="Enter the end value of product id"
                id="product_id_end" /> 
          </div>
        <input type="submit" onClick ={this.onSubmit}  value="Submit" className="btn btn-success"></input>
        </form>            
        </div>        
      </div>
      </div>

      
      
    </div>

  );
}
}
export default VendorAPI;
