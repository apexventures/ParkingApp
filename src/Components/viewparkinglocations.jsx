import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import swal from 'sweetalert2';
import '../App.css';
let id;
let getparkingid = '';
let userId;
// let parkingarea;
export class Viewparkinglocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            locationclick: '',
            hideCard: false,
            selectedDays: [],
            booked: [],
            row: [],
            parkingarea: ''
        }
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onBooked = this.onBooked.bind(this);
        this.onHideCard = this.onHideCard.bind(this);
        this.bookedParkingArea = this.bookedParkingArea.bind(this);
    }
    //add selected days into an array
    handleDayClick(day, { selected }) {
        const { selectedDays } = this.state;
        if (selected) {
            const selectedIndex = selectedDays.findIndex(selectedDay =>
                DateUtils.isSameDay(selectedDay, day)
            );
            selectedDays.splice(selectedIndex, 1);
        } else {
            selectedDays.push(day);
        }
        this.setState({ selectedDays }
        );
    }
    //hide card on close button click
    onHideCard() {
        this.setState({ locationclick: '' }, () => {
        });
    }
    //Get Locations From Datadase
    getLocationArea() {
        fetch('http://localhost:9869/api/User/GetParkingArea', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                LocationID: id
            }
            )
        }).then(response => response.json())
            .then(ree => {

                this.setState({
                    items: ree
                })
            })
    }
    handleClick(event, event1) {
        this.setState({
            locationclick: event,
            parkingarea: event1
        }, () => {

        });
        getparkingid = event;
        // parkingarea = event1;
        this.bookedParkingArea();
    }
    //get dates of booked area
    bookedParkingArea() {

        fetch('http://localhost:9869/api/User/GetAssignedArea', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ParkingID: getparkingid,
                LocationID: id,
            })
        }).then(response => response.json())
            .then(ree => {
                this.setState({
                    booked: ree
                })
                var dates = [];
                for (var i = 0; i < this.state.booked.length; i++) {
                    dates.push(new Date(this.state.booked[i].fromDate))
                }
                this.setState({
                    row: dates
                })
            })
    }
    //get id from params
    componentDidMount() {
        userId = sessionStorage.getItem('userID');
        id = this.props.match.params.id;
        this.getLocationArea();
    }
    //Post Booked Data
    onBooked() {
        fetch('http://localhost:9869/api/User/PostBookedArea', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                LocationID: id,
                ParkingID: getparkingid,
                BookedDate: this.state.selectedDays,
                UserID: userId
            })
        }).then(response => response.json())
            .then(response => {
                this.setState({
                    booked: response
                })
                if (response === true) {
                    swal({
                        type: 'success',
                        title: 'Ahaaa...',
                        text: 'Waiting to Admin For Confromation your Bookings',
                    })
                    debugger
                    this.getLocationArea();
                }
                else {
                    swal({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Something Went Wrong',
                    })
                }

            }
            )
}
render()
 {
    const { items } = this.state;
    const modifiers = {
        disabled: this.state.row
    }

    let viewcard = <div>    
         <div class="modal fade" id="myModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title"><strong>Parking Slot &nbsp;</strong> {this.state.parkingarea}</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
        <div className="form-group">
        <DayPicker
                        selectedDays={this.state.selectedDays}
                        onDayClick={this.handleDayClick}
                        modifiers={modifiers}
                    />
                    </div>
                    <div className="form-group">     
        <button type="button" class="btn btn-success form-control"  onClick={this.onBooked}>Booked</button>
        </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>
    </div>
    if (this.state.locationclick === "") {
        viewcard = ""
    }
    return (
        <div>
          <section className="breadcrumb-section contact-bg section-padding">
      <div className="container">
          <div className="row">
              <div className="text-center">
                  <h1>Select Locations</h1>
                   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
              </div>
          </div>
      </div>
    </section>
           <div className="container">
                {viewcard}
                <div><label className="label1">Select Parking Location</label>
                </div>
                <div >               
    <div class="col-sm-12 col-xs-12" style={{display:'flow-root'}}>
    {items.map((data, index) =>
        <div key={index} > 
            <div onClick={this.handleClick.bind(this, data.parkingID, data.parkingArea)} className="parkingslot">
               <span className="text" data-toggle="modal" data-target="#myModal"> {data.parkingArea}</span>
            </div>
        </div>
    )}
    </div>        
 </div>
 </div>
 </div>
    );
}
}
export default Viewparkinglocation;