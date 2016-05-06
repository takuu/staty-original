import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import statParser from '../../../utils/statParser';
import GameDayList from '../../core/GameDayList/GameDayList';
import _ from 'lodash';

const Schedule = ({league, games}) => {

  const schedule = statParser.createSchedule(games);
  //debugger;

  return (
    <div>
      {
        _.map(Object.keys(schedule), (date) => {
          let games = schedule[date];
          return (
            <GameDayList games={games} date={date} league={league} />
          );
        })
      }
      </div>
  )
  let old = (
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
                    <Link to={"/" + league.name + "/team/" + game.homeTeam._id} >{game.homeTeam.name}</Link>
                  </td>
                  <td>vs</td>
                  <td>
                    <Link to={"/" + league.name + "/team/" + game.awayTeam._id} >{game.awayTeam.name}</Link>
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

Schedule.propTypes = {
  games: PropTypes.array,
  league: PropTypes.object
};

Schedule.defaultProps = {
  games: [],
  league: {}
};
export default Schedule;