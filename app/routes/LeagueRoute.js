import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import League from '../components/League/League';
import _ from 'lodash';

import { getLeagueByName } from '../actions/leagues';
import { getActiveDivisionByLeagueId } from '../actions/divisionActions';


@connect((state,router) => {
  const leagueName = router.params.leagueName;
  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  const divisionsJS = state.divisions.toJS();
  const divisions = _.map(divisionsJS, (division)=>{return division});

  return {league: league, divisions: divisions}
}, {
  getLeagueByName,
  getActiveDivisionByLeagueId
})
class LeagueRoute extends React.Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    league: PropTypes.object.isRequired,
    divisions: PropTypes.array.isRequired
  };

  static fillStore(redux) {
    return redux.dispatch(getLeagueByName('mofufus'));
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
    const league = this.props.league;
    const divisions = this.props.divisions;
    return (
      <div>
        <League league={league} divisions={divisions} />
      </div>
    );
  }
}




export default LeagueRoute;
