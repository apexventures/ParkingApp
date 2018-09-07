import '../css/datatables.css';
import React, { Component } from 'react';
import swal from 'sweetalert2';
let userid;
export class MyBookings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        }
    }
    //get session id and booked date
    componentDidMount() {
        userid = sessionStorage.getItem('userID');
        this.getBookedData();
    }
    //delete booking from list 
    onCancel(event) {
        fetch('http://localhost:9869/api/User/Deletebookings', {
            method: 'Delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                assignedID: event
            }
            )
        }).then(response => response.json())
            .then(response => {
                if (response === true) {
                    swal({
                        type: 'success',
                        title: 'Ahaaa...',
                        text: 'successfully cancel the booking',
                    })
                    this.getBookedData();
                }
                else {
                    swal({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Please Enter A Valid Name or Password',
                    })
                }
            })
    }
    //get list of all booking from current user
    getBookedData() {
        fetch('http://localhost:9869/api/User/GetbookedData', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                UserID: userid,
            })
        }).then(response => response.json())
            .then(ree => {
                this.setState({
                    items: ree
                })
            })
    }
    render() {
        const { items } = this.state
        return (
            <div>
             <section className="breadcrumb-section contact-bg section-padding">
      <div className="container">
          <div className="row">
              <div className="text-center">
                  <h1>My Bookings</h1>
                   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
              </div>
          </div>
      </div>
    </section>
                <div className="container">
                <div class="table-responsive"> 
                    <table className="table" style={{ marginTop: "20px" }} >
                        <thead>
                            <tr >
                                <th className="text-center">Parking Area</th>
                                <th className="text-center">Location</th>
                                <th className="text-center">Booked Date</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(member =>
                                <tr key={member.assignedID}>
                                    <td className="text-center">{member.parkingArea} </td>
                                    <td className="text-center">{member.locationName} </td>
                                    <td className="text-center">{member.bookedDate}</td>
                                    <td className="text-center"><a className="btn btn-danger" onClick={() => this.onCancel(member.assignedID)} > Cancel Booking</a></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        );
    }

}
export default MyBookings;