import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Login from '../../containers/Login/Login';
import Register from '../../containers/Register/Register';
import { destroyCookie, getGameList } from '../../actions/action';
import './Splash.css';

class Splash extends Component {
  constructor() {
    super()
    this.state = {
      showLogin: false,
      showRegister: false
    }
  };

  componentDidMount() {
    if (!this.props.token) {
      this.setState({showLogin: true})
    }
    this.props.getGameList();
  };

  // will render this Component when current endpoint doesnt match any routes in index.js
  // For example: When running as a PWA on initial load.
  render() {
    return(
      <div className="Splash">
        <div className='wrapper'>

          <div className='Main-Logo'>
          <img src={require('../../images/house-rules-white-red.png')} alt="#"/>
          </div>

          {this.props.user.username !== null ?
            <div className="enter">
              <p className="welcome">
                {"Welcome back " + this.props.user.username}
              </p>
              <p className="not-me">{'Not ' + this.props.user.username + '? '}
                <span onClick={() => this.props.destroyCookie()}>
                  Log in
                </span>
              </p>
              <Link to="/webpage/games" className="btn enter-btn">Enter</Link>
            </div> : ''}

            {this.props.token ? '' :
            <div className="login-register">
              {this.state.showRegister ? <Register /> : <Login user={this.props.user} />}
              <p className='not-member'>
                {this.state.showRegister ? 'Already a member?' : 'Not a member?'}
                <span onClick={() => this.setState({showRegister: !this.state.showRegister})}>
                  {this.state.showRegister ? 'Log In' : 'Sign up'}
                </span>
              </p>
            </div>}

        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    destroyCookie: destroyCookie,
    getGameList: getGameList
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
