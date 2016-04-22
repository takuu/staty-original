
if (process.env.BROWSER) require('../styles/global.css');

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { fetchProfile, logout } from '../actions/auth';

@connect(state => ({
  auth: state.auth,
  router: state.router
}))
export default class App extends React.Component {
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
  };

  render () {
    const {
      auth,
      dispatch,
      params
    } = this.props;
    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { dispatch: dispatch });
    });

    return (
      <div>
        <Header
          loggedIn={!!auth.token}
          router={this.context.router}
          params={params}
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
