import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

const League = ({leagues}) => {
  return (
    <div className='LeaguePage' style={{marginTop: '80px'}}>
      <div className='LeaguePage-container'>
        <h1>League</h1>
        {
          _.map(leagues, (league) => {
            return (
              <div className='col-md-10 col-xs-10' key={league._id}>
                <div className='col-md-7'>
                  <Link to={`/${league.name}`}>
                    {league.displayName || league.name}
                  </Link>
                </div>
                <div className='col-md-5'>
                  {league.location}
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
