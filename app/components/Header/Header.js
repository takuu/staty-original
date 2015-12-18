//import styles from './styles.styl';

import './styles.css';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import NavItem from './NavItem';

//@CSSModules(styles)
export default class Header extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
  }

  handleLogout = e => {
    const { logout, router } = this.props;

    e.preventDefault();

    logout(router);
  }

  renderNavBar() {
    const { loggedIn } = this.props;

    if (loggedIn) {
      return (

          <div className="Header-nav Navigation" role="navigation">
            <Link className="Navigation-link" to="/" >Home</Link>
            <Link className="Navigation-link" to="/contact" >Contact</Link>
            <Link className="Navigation-link" to="/league" >League</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/logout" onClick={this.handleLogout}>Logout</Link>
            <span className="Navigation-spacer"> | </span>

          </div>


      );
    } else {
      return (
        <div className="Header-nav Navigation">
          <Link className="Navigation-link" to="/">Home</Link>
          <Link className="Navigation-link" to="/contact">Contact</Link>
          <Link className="Navigation-link" to="/leagues">Leagues</Link>
          <Link className="Navigation-link" to="/signup">Sign up</Link>
          <Link className="Navigation-link" to="/login">Login</Link>
        </div>
      );
    }
  }

  render() {
    return (

      <div>
        <div className="Header">
          <div className="container">
            <Link className="Header-brand" to="/" title="Staty">
              <img className="Header-brandImg" src={require('./logo-small.png')} width="32" height="32" alt="React" />
              <span className="Header-brandTxt">Staty</span>
            </Link>
            {this.renderNavBar()}
          </div>
        </div>
      </div>


    );
  }
}
