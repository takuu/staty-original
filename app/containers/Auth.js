import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProfile, logout } from '../actions/auth';
import Loader from '../components/Loader/Loader';
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

  static fillStore (redux) {
    return redux.dispatch(fetchProfile());
  }

  render () {
    const { auth: {profile, token}, dispatch, params } = this.props;
    let body = (<div></div>);

    if (profile) {
      if (token && profile.leagueName === params.leagueName) {
        body = (<div>{this.props.children}</div>);
      } else {
        body = (<div>INVALID ACCESS</div>);
      }
    } else {
      body = (<div><Loader /></div>);
    }
    return (
      <div>
        <div style={{minHeight: '800px'}}>
          {body}
        </div>
      </div>
    );
  }
}
