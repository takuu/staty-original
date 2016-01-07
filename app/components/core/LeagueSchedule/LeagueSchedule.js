import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import statParser from '../../../utils/statParser';

export default class Schedule extends React.Component {
  static propTypes = {
    games: PropTypes.array,
    league: PropTypes.object
  };
  static defaultProps = {
    games: [],
    league: {}
  };

  render() {
    const schedule = statParser.createSchedule(this.props.games);
    return (
      <div>
        {
          _.map(Object.keys(schedule), (key) => {
            let list = schedule[key];
            return _.map(list, (game) => {
              return (
                <table className="table">
                  <thead>
                  <tr>
                    <td><b>{key}</b></td>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>
                      {game.time}
                    </td>
                    <td>
                      <Link to={"/" + this.props.league.name + "/team/" + game.homeTeam._id} >{game.homeTeam.name}</Link>
                    </td>
                    <td>vs</td>
                    <td>
                      <Link to={"/" + this.props.league.name + "/team/" + game.awayTeam._id} >{game.awayTeam.name}</Link>
                    </td>
                    <td>
                      Mark Keppel High School
                    </td>
                  </tr>
                  </tbody>
                </table>
              )
            });

          })
        }
      </div>
    );
  }
}