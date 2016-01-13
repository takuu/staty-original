import React, { PropTypes } from 'react';
import { connect } from 'react-redux';


class LeagueAdmin extends React.Component {

  render() {
    return (
      <div>
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 col-xs-12">
                <div className="portlet light portlet-fit portlet datatable">
                  <div className="row" style={{backgroundColor: '#eff3f8'}}>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LeagueAdmin;
