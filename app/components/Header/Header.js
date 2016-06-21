let logoFull;
if (process.env.BROWSER) {
  logoFull = require('./logo-full.png');
  require('./styles.css');
}

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import NavItem from './NavItem';
import createLinks from '../../utils/createLinks';
import { addFacebookUser } from '../../actions/userActions';
import { showLoginModal } from '../../actions/uiActions';
import FacebookLogin from 'react-facebook-login';
import {DropdownButton, MenuItem} from 'react-bootstrap';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showModal: false};
  }

  static propTypes = {
    loggedIn: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
  };

  handleLogout = e => {
    const { logout, router } = this.props;
    e.preventDefault();
    logout(router);
  };

  login () {
    const { player, dispatch, watchList } = this.props;
    dispatch(showLoginModal());
    debugger;

  }

  responseFacebook(fbUser) {
    const { logout, router, dispatch, user } = this.props;
    console.log('facebook response', fbUser);
    // Call this if there isn't a facebook user
    if(!(user && user.fb)){
      dispatch(addFacebookUser(fbUser));
    }
  }

  renderNavBar () {
    const { loggedIn, params, user } = this.props;

    if (user && user.fb) {
      let named = user.fb.name;
      return (
        <div className='Header-nav Navigation'>
          <Link className='Navigation-link' to='/leagues'>Leagues</Link>
          <Link className='Navigation-link' to='/about'>About</Link>
          <div style={{'float': 'right'}}>
            <DropdownButton bsStyle='Navigation-dropdown' title={named}>
              <MenuItem key='1'>
                <Link to={createLinks.createProfileLink(user)}>Profile</Link>
              </MenuItem>
              <MenuItem key='2'>Settings</MenuItem>
              <MenuItem key='2'>Logout</MenuItem>
            </DropdownButton>
          </div>
        </div>
        );
    } else {
      let profile = (user && user.players.length) ?
        (
          <div style={{'float': 'left'}}>
            <Link className='Navigation-link' to={createLinks.createProfileLink(user)}>List</Link>
            <span className='badge'>{user.players.length}</span>
          </div>
        )
        : null;
      return (
        <div className='Header-nav Navigation'>
          <div style={{'float': 'left'}}>
            <Link className='Navigation-link' to='/leagues'>Leagues</Link>
          </div>
          <div style={{'float': 'left'}}>
            <Link className='Navigation-link' to='/about'>About</Link>
          </div>
          {profile}
          <div style={{'float': 'left'}}>
            <FacebookLogin
              appId="1017967544938771"
              autoLoad={true}
              callback={this.responseFacebook.bind(this)} scope='public_profile, email' cssClass="my-facebook-button-class"
              textButton='Login'
              icon="fa-facebook" />
          </div>
          <div style={{'float': 'left'}}>
            <div onClick={this.login.bind(this)} style={{'color': '#fff'}}>Login</div>
          </div>
          <div style={{'float': 'left'}}>
            Register
          </div>


        </div>
      );
    }
  }

  render () {
    const { ui } = this.props;
    return (
      <div>
        <div className="Header">
          <div className="container">
            <a className="Header-brand" href="/" title='Staty'>
              <img className="Header-brandImg" src={logoFull} width="110" height="32" alt="React" />
            </a>
            {this.renderNavBar()}
          </div>
        </div>
      </div>
    );
  }
}
