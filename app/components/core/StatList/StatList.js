import React, { PropTypes } from 'react';
import styles from './styles.css';
import _ from 'lodash';
import { Link } from 'react-router';
import statParser from '../../../utils/statParser';
import { createPlayerUrl } from '../../../utils/createLinks';
import Loader from '../../Loader/Loader';



const StatList = ({stats, league}) =>  {
    let combined = {};
    let statsLength = stats.length;

    if(statsLength) {
      combined = statParser.combineStats(stats);
    }

  /*return (
    <div>
      <ul className='list-group'>
        {
          <tr>
            <td>Num</td>
            <td>Player</td>
            <td>FGM</td>
            <td>FGA</td>
            <td>FG%</td>
            <td>3PM</td>
            <td>3PA</td>
            <td>3PT%</td>
            <td>FTM</td>
            <td>FTA</td>
            <td>FT%</td>
            <td>REB</td>
            <td>AST</td>
            <td>ST</td>
            <td>BS</td>
            <td>PF</td>
            <td>PTS</td>
          </tr>
          _.map(stats, (player) => {
            let {player: {number, name}, fieldGoalsMade, fieldGoalsAttempted, fieldGoalsMade,threePointsMade, threePointsAttempted
              freeThrowsMade, freeThrowsAttempted, assists, steals, blocks, fouls, points} = player;
            <li key={player._id}>
              <span>{number}</span>
              <span>{name}</span>

              <span>{fieldGoalsMade}</span>
              <span>{fieldGoalsAttempted}</span>

              <span>{statParser.shootingPercentage(fieldGoalsMade,fieldGoalsMade)}</span>

              <span>{threePointsMade}</span>
              <span>{threePointsAttempted}</span>
              <span>{statParser.shootingPercentage(threePointsMade, threePointsAttempted)}</span>
              <span>{freeThrowsMade}</span>
              <span>{freeThrowsAttempted}</span>
              <span>{statParser.shootingPercentage(freeThrowsMade, freeThrowsAttempted)}</span>
              <span>{totalRebounds}</span>
              <span>{assists}</span>
              <span>{steals}</span>
              <span>{blocks}</span>
              <span>{fouls}</span>
              <span>{points}</span>

            </li>
          })
        }
      </ul>
    </div>
  )*/

    return (
    <table className='table' style={{fontSize: '.7em'}}>
      <thead>
        <tr>

          <th></th>
          <th>FGM</th>
          <th>FGA</th>
          <th>FG%</th>
          <th>3PM</th>
          <th>3PA</th>
          <th>3PT%</th>
          <th>FTM</th>
          <th>FTA</th>
          <th>FT%</th>
          <th>REB</th>
          <th>AST</th>
          <th>ST</th>
          <th>BS</th>
          <th>PF</th>
          <th>PTS</th>
        </tr>
      </thead>


      <tbody>
      {
        _.map(stats, (player) => {

          return (
            <tr key={player._id}>

              <th className='name'><Link to={_createPlayerUrl(league, player)}>{player.player.name}</Link></th>

              <td>{player.fieldGoalsMade}</td>
              <td>{player.fieldGoalsAttempted}</td>

              <td>{statParser.shootingPercentage(player.fieldGoalsMade, player.fieldGoalsAttempted)}</td>

              <td>{player.threePointsMade}</td>
              <td>{player.threePointsAttempted}</td>
              <td>{statParser.shootingPercentage(player.threePointsMade, player.threePointsAttempted)}</td>
              <td>{player.freeThrowsMade}</td>
              <td>{player.freeThrowsAttempted}</td>
              <td>{statParser.shootingPercentage(player.freeThrowsMade, player.freeThrowsAttempted)}</td>
              <td>{player.totalRebounds}</td>
              <td>{player.assists}</td>
              <td>{player.steals}</td>
              <td>{player.blocks}</td>
              <td>{player.fouls}</td>
              <td>{player.points}</td>

            </tr>
          )
        })
      }
    {

      <tr style={{fontWeight: 'bold'}}>
        <th style={{'borderBottom': '1px solid #ddd'}}>Total</th>
        <td>{combined.fieldGoalsMade || '-'}</td>
        <td>{combined.fieldGoalsAttempted}</td>
        <td>{((combined.fieldGoalsMade) / (combined.fieldGoalsAttempted) * 100).toFixed(1)}</td>

        <td>{combined.threePointsMade}</td>
        <td>{combined.threePointsAttempted}</td>
        <td>{((combined.threePointsMade/combined.threePointsAttempted) * 100).toFixed(1)}</td>

        <td>{combined.freeThrowsMade}</td>
        <td>{combined.freeThrowsAttempted}</td>
        <td>{((combined.freeThrowsMade/combined.freeThrowsAttempted) * 100).toFixed(1)}</td>
        <td>{combined.totalRebounds}</td>
        <td>{combined.assists}</td>
        <td>{combined.steals}</td>
        <td>{combined.blocks}</td>
        <td>{combined.fouls}</td>
        <td>{combined.points}</td>
      </tr>
    }

      </tbody>
    </table>

    )
  function _createPlayerUrl(league, player) {
    return (player) ? `/${league.name}/team/${player.team._id}/player/${player._id}` : '#';
  }

}

StatList.propTypes = {
  stats: PropTypes.array,
  league: PropTypes.object
};
StatList.defaultProps = {
  stats: [],
  league: {}
};

export default StatList;
