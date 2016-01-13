import React, { PropTypes } from 'react';

import './styles.css';
import _ from 'lodash';
import SubHeader from '../../../components/SubHeader/SubHeader.js';
import DivisionList from '../../../components/core/DivisionList/DivisionList';
import { getLeagueByName } from '../../../actions/leagues';
import { getActiveDivisionByLeagueId } from '../../../actions/divisionActions';
import { connect } from 'react-redux';

@connect((state,router) => {
  const leagueName = router.params.leagueName;
  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  const divisionsJS = state.divisions.toJS();
  const divisions = _.map(divisionsJS, (division)=>{return division});

  return {league: league, divisions: divisions, params: router.params}
}, {
  getLeagueByName,
  getActiveDivisionByLeagueId
})
export default class PanelContainer extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    league: PropTypes.object.isRequired,
    divisions: PropTypes.array.isRequired
  };
  static fillStore(redux, route) {
    let leagueName = route.params.leagueName;
    return redux.dispatch(getLeagueByName(leagueName));
  }
  componentWillReceiveProps(nextProps) {
    const { league, getActiveDivisionByLeagueId } = nextProps;
    const shouldFetch =
      !_.isEqual(nextProps.divisions, this.props.divisions) ||
      nextProps.divisions.length==0;

    // TODO: currently called twice, fix so it's only called once
    if(league && shouldFetch) {
      getActiveDivisionByLeagueId(league._id);
    }
  }

  render() {
    const {league, divisions, params} = this.props;
    const currentDivision = _.find(divisions, {_id: params.divisionId});
    return (
      <div>
        <SubHeader league={league}></SubHeader>
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 col-xs-12">
                <div className="portlet light portlet-fit portlet datatable">
                  <div className="row" style={{backgroundColor: '#eff3f8'}}>
                    {this.props.children}
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


