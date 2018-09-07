import React, { Component } from 'react';
import swal from 'sweetalert2';
import logo from '../img/logo.png'
export class AddLocations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addLocation: '',            
        };
        this.onChange = this.onChange.bind(this);
        this.insertData = this.insertData.bind(this);
    }
    // set the state of input value
    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    componentDidMount(){
        this.nameInput.focus(); 
     }
    //insert value through api
    insertData() {
        fetch('http://localhost:9869/api/User/PostLocations', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                LocationName: this.state.addLocation
            }
            )
        }).then(response => response.json())
            .then(response => {
                if (response === true) {
                    swal({
                        type: 'success',
                        title: 'Ahhaaa...',
                        text: 'Location Inserted Successfully',
                    })
                    document.getElementById("addLocation").value = "";                  
                }
                else {
                    swal({
                        type: 'error',
                        title: 'Oppss...',
                        text: 'Something Went Wrong',
                    })
                }
            })
    }
    render() {
        const { addLocation } = this.state;
        const enabled = addLocation.length > 0;
        return (
            <div>
              <section className="breadcrumb-section contact-bg section-padding">
      <div className="container">
          <div className="row">
              <div className="text-center">
                  <h1>Add Locations</h1>
                   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
              </div>
          </div>
      </div>
    </section>
    <div className="loginform" style={{marginTop:'10px',marginBottom:'10px'}}> 
           <img src={logo} alt="logo" style={{height:'150px',width:"90%"}}  />         
                <div className="form-group">
                        <label htmlFor="addLocation">Add a Location:</label>
                        <input  
                        autoFocus="true"
                        type="text"
                        id="addLocation"
                        name="addLocation"
                        label="Add Location"
                        s={12}
                        value={this.state.addLocation}
                        onChange={this.onChange}                       
                         className="form-control"                         
                          ref={(input) => { this.nameInput = input; }}
                        />
                    </div>
                    <div className="form-group">
                <button
                       className="btn btn-success form-control"
                        disabled={!enabled}
                        type="submit" id="submit"
                        onClick={this.insertData}>Add Location</button>
                </div> 
                </div>
             
                
            </div>
            );
    }
}
export default AddLocations;