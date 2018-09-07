import React, { Component } from 'react';
import { connect} from 'react-redux'
import '../css/Mystyle.css';
import logo from '../img/logo.png'
export class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.onChange = this.onChange.bind(this);
        this.login = this.login.bind(this);
    }
    componentDidMount(){
        this.nameInput.focus(); 
     }
    onChange(event) {      
        this.setState({ [event.target.name]: event.target.value });
    }
    login() {
        this.props.fromLogin(this.state.email, this.state.password);
    }
    render() {       
        const { email, password } = this.state;
        const enabled = email.length > 0 && password.length > 0;
        return (
            <div >
            <section className="breadcrumb-section contact-bg section-padding">
      <div className="container">
          <div className="row">
              <div className="text-center">
                  <h1>Login Form</h1>
                   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
              </div>
          </div>
      </div>
    </section>
            <div className="loginform" style={{marginTop:'10px',marginBottom:'10px'}}> 
           <img src={logo} alt="logo" style={{height:'150px',width:"90%"}}  />         
                <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input  
                        autoFocus="true"                       
                         type="email"
                         name="email"
                         label="Email"
                         s={12}
                         value={this.state.email}
                         onChange={this.onChange}                        
                         className="form-control"
                          id="email"
                          ref={(input) => { this.nameInput = input; }}
                        />
                </div>
                <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                       type="password"
                       name="password"
                       label="password"
                       s={12}
                       value={this.state.password}
                       onChange={this.onChange}                        
                       className="form-control"
                          id="password"
                        />
                </div> 
                <div className="form-group">
                <button
                       className="btn btn-success form-control"
                        disabled={!enabled}
                        type="submit" id="submit"
                        onClick={this.login}>Log in</button>
                </div> 
                </div>
                </div>
           
        )
    }
}
const mapStateToProps = state => ({
    username: state.user.email,
    userpassword:state.user.password
});
  
export default connect(mapStateToProps)(LogIn);
