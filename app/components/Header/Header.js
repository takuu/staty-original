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
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
  console.log('facebook response', response);
}
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

  renderNavBar () {
    const { loggedIn, params } = this.props;
    if (loggedIn) {
      let adminLink = `/${params.leagueName}/admin`;
      return (
          <div className='Header-nav Navigation' role='navigation'>
            <Link className='Navigation-link' to='/leagues' >Leagues</Link>
            <Link className='Navigation-link' to='/about'>About</Link>
            <Link className='Navigation-link' to='/dashboard'>Dashboard</Link>
            <Link className='Navigation-link' to={adminLink}>Admin</Link>
            <Link className='Navigation-link' to='/profile'>Profile</Link>
            <span className='Navigation-spacer'> | </span>
            <Link className='Navigation-link' to='/logout' onClick={this.handleLogout}>Logout</Link>
          </div>
      );
    } else {
      return (
        <div className='Header-nav Navigation'>
          <Link className='Navigation-link' to='/leagues'>Leagues</Link>
          <Link className='Navigation-link' to='/about'>About</Link>
          <FacebookLogin
            appId="1017967544938771"
            autoLoad={true}
            callback={responseFacebook} scope='public_profile, email' />
        </div>
      );
    }
  }

  render() {
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
