import React, { Component } from 'react';
import swal from 'sweetalert2'
import logo from '../img/logo.png'
export class AddParkingArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signOut: false,
            items: [],
            value: '',
            addParkingArea:''

        }
        this.onChange = this.onChange.bind(this);
        this.onChangeParkingArea = this.onChangeParkingArea.bind(this);
        this.insertParkingArea = this.insertParkingArea.bind(this);

    }
    //get location on load
    componentWillMount() {      
        fetch("http://localhost:9869/api/User/GetLocations")
            .then(res => res.json())
            .then(

            (result) => this.setState({ items: result })
            )
    }
    //set the state 
    onChange(e, value) {
        this.setState({
            value: value,
        })
      
    }
    //insert parking area
    insertParkingArea() {
       
        fetch('http://localhost:9869/api/User/PostParkingArea', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                LocationID: this.state.value,
                ParkingArea: this.state.addParkingArea,

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
                    document.getElementById("location").value = ""; 
                    document.getElementById("addParkingArea").value = ""; 
                }
                else {
                    swal({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Please Enter A Valid Location Name',
                    })
                }
            })
    }   
    onChangeParkingArea(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {

        const { items } = this.state;
        console.log('items', this.state.items);
        return (
            <div>
             <section className="breadcrumb-section contact-bg section-padding">
      <div className="container">
          <div className="row">
              <div className="text-center">
                  <h1>Add Parking Area</h1>
                   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
              </div>
          </div>
      </div>
    </section>
    <div className="loginform" style={{marginTop:'10px',marginBottom:'10px'}}> 
           <img src={logo} alt="logo" style={{height:'150px',width:"90%"}}  />
            <div className="form-group">
                    <label for="sel1">Select Location:</label>
                    <select 
                    autoFocus='true'
                    className="form-control" id="sel1" 
                    onChange={this.onChange}
                    ref={(input) => { this.nameInput = input; }}
                    >
                    <option>Select Location</option>
                    {items.map(member =>
                            <option key={member.locationID} value={member.locationID}>
                                {member.locationName}
                            </option>
                        )}
                    </select>
            </div>
            <div className="form-group">
                        <label htmlFor="addParkingArea">Add Parking Area:</label>
                        <input  
                       type="text"
                       id="addParkingArea"
                       name="addParkingArea"
                       label="Add ParkingArea"
                       s={12}
                       value={this.state.addParkingArea}
                       onChange={this.onChangeParkingArea}                       
                         className="form-control"                         
                        />
                </div>
                <div className="form-group">
                <button
                       className="btn btn-success form-control"                        
                        type="submit" id="submit"
                        onClick={this.insertParkingArea}>Add Location</button>
                </div> 
               
            </div>
            </div>
        );
    }
}
export default AddParkingArea;