import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LeagueList from '../components/LeagueList/LeagueList';
import {
  getAllLeagues
} from '../actions/leagues';

@connect(state => ({
  leagues: state.leagues.toArray()
}), {
  getAllLeagues
})
export default class LeagueListRoute extends React.Component {
  static propTypes = {
    leagues: PropTypes.array.isRequired
  };

  static fillStore(redux) {
    return redux.dispatch(getAllLeagues());
  }

  render() {
    const leagues = this.props.leagues;

    return (
      <LeagueList
        leagues={leagues}
      />
    );
  }
}
