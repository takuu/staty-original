import React, { PropTypes } from 'react';

import './styles.css';
import _ from 'lodash';
import SubHeader from '../../../components/SubHeader/SubHeader.js';
import { getLeagueByName } from '../../../actions/leagues';
import { getGamesByDivisionId } from '../../../actions/gameActions';
import Standings from '../../../components/core/Standings/Standings.js';
import { connect } from 'react-redux';

//":leagueName/division/:divisionId/game/:gameId"

@connect((state,router) => {
  const {leagueName, divisionId, gameId} = router.params;
  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  const gamesJS = state.games.toJS();
  const games = _.filter(gamesJS, (game) => {
    return game.division === divisionId;
  });
  debugger;

  return {league: league, games: games, params: router.params}
}, {
  getLeagueByName,
  getGamesByDivisionId
})
export default class GameLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    league: PropTypes.object,
    games: PropTypes.array
  };
  static fillStore (redux, router) {
    const {divisionId} = router.params;
    redux.dispatch(getGamesByDivisionId(divisionId));
  }

  render() {
    const {league, games, params} = this.props;
    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {league: league});
    });

    //debugger;
    return (
      <div>
        <div className='col-md-4 col-xs-4' style={{margin: '20px 0px'}}>
          <div className='sub-container'>
            <div className='sub-title-container'>
              <div className='sub-title'>Standings</div>
            </div>
            <div>
              <Standings league={league} games={games} />
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