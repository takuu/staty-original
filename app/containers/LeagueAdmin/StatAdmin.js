import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({
}), {})
class StatAdmin extends React.Component {
  render() {
    return (
      <div>
        <h1>HELLO WORLD</h1>
      </div>
    )
  }
}

export default StatAdmin;