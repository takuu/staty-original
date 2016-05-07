//import styles from './styles.styl';

// import './styles.css';
let logoFull;
if (process.env.BROWSER) {
  logoFull = require('./logo-full.png');
  require('./styles.css');
}
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import NavItem from './NavItem';
import { addFacebookUser } from '../../actions/userActions';
import FacebookLogin from 'react-facebook-login';

export default class Header extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
  };

  handleLogout = e => {
    const { logout, router } = this.props;

    e.preventDefault();

    logout(router);
  };

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

    debugger;

    if (user && user.fb) {
      let named = user.fb.name;
      debugger;
      return (
        <div className='Header-nav Navigation'>
          <Link className='Navigation-link' to='/leagues'>Leagues</Link>
          <Link className='Navigation-link' to='/about'>About</Link>
          <Link className='Navigation-link' to='/profile'>{named}</Link>

        </div>
        );
    } else {
      debugger;
      return (
        <div className='Header-nav Navigation'>
          <Link className='Navigation-link' to='/leagues'>Leagues</Link>
          <Link className='Navigation-link' to='/about'>About</Link>
          <FacebookLogin
            appId="1017967544938771"
            autoLoad={true}
            callback={this.responseFacebook.bind(this)} scope='public_profile, email' cssClass="my-facebook-button-class"
            icon="fa-facebook" />
        </div>
      );
    }
  }

  render () {
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
