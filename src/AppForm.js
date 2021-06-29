import React from 'react';
import './AppForm.css';
import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function makeid() {
    return Math.ceil( Math.random()*1000000000);
}


class AppForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: '',
        lastName:'',
        streetAddress:'',
        zipcode: '',
        city:'',
        phoneNumber:'',
        curentState: 'California',
        party:'Democratic',
        email:'',

      };
      this.returnStateArray =  this.returnStateArray.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.putData = this.putData.bind(this);
      this.handleValidation = this.handleValidation.bind(this);
    }

    returnStateArray(){
        var items = this.state;
        return [items.firstName,items.lastName,items.streetAddress,items.zipcode,items.city,items.phoneNumber,items.curentState,items.party,items.email];
    }

    async putData() { 
        const apiName = 'campaignBookApi';
        const path = '/people';
        const myInit = { // OPTIONAL
            body: {
              'id':makeid(),
              'firstName':this.state.firstName.toLowerCase(),
              'lastName': this.state.lastName.toLowerCase(),
              'streetAddress': this.state.streetAddress.toLowerCase(),
              'zipcode':this.state.zipcode,
              'state': this.state.curentState,
              'phoneNumber': this.state.phoneNumber,
              'party':this.state.party,
              'email':this.state.email
            }, // replace this with attributes you need
            headers: {}, // OPTIONAL
        };
    
        return await API.put(apiName, path, myInit);
    }
  
    handleChange(event) {
      const target = event.target;
      this.setState({[target.name]: target.value});
    }

  
    handleValidation(event){
        var error = false;
        const itemarray = this.returnStateArray();
        itemarray.forEach((item)=>{
            console.log( item);
            if(!item){
                error = true;
            }
        });
        if(error){
            return false;
        }
        return true;
    }

    handleSubmit(event) {
      //alert('Thank You ' + this.state.party);
      
      if(this.handleValidation()){
        this.putData();
        alert("success");
        window.location.reload();
        
      }else{
          alert("missing information");
      }
      event.preventDefault();

    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
            <label>First Name</label>
            <input name = "firstName" type="text" value={this.state.firstName} onChange={this.handleChange}></input>

            <label>Last Name</label>
            <input name = "lastName" type="text" value = {this.state.lastName} onChange={this.handleChange}></input>

            <label>Street Address</label>
            <input name= "streetAddress" type="text" value = {this.state.streetAddress} onChange ={this.handleChange}></input>

            <label>City</label>
            <input name ="city" type="text" value = {this.state.city}  onChange ={this.handleChange}></input>

            <label>Zip Code</label>
            <input name="zipcode" type="text" value = {this.state.zipcode}  onChange ={this.handleChange}></input>

            <label>State</label>
            <input name="curentState" type="text" value={this.state.curentState} onChange ={this.handleChange}></input>

            <label>Phone Number</label>
            <input name="phoneNumber" type="tel" value = {this.state.phoneNumber} onChange ={this.handleChange} pattern="[0-9]{3}[0-9]{3}[0-9]{4}" placeholder="12345678" ></input>

            <label >Affiliated Party</label>
            <select  name="party" value = {this.state.party} onChange={this.handleChange}>
            <option value="Democratic">Democratic</option>
            <option value="Independent">Independent</option>
            <option value="Republican">Republican</option>
            </select>

            <label>Email</label>
            <input name = "email"  type="email" value = {this.state.em}  onChange ={this.handleChange}></input>

            <input type="submit" value="Submit" />
        </form>
      );
    }
  }

export default AppForm;
