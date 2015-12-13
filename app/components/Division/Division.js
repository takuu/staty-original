import global from '../../styles/global.styl';
import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import styles from './styles.styl';
import Standings from '../core/Standings/Standings';
import Schedule from '../core/Schedule/Schedule';
import CSSModules from 'react-css-modules';
import _ from 'lodash';

@CSSModules(global)
@CSSModules(styles)
class Division extends React.Component {
  static propTypes = {
    league: PropTypes.object,
    games: PropTypes.array,
    teams: PropTypes.array,
    division: PropTypes.object
  };
  static defaultProps = {
    league: {},
    games: [],
    teams: [],
    division: {}
  };
  render() {
    let {league, division, games, teams} = this.props;

    return (
      <div className="DivisionPage">
        <div className="DivisionPage-container">
          <h1 styleName="taku">{league && league.name}</h1>
          {division && division.name}
          <Standings league={league} games={games} />
          <Schedule league={league} games={games} />
        </div>
      </div>
    );
  }

}

export default Division;
