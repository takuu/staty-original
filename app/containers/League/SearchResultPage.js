import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import './styles.css';
if (process.env.BROWSER) require('./styles.css');
import { searchPlayer } from '../../actions/playerActions';
import { getLeagueByName } from '../../actions/leagues'
import PlayerList from '../../components/core/PlayerList/PlayerList';


@connect((state,router) => {
  const leagueName = router.params.leagueName;
  const searchName = router.params.searchName;
  const teamId = router.params.teamId;

  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  const playersJS = state.players.toJS();
  const players = _.filter(playersJS, {searchName: searchName});

  return {league: league, players: players, router: router}
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
    players: PropTypes.array,
    dispatch: PropTypes.func,
    params: PropTypes.object
  };

  state = {
    name: '',
    isTouched: false
  };

  handleChange = field => e => {
    e.preventDefault();
    this.setState({ [field]: e.target.value, isTouched: true });
  };

  handleSearch = e => {
    e.preventDefault();
    const { name } = this.state;
    const { leagueName } = this.props.params;

    this.props.history.push(`/${leagueName}/search/${name}`);
    this.props.dispatch(searchPlayer(name));
  }

  static fillStore(redux, route, foo) {
    const leagueName = route.params.leagueName;
    const searchName = route.params.searchName;
    redux.dispatch(searchPlayer(searchName));

    return redux.dispatch(getLeagueByName(leagueName));
  }
  render () {
    const {players, league, params: {searchName}} = this.props;
    const {name, isTouched} = this.state;

    let viewed = (isTouched) ? name : searchName;
    return (

      <div>
        <div className="portlet-title">
          <div className="page-title">Search</div>
        </div>


        <div className="row" style={{backgroundColor: '#eff3f8'}}>
          <div className="col-md-12 col-xs-12" style={{margin: '20px 0px'}}>

              <div id="custom-search-input">
                <div className="input-group col-md-12" style={{padding: '20px'}}>
                  <input type="text" className="form-control input-lg" placeholder="Player" onChange={this.handleChange('name')} value={viewed} />
                  <span className="input-group-btn">
                    <button className="btn btn-info btn-lg" type="button" onClick={this.handleSearch} >
                      <i className="glyphicon glyphicon-search"></i>
                    </button>
                  </span>
                </div>
              </div>
          </div>
        </div>
        <div className="row" style={{backgroundColor: '#eff3f8'}}>

          <div className="col-md-12 col-xs-12" style={{margin: '10px 0px'}}>

          <div className="sub-container">
            <div className="sub-title-container">
              <div className="sub-title">Search results for "{searchName}"</div>
            </div>
            <PlayerList players={players} league={league} />
          </div>


          <div className="col-md-7 col-xs-7" style={{margin: '20px 0px'}}>
          </div>
        </div>
          </div>








      </div>

    );
  }

}

export default SearchResultPage;
