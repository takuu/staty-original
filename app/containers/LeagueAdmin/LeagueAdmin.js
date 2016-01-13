import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';


class LeagueAdmin extends React.Component {

  render() {
    return (
      <div className="sub-container">
      <div className="sub-title-container">
        <div className="sub-title">Dashboard</div>
      </div>
      <div className="row" style={{backgroundColor: '#eff3f8'}}>
        <div className="col-md-3 col-xs-3" style={{margin: '20px 0px'}}>
          <div className="sub-container">
            <div className="sub-title-container">
              <div className="sub-title">Main Navigation</div>
            </div>
            <div style={{padding: "10px"}}>
              <ul className="list-group">
                <li className="list-group-item">
                  Configuration</li>
                <li className="list-group-item">
                  <Link to={""}>Update League</Link>
                </li>
                <li className="list-group-item">Update Information</li>
                <li className="list-group-item">Update Rules</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-9 col-xs-9" style={{margin: '20px 0px'}}>
          <div className="sub-container">
            <div className="sub-title-container">
              <div className="sub-title">GET STARTED</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    );
  }
}

export default LeagueAdmin;
