import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LeagueList from '../components/LeagueList/LeagueList';
import GoogleMap from 'google-map-react';
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
    leagues: PropTypes.array.isRequired,
    center: {lat: 59.938043, lng: 30.337157},
    zoom: 9,
    greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
  };

  static fillStore (redux) {
    return redux.dispatch(getAllLeagues());
  }

  render () {
    const { leagues } = this.props;

    return (
      <div>
        <LeagueList leagues={leagues} />
        <div style={{'backgroundColor': '#fff', 'width': '100%', 'height': '500px'}}></div>
        <GoogleMap
          apiKey={'Browser key 1'}
          center={{lat: 59.938043, lng: 30.337157}}
          zoom={9}>

        </GoogleMap>

      </div>

    );
  }
}
