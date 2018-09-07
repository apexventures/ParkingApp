import React, { Component } from 'react';
import swal from 'sweetalert2';
import '../App.css';
import logo from '../img/logo.png'
export class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            address: '',
        };
        this.onChange = this.onChange.bind(this);
    }
    //Post data
    PostData() {
        fetch('http://localhost:9869/api/User/PostUsers', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                FirstName: this.state.firstName,
                LastName: this.state.lastName,
                Email: this.state.email,
                Password: this.state.password,
                Address: this.state.address
            }
            )
        }).then(response => response.json())
            .then(response => {               
                if (response === true) {
                    swal(
                        'Success!',
                        'Data Inserted Successfully'
                    )
                }
                else {
                    swal({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Something Went Wrong',
                    })
                }
                document.getElementById("firstName").value = "";
                document.getElementById("lastName").value = "";
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
                document.getElementById("address").value = "";
                document.getElementById("address").value = "";
                document.getElementById("submit").disabled = true;
            })
    }
    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {       
        const { firstName, lastName, email, password, address } = this.state;
        const enabled = firstName.length > 0 && lastName.length > 0 && email.length > 0 && password.length > 0 && address.length > 0;
        return (
            <div>
             <section className="breadcrumb-section contact-bg section-padding">
      <div className="container">
          <div className="row">
              <div className="text-center">
                  <h1>User Registration Form</h1>
                   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
              </div>
          </div>
      </div>
    </section>
    <div className="loginform" style={{marginTop:'10px',marginBottom:'10px'}}> 
           <img src={logo} alt="logo" style={{height:'150px',width:"90%"}}  />         
                <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input  
                        autoFocus='true'
                       id="firstName"
                       name="firstName"                                             
                       value={this.state.firstName}
                       onChange={this.onChange}
                       className="form-control"
                          ref={(input) => { this.nameInput = input; }}
                        />
                </div>
                <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                       id="lastName"
                       name="lastName"
                       value={this.state.lastName}
                       onChange={this.onChange}                    
                       className="form-control"                        
                        />
                </div> 
                <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                        id="email"
                        type="email"
                        name="email" 
                        value={this.state.email}
                        onChange={this.onChange}                                    
                       className="form-control"                        
                        />
                </div> 
                <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                        id="password"
                        type="password"
                        name="password"
                        label="password"                       
                        value={this.state.password}
                        onChange={this.onChange}                                    
                       className="form-control"                        
                        />
                </div> 
                <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                         id="address"
                         type="text"
                         name="address"
                         label="Address"                         
                         value={this.state.address}
                         onChange={this.onChange}                                 
                       className="form-control"                        
                        />
                </div> 
                <div className="form-group">
                <button
                       className="btn btn-success form-control"
                        disabled={!enabled}
                        type="submit" id="submit"
                        onClick={() => this.PostData()}>SignUp</button>
                </div> 
                </div>
            </div>
        );
    }
}
export default SignUp;