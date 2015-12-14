import React from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import _ from 'lodash';

class League extends React.Component {
  render() {
    let leagueList = (
      _.map(this.props.leagues, (league) => {
        return (
          <div className="col-md-10 col-xs-10" key={league._id}>
            <div className="col-md-7">
              <Link to={`/${league.name}`} >
                {league.displayName || league.name}
              </Link>

            </div>
            <div className="col-md-5">
              {league.location}
            </div>
          </div>
        );
      })
    )
    return (
      <div className="LeaguePage">
        <div className="LeaguePage-container">
          <h1>League</h1>
          {leagueList}
        </div>
      </div>
    );
  }

}

export default League;
