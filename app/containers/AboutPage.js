import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({
}), {})
export default class SignupRoute extends React.Component {


  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>About us</h1>
        </div>
      </div>
    );
  }
}
