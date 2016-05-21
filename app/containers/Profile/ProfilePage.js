import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router';

export default class ProfilePage extends React.Component {

  static propTypes = {
    // auth: PropTypes.object.isRequired,
    // saveProfile: PropTypes.func.isRequired
  };

  // saveProfile = profile => this.props.saveProfile(profile);

  render () {
    const { user, watchList, stats } = this.props;
    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {user: user, watchList: watchList, stats: stats});
    });
    if (!user) return null;

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
                      <li role='presentation' className={{'active': false}}>
                        <Link to={'#'}><div className='sub-title'>Profile</div></Link>
                      </li>
                      <li role='presentation' className={{'active': false}}>
                        <Link to={'#'}><div className='sub-title'>Game Log</div></Link>
                      </li>
                      <li role='presentation' className={{'active': false}}>
                        <Link to={'#'}><div className='sub-title'>Split Stats</div></Link>
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
