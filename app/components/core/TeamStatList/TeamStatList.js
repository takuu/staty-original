import React, { PropTypes } from 'react';
import './styles.css';
import _ from 'lodash';
import { Link } from 'react-router';
import statParser from '../../../utils/statParser';
import { createPlayerUrl } from '../../../utils/createLinks';
import Loader from '../../Loader/Loader';

const TeamStatList = ({stats, league, players}) =>  {
  let combined = {};
  let playerSummaryList = statParser.playerListCummulativeStats(stats, players);

  return (
    <table className='table' style={{fontSize: '.7em'}}>
      <thead>
      <tr>
        <th></th>
        <th>G</th>
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
        _.map(playerSummaryList, (player) => {
          /*let result = {
            gameCount: player.gameCount,
            avgFieldGoalsMade: (player.fieldGoalsMade / player.gameCount).toFixed(1),
            avgFieldGoalsAttempted: (player.fieldGoalsAttempted / player.gameCount).toFixed(1),
            fieldGoalPercentage: statParser.shootingPercentage(player.fieldGoalsMade, player.fieldGoalsAttempted),
            avgThreePointsMade: (player.threePointsMade / player.gameCount).toFixed(1),
            avgThreePointsAttempted: (player.threePointsAttempted / player.gameCount).toFixed(1),
            threePointPercentage: statParser.shootingPercentage(player.threePointsMade, player.threePointsAttempted),
            freeThrowsMade: (player.freeThrowsMade / player.gameCount).toFixed(1),
            freeThrowsAttempted: (player.freeThrowsAttempted / player.gameCount).toFixed(1),
            freeThrowsPercentage: statParser.shootingPercentage(player.freeThrowsMade, player.freeThrowsAttempted),
            avgRebounds: (player.totalRebounds / player.gameCount).toFixed(1),
            avgAssists: (player.assists / player.gameCount).toFixed(1),
            avgSteals: (player.steals / player.gameCount).toFixed(1),
            avgBlocks: (player.blocks / player.gameCount).toFixed(1),
            avgFouls: (player.fouls / player.gameCount).toFixed(1),
            avgPoints: (player.points / player.gameCount).toFixed(1)
          }*/

          return (
            <tr key={player._id}>

              <th className='name'><Link to={_createPlayerUrl(league, player)}>{player.player && player.player.name}</Link></th>

              <td>{player.gameCount}</td>
              <td>{player.avgFieldGoalsMade}</td>
              <td>{player.avgFieldGoalsAttempted}</td>

              <td>{player.fieldGoalPercentage || '-'}</td>

              <td>{player.avgThreePointsMade}</td>
              <td>{player.avgThreePointsAttempted}</td>
              <td>{player.threePointPercentage|| '-'}</td>
              <td>{player.avgFreeThrowsMade}</td>
              <td>{player.avgFreeThrowsAttempted}</td>
              <td>{player.freeThrowsPercentage|| '-'}</td>
              <td>{player.avgRebounds}</td>
              <td>{player.avgAssists}</td>
              <td>{player.avgSteals}</td>
              <td>{player.avgBlocks}</td>
              <td>{player.avgFouls}</td>
              <td>{player.avgPoints}</td>
            </tr>
          );
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
  function _createPlayerUrl(league = {}, player = {}) {
    let teamId = player.team && player.team._id;
    return (player) ? `/${league.name}/team/${teamId}/player/${player._id}` : '#';
  }

};

TeamStatList.propTypes = {
  stats: PropTypes.array,
  players: PropTypes.array,
  league: PropTypes.object
};

TeamStatList.defaultProps = {
  stats: [],
  players: [],
  league: {}
};

export default TeamStatList;
