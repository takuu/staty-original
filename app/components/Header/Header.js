//import styles from './styles.styl';

import './styles.css';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import NavItem from './NavItem';
import CSSModules from 'react-css-modules';

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
        <ul className="nav">
          <NavItem to="/">Blog</NavItem>
          <NavItem to="/contact">Contact</NavItem>
          <NavItem to="/league">League</NavItem>
          <NavItem to="/dashboard">Dashboard</NavItem>
          <NavItem to="/profile">Profile</NavItem>
          <NavItem to="/logout" onClick={this.handleLogout}>Logout</NavItem>
        </ul>
      );
    } else {
      return (
        <ul className="nav">
          <NavItem to="/">Blog</NavItem>
          <NavItem to="/contact">Contact</NavItem>
          <NavItem to="/leagues">Leagues</NavItem>
          <NavItem to="/signup">Sign up</NavItem>
          <NavItem to="/login">Login</NavItem>
        </ul>
      );
    }
  }

  render() {
    return (
      <nav className="navbar">
          <Link
            to="/"
            activeClassName=""
            title="Reblog"
          >
          <span className="brand">
            Staty
          </span>
          </Link>

          {this.renderNavBar()}
      </nav>
    );
  }
}
