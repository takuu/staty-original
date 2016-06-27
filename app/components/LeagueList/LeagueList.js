import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
if (process.env.BROWSER) require('./styles.css');

const League = ({ leagues }) => {
  return (
    <div className='LeaguePage' style={{ marginTop: '80px' }}>
      <div className='LeaguePage-container'>
        <h1>League</h1>
        {
          _.map(leagues, (league) => {
            return (
              <div className='col-md-6 col-xs-6' key={league._id}>
                <div className='list-group'>
                  <Link to={`/${league.name}`} className='list-group-item'>
                    <div className='col-md-3'>
                      <div className='league-img'></div>

                    </div>
                    <div className='col-md-6'>{league.displayName || league.name}</div>
                    <div className='col-md-3'>
                      {league.location}
                    </div>
                  </Link>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default League;
