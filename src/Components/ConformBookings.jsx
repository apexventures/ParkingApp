import React, { Component } from 'react';
import swal from 'sweetalert2'
export class ConformBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            assignedID: '',
            userID: '',
            parkiingID: '',
            bookedDate: '',
            locationId: ''
        }
        this.GetHoldLocations = this.GetHoldLocations.bind(this);
    }
    //get all the hold locations
    GetHoldLocations() {
        fetch("http://localhost:9869/api/User/GetHoldLocations")
            .then(res => res.json())
            .then(
            (result) => this.setState({ items: result })
            )
    }
    //before rendaring call the method to load all the hold locations
    componentDidMount() {

        this.GetHoldLocations();
    }
    //on conform button click update the status from hold to booked
    onConform(assignedid, userid, parkingid, bookeddate, locationid) {
        this.setState({
            assignedID: assignedid,
            userID: userid,
            parkiingID: parkingid,
            bookedDate: bookeddate,
            locationId: locationid
        }, () => {
            fetch('http://localhost:9869/api/User/PutBookedData', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    UserID: this.state.userID,
                    AssignedID: this.state.assignedID,
                    ParkingID: this.state.parkiingID,
                    BookedDate: this.state.bookedDate,
                    LocationID: this.state.locationId
                }
                )
            })
                .then(response => response.json())
                .then(response => {
                    if (response === true) {
                        swal({
                            type: 'success',
                            title: 'Ahaaa...',
                            text: 'Booking Conformed',
                        })

                        this.GetHoldLocations();
                    }
                    else {
                        swal({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Something Went Wrong',
                        })
                    }
                })
        });
    }

    render() {
        const { items } = this.state
        return (
            <div>
              <section className="breadcrumb-section contact-bg section-padding">
      <div className="container">
          <div className="row">
              <div className="text-center">
                  <h1>Conform Bookings</h1>
                   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
              </div>
          </div>
      </div>
    </section>
    <div className="container">
                <div className="table-responsive"> 
                    <table className="table" style={{ marginTop: "20px" }} >
                        <thead>
                            <tr >
                                <th className="text-center">Assigned ID</th>
                                <th className="text-center">User Name</th>
                                <th className="text-center">Location</th>
                                <th className="text-center">Parking Area</th>
                                <th className="text-center">Booked Date</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(member =>
                                <tr key={member.assignedID}>
                                    <td className="text-center">{member.assignedID} </td>
                                    <td className="text-center">{member.firstName} </td>
                                    <td className="text-center">{member.locationName} </td>
                                    <td className="text-center">{member.parkingArea} </td>
                                    <td className="text-center">{member.bookedDate}</td>
                                    <td className="text-center">{member.status}</td>
                                    <td className="text-center"><a className="btn btn-danger" onClick={() => this.onConform(member.assignedID, member.userID, member.parkingID, member.bookedDate, member.locationID)}>Conform Booking </a></td>
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
export default ConformBooking;