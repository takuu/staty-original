/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import './styles.css';

import { Link } from 'react-router';

class Footer extends React.Component{

  static propTypes = {

  };

  render() {
    // This is just an example how one can render CSS


    return (
      <div className="Footer">
        <div className="Footer-container">
          <span className="Footer-text">© Staty.io</span>
          <span className="Footer-spacer">·</span>
          <Link className="Footer-link" to="/">Home</Link>
          <span className="Footer-spacer">·</span>
          <Link className="Footer-link" to="/privacy" >Privacy</Link>
          <span className="Footer-spacer">·</span>
          <Link className="Footer-link" to="/contact">Contact</Link>
          <span className="Footer-spacer">·</span>
          <Link className="Footer-link" to="/signup">Sign up</Link>
          <span className="Footer-spacer">·</span>
          <span className="Footer-spacer"> | </span>
          <Link className="Footer-link" to="/login">Admin</Link>
        </div>
      </div>
    );
  }

}

export default Footer;
