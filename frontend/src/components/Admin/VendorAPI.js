import React from 'react';
import axios from 'axios';
import {Button,Row,Col} from "react-bootstrap";
import './Admin.css';
class VendorAPI extends React.Component {
  constructor() {
    super();
    this.state = {
      input: {},
      errors: {}

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
    
    const vendor_api_data = this.state.input;
    vendor_api_data["date"] = new Date();
    
    console.log(vendor_api_data);
    axios.post('http://localhost:8000/api/vendor_details_insertion', { vendor_api_data })
    .then(res => {
      const reset_input = {};
        
      
    this.setState({
    input : reset_input,
    errors: {}
    },()=>{

      console.log("Updation DOne")
    })
    alert('Vendor API Submitted successfully.');


    })
}


}

validate(){
  let input = this.state.input;
  let errors ={};
  let isValid = true;

  if (!input["vendor_name"]) {
    isValid = false;
    errors["vendor_name"] = "Please enter Vendor Name";
  }

  if (!input["api_base_url"]) {
    isValid = false;
    errors["api_base_url"] = "Please enter BASE API URL ";
  }

  if (!input["product_id_start"]) {
    isValid = false;
    errors["product_id_start"] = "Please enter  valid product start id ";
  }
  if (!input["product_id_end"]) {
    isValid = false;
    errors["product_id_end"] = "Please enter valid product end id";
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
      
       <div style={{margin:"0 auto",  width:"575px",height:"800px", padding:"20px",marginTop:"10px",marginLeft:'300px'}} >

       
        <div className="row" style={{height:"500px",backgroundColor:"whitesmoke"}}>
            
            <h2 style={{textAlign:"center",marginLeft:"150px",marginTop:"10px",textDecoration:"underline"}}> Vendor API Management Console </h2>
            <br></br>
            <form onSubmit={this.handleSubmit} style={{marginRight:"40px",marginLeft:"100px",marginTop:"10px",fontSize:"10px"}}>
       
        <div className="form-group">
         <label for="vendor_name">Vendor Name: </label> 
            <input className="form-control" 
              type="text"
              name="vendor_name"
              value = {this.state.input.vendor_name}
              placeholder="Enter Vendor Name"
              onChange={this.handleChange}
              id="vendor_name" style={{width:"340px"}}/>
              <div className="text-danger">{this.state.errors.vendor_name}</div>
              
              </div>    
      <div className="form-group">
            <label for="api_url">API base url</label>
            <input className="form-control" 
              type="text"
              name="api_base_url"
              value={this.state.input.api_base_url}
              placeholder="Enter API base url"
              onChange={this.handleChange}
              id="api_base_url" />
              
              <div className="text-danger">{this.state.errors.api_base_url}</div>
              
              
              </div> 
          <div className="form-group">
            <label for="product_id_start">Product ID Start</label>
            <input className="form-control" 
              type="text"
              name="product_id_start"
              value={this.state.input.product_id_start}
              onChange={this.handleChange}
              placeholder="Enter starting value of product id"
              id="product_id_start" />
              
              <div className="text-danger">{this.state.errors.product_id_start}</div>
              
              
              </div> 
          <div className="form-group">
            <label for="product_id_ends">Product ID End</label>
              <input className="form-control" 
                type="text"
                name="product_id_end"
                value={this.state.input.product_id_end}
                onChange={this.handleChange}
                placeholder="Enter the end value of product id"
                id="product_id_end" /> 
                
              <div className="text-danger">{this.state.errors.product_id_end}</div>
              
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
