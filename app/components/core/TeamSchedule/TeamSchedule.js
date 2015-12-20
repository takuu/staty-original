import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import statParser from '../../../utils/statParser';

export default class TeamSchedule extends React.Component {
  static propTypes = {
    games: PropTypes.array,
    league: PropTypes.object
  };
  static defaultProps = {
    games: [],
    league: {}
  };

  render() {
    return (

        <table className="table">
        {
          _.map(this.props.games, (game) => {

            let boxScore = (game.isUpdated) && game.homeScore + '-' + game.awayScore;
            let gameTime = game.time || '-';
            let gameLink = "/" + game.league.name + '/division/' + game.division + "/game/" + game._id;
            let gameDate = new Date(game.date);
            let awayTeamLink = "/" + game.league.name + '/team/' + game.awayTeam._id;
            let homeTeamLink = "/" + game.league.name + '/team/' + game.homeTeam._id;

            let oldGame = (gameDate < new Date())? 'lighter': 'dark';
            let homeWin = (boxScore && game.homeScore > game.awayScore) ? 'bold': '';
            let awayWin = (boxScore && game.homeScore < game.awayScore) ? 'bold': '';
            return (
              <tr>
                <td className={oldGame}>{gameDate.toDateString()}</td>
                <td className={oldGame}>{gameTime}</td>
                <td><Link className={homeWin} to={homeTeamLink}>{game.homeTeam.name}</Link></td>
                <td><Link to={gameLink}>{boxScore}</Link></td>
                <td><Link className={awayWin} to={awayTeamLink}>{game.awayTeam.name}</Link></td>
              </tr>
            );
          })
        }
        </table>
    );
  }
}