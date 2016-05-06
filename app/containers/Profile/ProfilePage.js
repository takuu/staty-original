import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

export default class ProfilePage extends React.Component {

  static fillStore(redux, route) {
    // redux.dispatch(getProfile(userId));
  }
  static propTypes = {
    // auth: PropTypes.object.isRequired,
    // saveProfile: PropTypes.func.isRequired
  };

  // saveProfile = profile => this.props.saveProfile(profile);

  render () {
    // const { auth: { profile }, user } = this.props;

    // if (!user) return null;

    return (
      <div>Test</div>
    );
  }

}
