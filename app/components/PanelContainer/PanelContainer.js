import React, { PropTypes } from 'react';

import './styles.css';
import _ from 'lodash';
import SubHeader from '../../components/SubHeader/SubHeader.js';
import { getLeagueByName } from '../../actions/leagues';
import { connect } from 'react-redux';

@connect((state,router) => {
  const leagueName = router.params.leagueName;
  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});
  return {league: league}
}, {
  getLeagueByName
})
export default class PanelContainer extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    league: PropTypes.object.isRequired
  };
  static fillStore(redux, route) {
    let leagueName = route.params.leagueName;
    return redux.dispatch(getLeagueByName(leagueName));
  }
  render() {
    const {league} = this.props;
    return (
      <div>
        <div className="page-head">
          <div className="container">
            <SubHeader league={league}></SubHeader>
          </div>
        </div>
        <div className="page-content">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col xs-12">
                <div className="portlet light portlet-fit portlet datatable">
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }
}


