import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProfile, logout } from '../actions/auth';
@connect(state => ({
  auth: state.auth,
  router: state.router
}))
export default class Auth extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string
  };

  static contextTypes = {
    router: PropTypes.object
  };

  static fillStore(redux) {
    return redux.dispatch(fetchProfile());
  }

  render() {
    const { auth: {profile, token}, dispatch, params } = this.props;
    let body = (token && profile && profile.leagueName == params.leagueName) ?
      (
      <div>{this.props.children}</div>
      ) :
      (
        <div>INVALID ACCESS</div>
      );
    return (
      <div>
        <div style={{minHeight: '800px'}}>
          {body}
        </div>
      </div>
    );
  }
}
