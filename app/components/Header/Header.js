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
// import { showLoginModal, hideLoginModal } from '../../actions/uiActions';
import FacebookLogin from 'react-facebook-login';
// import {DropdownButton, MenuItem, Modal} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';

import PersonIcon from 'material-ui/svg-icons/social/person';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
var injectTapEventPlugin = require('react-tap-event-plugin');

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showModal: false, open: false};
    injectTapEventPlugin();
  }

  static propTypes = {
    loggedIn: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
  };

  /*close () {
    const {dispatch} = this.props;
    dispatch(hideLoginModal());
  }*/


  handleOpen = () => {
    this.setState({showModal: true});
  };

  handleClose = () => {
    this.setState({showModal: false});
  };

/*  handleLogout = e => {
    const { logout, router } = this.props;
    e.preventDefault();
    logout(router);
  };*/

/*  showLogin () {
    const { player, dispatch, watchList, ui } = this.props;
    dispatch(showLoginModal());
  }*/

  logout () {
    const { dispatch } = this.props;
    dispatch(logout());
    this.handleRequestClose();
    console.log('logout');
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  responseFacebook(fbUser) {
    const { logout, router, dispatch, user } = this.props;
    // this.close();
    this.handleClose();
    console.log('facebook response', fbUser);
    // Call this if there isn't a facebook user
    if(!(user && user.fb)){
      dispatch(addFacebookUser(fbUser));
    }
  }

  renderNavBar () {
    const { loggedIn, params, user, ui, auth } = this.props;
    if (auth && auth.token) {
      let named = (user && user.fb) ? user.fb.name : '';
      return (
        <div className='Header-nav Navigation'>
          <Link className='Navigation-link' to='/leagues'>Leagues</Link>
          <Link className='Navigation-link' to='/about'>About</Link>
          <RaisedButton
            onTouchTap={this.handleTouchTap}
            label='Profile'
            backgroundColor='#333'
            labelColor='#eee'
            className='btn-Navigation-dropdown'
            labelStyle={{textTransform: 'none', fontWeight: 'normal'}}
          />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
          >
            <Menu>
              <MenuItem
                linkButton
                onClick={this.handleRequestClose}
                onChange={this.handleRequestClose}
                containerElement={<Link to='/profile' />}
                primaryText='Profile'
                leftIcon={
                  <PersonIcon />
                }
              />
              <MenuItem primaryText='Settings' onClick={this.handleRequestClose} leftIcon={ <SettingsIcon /> } />
              <Divider />
              <MenuItem primaryText='Logout' onClick={this.logout.bind(this)} leftIcon={ <ExitIcon /> } />
            </Menu>

          </Popover>
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
            <a href='#' className='Navigation-link' onClick={this.handleOpen}>Login</a>
          </div>
          <div style={{'float': 'left'}}>
            <a href='#' className='Navigation-link' onClick={this.handleOpen}>Register</a>
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
        <Dialog
          title="LOGIN TO STATY"
          modal={false}
          open={this.state.showModal}
          onRequestClose={this.handleClose}
        >
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
          <Divider />

          <div className='centered'>
            <FacebookLogin
              appId='1017967544938771'
              autoLoad={false}
              callback={this.responseFacebook.bind(this)} scope='public_profile, email' cssClass='my-facebook-button-class'
              textButton='Login'
              icon='fa-facebook' />
          </div>
        </Dialog>
      </div>
    );
  }
}
