import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router';
import classNames from 'classnames';

export default class ProfilePage extends React.Component {

  static propTypes = {
    path: PropTypes.string,
    user: PropTypes.object,
    watchList: PropTypes.array,
    stats: PropTypes.array
  };

  static defaultProps = {
    path: '',
    user: {},
    watchList: [],
    stats: []
  };

  // saveProfile = profile => this.props.saveProfile(profile);

  render () {
    const { user, watchList, stats, path } = this.props;
    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {user: user, watchList: watchList, stats: stats});
    });
    if (!user) return null;

    let urlParts = path.split('/');
    let routeName = urlParts[urlParts.length - 1];

    let profileClass = classNames({
      'active': routeName === 'profile'
    });
    let gameLogClass = classNames({
      'active': routeName === 'games'
    });
    let splitStatsClass = classNames({
      'active': routeName === 'stats'
    });

    return (
      <div>
        <div className='portlet-title'>
          <div className='page-title'>
            <span>{user.fb && user.fb.name}</span>
          </div>
        </div>
        <div className='row' style={{backgroundColor: '#eff3f8'}}>
          <div className='col-md-12 col-xs-12' style={{margin: '20px 0px'}}>
            <div className='sub-container'>
              <div className='sub-title-container'>
                <div className='container'>
                  <div className='col-md-6 col-xs-12'>
                    <ul className='nav nav-tabs nav-justified'>
                      <li role='presentation' className={profileClass}>
                        <Link to={'/profile'}><div className='sub-title'>General</div></Link>
                      </li>
                      <li role='presentation' className={gameLogClass}>
                        <Link to={'/profile/games'}><div className='sub-title'>Game Log</div></Link>
                      </li>
                      <li role='presentation' className={splitStatsClass}>
                        <Link to={'/profile/stats'}><div className='sub-title'>Split Stats</div></Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div style={{padding: '10px'}}>
                {childrenWithProps}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
