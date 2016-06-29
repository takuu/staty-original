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
import { logout } from '../../actions/auth'
import { showLoginModal, hideLoginModal } from '../../actions/uiActions';
import FacebookLogin from 'react-facebook-login';
import {DropdownButton, MenuItem, Modal} from 'react-bootstrap';

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

  close () {
    const {dispatch} = this.props;
    dispatch(hideLoginModal());
  }

  handleLogout = e => {
    const { logout, router } = this.props;
    e.preventDefault();
    logout(router);
  };

  showLogin () {
    const { player, dispatch, watchList, ui } = this.props;
    dispatch(showLoginModal());
  }

  logout () {
    const { dispatch } = this.props;
    dispatch(logout());
  }

  responseFacebook(fbUser) {
    const { logout, router, dispatch, user } = this.props;
    this.close();
    console.log('facebook response', fbUser);
    // Call this if there isn't a facebook user
    if(!(user && user.fb)){
      dispatch(addFacebookUser(fbUser));
    }
  }

  renderNavBar () {
    const { loggedIn, params, user, ui, auth } = this.props;

    // if (user && user.fb) {
    if (auth && auth.token) {
      let named = (user && user.fb) ? user.fb.name : '';
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
              <MenuItem key='3'>
                <div onClick={this.logout.bind(this)}>Logout</div>
              </MenuItem>
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
            <a href='#' className='Navigation-link' onClick={this.showLogin.bind(this)}>Login</a>
          </div>
          <div style={{'float': 'left'}}>
            <a href='#' className='Navigation-link' onClick={this.showLogin.bind(this)}>Register</a>
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
        <Modal show={ui.showLoginModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <h4 className='modal-title text-center'>LOGIN TO STATY</h4>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className='form-group'>
                <label className='email-inline'>
                  <input type='email' className='form-control' id='exampleInputEmail1' placeholder='Email' />
                </label>
              </div>
              <div className='form-group'>
                <input type='password' className='form-control' id='exampleInputPassword1' placeholder='Password' />
              </div>
              <button type='submit' className='btn btn-default'>Login</button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className='centered'>
              <FacebookLogin
                appId='1017967544938771'
                autoLoad={false}
                callback={this.responseFacebook.bind(this)} scope='public_profile, email' cssClass='my-facebook-button-class'
                textButton='Login'
                icon='fa-facebook' />
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
