
if (process.env.BROWSER) require('../styles/global.css');

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { fetchUserProfile, logout } from '../actions/auth';
import { hideLoginModal } from '../actions/uiActions';
// import CustomModal from '../components/core/CustomModal/CustomModal';

@connect(state => {
  const {auth, router, user, ui} = state;

  return {auth, router, user, ui};
})
export default class App extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string,
    user: PropTypes.object,
    ui: PropTypes.object
  };

  close () {
    const {dispatch} = this.props;
    dispatch(hideLoginModal());
  }
  static contextTypes = {
    router: PropTypes.object,
    user: PropTypes.object
  };

  static fillStore (redux) {
    return redux.dispatch(fetchUserProfile());
  };

  render () {
    const { auth, dispatch, params, user, ui } = this.props;
    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { dispatch: dispatch, user: user });
    });

    return (
      <div>
        <Header
          loggedIn={!!auth.token}
          router={this.context.router}
          params={params}
          dispatch={dispatch}
          user={user}
          auth={auth}
          ui={ui}
          {...bindActionCreators({ logout }, dispatch)}
        />
        <div style={{minHeight: '800px'}}>
          {childrenWithProps}
        </div>

        <Footer {...this.props.children} />



      </div>
    );
  }
}
