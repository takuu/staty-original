import React, { PropTypes } from 'react';

import './styles.css';
import _ from 'lodash';
import SubHeader from '../../components/SubHeader/SubHeader.js';
import DivisionList from '../../components/core/DivisionList/DivisionList';
import { getLeagueByName } from '../../actions/leagues';
import { getActiveDivisionByLeagueId } from '../../actions/divisionActions';
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
export default class LeagueLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    league: PropTypes.object,
    divisions: PropTypes.array
  };
  static fillStore (redux, route) {
  }
  componentWillReceiveProps(nextProps) {
    const { league, getActiveDivisionByLeagueId } = nextProps;

    // Fetch if the _id don't match and if length == 0
    const shouldFetch =
      !_.isEqualWith(nextProps.divisions, this.props.divisions, (a, b) => {
        return a._id == b._id;
      }) || nextProps.divisions.length==0;

    // TODO: currently called twice, fix so it's only called once
    if(league && shouldFetch) {
      getActiveDivisionByLeagueId(league._id);
    }
  }

  render() {
    const {league, divisions, params} = this.props;
    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {league: league});
    });
    const currentDivision = _.find(divisions, {_id: params.divisionId});
    return (
      <div>
        <div className='col-md-4 col-xs-4' style={{margin: '20px 0px'}}>
          <div className='sub-container'>
            <div className='sub-title-container'>
              <div className='sub-title'>Leagues</div>
            </div>
            <div>
              <DivisionList league={league} divisions={divisions} currentDivision={currentDivision}></DivisionList>
            </div>
          </div>
        </div>
        <div className="col-md-8 col-xs-8" style={{margin: '21px 0px'}}>
          {childrenWithProps}
        </div>
      </div>
    );
  }
}