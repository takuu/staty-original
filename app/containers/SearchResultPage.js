import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { searchPlayer } from '../actions/playerActions';
import { getLeagueByName } from '../actions/leagues'
import PlayerList from '../components/core/PlayerList/PlayerList';


@connect((state,router) => {
  const leagueName = router.params.leagueName;
  const searchName = router.params.searchName;
  const teamId = router.params.teamId;

  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  const playersJS = state.players.toJS();
  const players = _.map(playersJS, (player)=>{return player});

  return {league: league, players: players}
}, {
  getLeagueByName,
  searchPlayer
})
class SearchResultPage extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    league: PropTypes.object,
    players: PropTypes.array
  };

  static fillStore(redux, route) {
    const leagueName = route.params.leagueName;
    const searchName = route.params.searchName;
    redux.dispatch(searchPlayer(searchName));
    return redux.dispatch(getLeagueByName(leagueName));
  }
  render() {
    let {league, players} = this.props;

    return (

    <div>
      <div className="portlet-title">
        <div className="page-title">Search Results</div>
      </div>
      <div className="row" style={{backgroundColor: '#eff3f8'}}>

        <div className="col-md-5 col-xs-5" style={{margin: '20px 0px'}}>
          <div className="sub-container">
            <div className="sub-title-container">
              <div className="sub-title">Search results for ""</div>
            </div>
            <PlayerList players={players} league={league} />
          </div>
        </div>

        <div className="col-md-7 col-xs-7" style={{margin: '20px 0px'}}>
        </div>
      </div>

    </div>

    );
  }

}

export default SearchResultPage;
