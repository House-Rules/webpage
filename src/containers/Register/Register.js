import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { register, setAlert } from '../../actions/action';
import './Register.css';


class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      username: ''
    }
  };

  handleUpdateState = (field) => {
    return (event) => {
      this.setState({[field]: event.target.value})
    }
  }

  handleRegister = (event) => {
    event.preventDefault();
    if ((!this.state.email) || (!this.state.username) || (!this.state.password)) {
      this.props.setAlert({type: 'error', message: 'Must enter an email address, username, and password to register'});
    } else {
      const register = this.props.register;

      // TODO fix this fetch call to make it a promise for navigation purposes
      register(this.state, (data) => {
        console.log("REGISTER-CALLBACK-DATA-->", data);
        this.props.history.replace('/webpage/games');
        this.setState({
          email: "",
          username: "",
          password: ""
        });
       });
    }
  };

  render() {
    return(
      <div className='form-group Signup'>

        <input type='text' className="form-control" placeholder='Username' value={this.state.username} onChange={this.handleUpdateState('username')}/>

        <input type='email' className="form-control" placeholder='Email' value={this.state.email} onChange={this.handleUpdateState('email')}/>

        <input type='password' className="form-control" placeholder='Password' value={this.state.password} onChange={this.handleUpdateState('password')}/>

        <button className='btn' type='submit'onClick={this.handleRegister}>
          Sign Up
        </button>

        <div className="browse">
          <Link to='/webpage/games'>
            ... or <span>Browse</span> our selection of games to play</Link>
        </div>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    register: register,
    setAlert: setAlert
  }, dispatch)
};

export default withRouter(connect(null, mapDispatchToProps)(Register));
