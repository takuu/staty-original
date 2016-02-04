//import styles from './styles.styl';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import statParser from '../../../utils/statParser';

//@CSSModules(styles)
export default class Standings extends React.Component {
  static propTypes = {
    games: PropTypes.array,
    league: PropTypes.object
  };
  static defaultProps = {
    games: [],
    league: {}
  };

  render() {
    const {games, league} = this.props;
    const standings = statParser.createStandings(games);

    return (
      <table className="table">
        <tbody>
        {
          _.map(standings, (team) => {
            return (
              <tr>
                <td>
                  <Link key={team._id} to={"/" + league.name + "/league/" + league._id + "/team/" + team.id} >{team.name}</Link>
                </td>
                <td>{team.win}-{team.loss}</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    );
  }
}