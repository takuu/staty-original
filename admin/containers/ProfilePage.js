import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { saveProfile } from '../actions/auth';
import { getProfile } from '../actions/userActions';
import ProfileEdit from '../components/ProfileEdit/ProfileEdit';
import _ from 'lodash';

@connect((state, router) => {
  const {userId} = router.params;
  const auth = state.auth;

  const usersJS = state.users.toJS();
  const user = _.find(usersJS, {_id: userId});

  return {auth, user};
}, {
  saveProfile,
  getProfile
})
export default class ProfileRoute extends React.Component {

  static fillStore(redux, route) {
    const { userId } = route.params;
    redux.dispatch(getProfile(userId));
  }
  static propTypes = {
    auth: PropTypes.object.isRequired,
    saveProfile: PropTypes.func.isRequired
  }

  saveProfile = profile => this.props.saveProfile(profile)

  render () {
    const { auth: { profile }, user } = this.props;

    if (!user) return null;

    return <ProfileEdit profile={profile} saveProfile={this.saveProfile} />;
  }

  foo () {
    const { auth: { profile }, user } = this.props;

    if (!profile) return null;

    return <ProfileEdit profile={profile} saveProfile={this.saveProfile} />;
  }
}
