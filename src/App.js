import React, { Component } from 'react';
import {connect} from 'react-redux';
import Logo from './img/logo.png';
import './App.css';
import { BrowserRouter as Router, Route, NavLink, Redirect, Switch } from 'react-router-dom';
import SignUp from './Components/signup';
import LogIn from './Components/signin';
import Home from './Components/Home';
import AddLocations from './Components/AddLocation'
import AddParkingArea from './Components/AddParkingArea'
import { Viewparkinglocation } from './Components/viewparkinglocations';
import { MyBookings } from './Components/MyBookings';
import Default from './Components/default';
import ConformBooking from './Components/ConformBookings';
import swal from 'sweetalert2';
import './css/Mystyle.css'
import './css/grayscale.min.css'
import store from './Store/store'
import {AUTH} from './Action/type'
let addlocation;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // isAuth: false,           
            role: '',
            firstname: '',
            email: '',
        }
        this.login = this.login.bind(this);
        this.logOut = this.logOut.bind(this);
        
    }
    componentDidMount(){
        window.onscroll = function() {myFunction()};

var header = document.getElementById("mainNav");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("navbar-shrink");
  } else {
    header.classList.remove("navbar-shrink");
  }
}
    }
    //get session storage item
    componentWillMount() { 

        var session = sessionStorage.getItem('islogin');
        if (session != null || session === "true") {
                        store.dispatch({
                            type: AUTH,
                            isAuth: sessionStorage.getItem('islogin')
                        })
        }
       
    }
    //Logout click
    logOut() {
        store.dispatch({
            type:AUTH,
            isAuth:false
        })
        sessionStorage.removeItem("islogin");
        sessionStorage.removeItem("userID");
    }
    //check login email and password
    login(email, password) {
        fetch('http://localhost:9869/api/User/GetLogin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Email: email,
                Password: password
            }
            )
        }).then(response => response.json())
            .then(response => {                
                if (response.isLogin) {
                    sessionStorage.setItem('islogin', true);
                    sessionStorage.setItem('userID', response.userID);                   
                    this.setState({                        
                        first: response.firstName,
                        role: response.type,
                        email: response.email
                    })
                    store.dispatch({
                        type:AUTH,
                        isAuth:response.isLogin
                    })
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
    render() { 
            
        if (this.state.role === 'admin') {
            addlocation = <div>
                <li className="nav-item"><NavLink  to="/conformbookings" activeStyle={{ color: '#64a19d' }} className="nav-link js-scroll-trigger"><span className="glyphicon glyphicon-user"></span>Conform Bookings </NavLink></li>  
                <li className="nav-item"><NavLink  to="/addlocations" activeStyle={{ color: '#64a19d' }} className="nav-link js-scroll-trigger"><span className="glyphicon glyphicon-user"></span>Add Locations </NavLink></li>  
                <li className="nav-item"><NavLink  to="/addparkingarea" activeStyle={{ color: '#64a19d' }} className="nav-link js-scroll-trigger"><span className="glyphicon glyphicon-user"></span>Add Parking Area </NavLink></li>  
                <li className="nav-item"><NavLink to="/login" activeStyle={{ color: '#64a19d' }} className="nav-link js-scroll-trigger" onClick={this.logOut}><span className="glyphicon glyphicon-user"></span>Sign Out </NavLink></li>
            </div>;
        }
        else {
            addlocation = <div>
                <li className="nav-item"><NavLink to="/home" activeStyle={{ color: '#64a19d' }} className="nav-link js-scroll-trigger"><span className="glyphicon glyphicon-user"></span>Home </NavLink></li>  
                <li className="nav-item"><NavLink to="/mybookings" activeStyle={{ color: '#64a19d' }} className="nav-link js-scroll-trigger"><span className="glyphicon glyphicon-user"></span>My Bookings </NavLink></li>                
                <li className="nav-item"><NavLink to="/login" activeStyle={{ color: '#64a19d' }} className="nav-link js-scroll-trigger" onClick={this.logOut}><span className="glyphicon glyphicon-user"></span>Sign Out </NavLink></li>                

            </div>;
        }
        let signuprd;
        if (!this.props.AuthRedux) {
            signuprd = <div>   <li className="nav-item"><NavLink to="/signup" activeStyle={{ color: '#64a19d' }} className="nav-link js-scroll-trigger"><span className="glyphicon glyphicon-user"></span> Sign Up</NavLink></li>
                <li className="nav-item"><NavLink to="/login" activeStyle={{ color: '#64a19d' }} className="nav-link js-scroll-trigger"><span className="glyphicon glyphicon-log-in"></span> Login</NavLink></li>

            </div>
            addlocation = "";
        }
        return (
            <div >                   
                <Router>
                    <div id ="header">   
                                     
                    <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                        <div className="container">
                        <img src={Logo} alt="logo" style={{height:"70px"}} className="navbar-brand js-scroll-trigger" />
                        
                            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            Menu
                            <i className="fas fa-bars"></i>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">            
                                {signuprd} 
                                {addlocation}
                            </ul>
                            </div>
                        </div>
                   </nav>
                        <Switch>
                            <Route path='/' exact={true} component={Default} />
                            <Route path='/signup' component={SignUp} />
                            <Route path="/login" render={(props) => (
                                this.props.AuthRedux ?
                                    this.state.role !=='admin' ?
                                    (<Redirect to="/home" />) :
                                    (<Redirect to="/conformbookings" />)
                                :
                                    (<LogIn {...props} fromLogin={this.login} />)
                            )} />
                            <Route path="/addlocations" render={(props) => (
                                this.props.AuthRedux ? (<AddLocations  />) : (<Redirect to="/login" />)
                            )} />
                            <Route path="/conformbookings" render={(props) => (
                                this.props.AuthRedux ? (<ConformBooking />) : (<Redirect to="/login" />)
                            )} />
                            <Route path="/addparkingarea" render={(props) => (
                                this.props.AuthRedux  ? (<AddParkingArea  />) : (<Redirect to="/login" />)
                            )} />
                            <Route path="/viewlocation/:id" render={(props) => (
                                this.props.AuthRedux ? (<Viewparkinglocation {...props} fromHome={this.signOut} />) : (<Redirect to="/login" />)
                            )} />

                            <Route path="/home" render={(props) => (
                                this.props.AuthRedux ? (<Home {...props} fromHome={this.signOut} />) : (<Redirect to="/login" />)
                            )} />
                            <Route path="/mybookings" render={(props) => (
                                this.props.AuthRedux ? (<MyBookings />) : (<Redirect to="/login" />)
                            )} />
                        </Switch>                        
                    </div>
                </Router>
                <section className="contact-section bg-black">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <div className="card py-4 h-100">
              <div className="card-body text-center">
                <i className="fas fa-map-marked-alt text-primary mb-2"></i>
                <h4 className="text-uppercase m-0">Address</h4>
                <hr className="my-4"/>
                <div className="small text-black-50">P 6-B, 2nd Floor, Kohinoor Town Road, Near Allied Bank</div>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3 mb-md-0">
            <div className="card py-4 h-100">
              <div className="card-body text-center">
                <i className="fas fa-envelope text-primary mb-2"></i>
                <h4 className="text-uppercase m-0">Email</h4>
                <hr className="my-4"/>
                <div className="small text-black-50">
                  <a href="/">hi@erudite.pk</a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3 mb-md-0">
            <div className="card py-4 h-100">
              <div className="card-body text-center">
                <i className="fas fa-mobile-alt text-primary mb-2"></i>
                <h4 className="text-uppercase m-0">Phone</h4>
                <hr className="my-4"/>
                <div className="small text-black-50"> +92-41-8501720</div>
              </div>
            </div>
          </div>
        </div>

        <div className="social d-flex justify-content-center">
          <a href="/" className="mx-2">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.facebook.com/eruditelimited/?ref=br_rs" className="mx-2">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://github.com/eruditelimited/ParkingApp" className="mx-2">
            <i className="fab fa-github"></i>
          </a>
        </div>

      </div>
    </section>
    <footer className="bg-black small text-center text-white-50">
      <div className="container">
      All Copyright &copy; are Reserved 2018
      </div>
    </footer>
            </div>
        );
    }
}
const mapStateToProps = state => ({
	AuthRedux: state.auth.isAuth
});
  
export default connect(mapStateToProps)(App);
// export default App;
