import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../img/logo.png'
export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signOut: false,
            items: [],
            value: '',
            date:''
        }
        this.onChange = this.onChange.bind(this)
    }
    //before rendring component get all locations
    componentDidMount() {
        this.nameInput.focus(); 
        fetch("http://localhost:9869/api/User/GetLocations")
            .then(res => res.json())
            .then(
            (result) => this.setState({ items: result })
            )
    }
    //on input change set the state
    onChange = (event) => {
        
        this.setState({
           value:event.target.value
        }, () => {          
        });
    
    }
    render() {
        
         //console.log('from redux',this.props.AuthRedux)
        const { items } = this.state;      
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
    <div className="loginform" style={{marginTop:'10px',marginBottom:'10px'}}> 
           <img src={logo} alt="logo" style={{height:'150px',width:"90%"}}  />
            <div className="form-group">
                    <label htmlFor="sel1">Select A Location:</label>
                    <select 
                    className="form-control"
                     id="sel1"
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
            <Link className="btn btn-primary form-control" to={"/viewlocation/" + this.state.value}>search</Link>
        </div>
    </div>
    </div>
        );
    }
}
const mapStateToProps = state => ({
	AuthRedux: state.auth.isAuth
});
  
export default connect(mapStateToProps)(Home);

