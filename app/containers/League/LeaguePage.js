import React from 'react';
import { Link } from 'react-router';
class LeagueRoute extends React.Component {
  render () {
    return (
      <div className='sub-container'>
        <div className='sub-title-container'>
          <div className='container'>
            <div className='col-md-6 col-xs-12'>
              <ul className='nav nav-tabs nav-justified'>
                <li role='presentation' className='active'>
                  <Link to={''}><div className='sub-title'>Home</div></Link>
                </li>
                <li role="presentation">
                  <Link to={''}><div className='sub-title'>Register</div></Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LeagueRoute;
