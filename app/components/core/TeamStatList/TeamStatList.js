import React, { PropTypes } from 'react';
import './styles.css';
import _ from 'lodash';
import { Link } from 'react-router';
import statParser from '../../../utils/statParser';
import { createPlayerUrl } from '../../../utils/createLinks';
import Loader from '../../Loader/Loader';

const TeamStatList = ({stats, league, players}) =>  {
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

          return (
            <tr key={player._id}>

              <th className='name' style={{'borderBottom': '1px solid #ddd'}}><Link to={_createPlayerUrl(league, player)}>{player.player && player.player.name}</Link></th>

              <td>{player.gameCount}</td>
              <td>{player.avgFieldGoalsMade}</td>
              <td>{player.avgFieldGoalsAttempted}</td>
              <td>{(player.fieldGoalPercentage >= 0) ? player.fieldGoalPercentage : '-'}</td>
              <td>{player.avgThreePointsMade}</td>
              <td>{player.avgThreePointsAttempted}</td>
              <td>{(player.threePointPercentage >= 0) ? player.threePointPercentage : '-'}</td>
              <td>{player.avgFreeThrowsMade}</td>
              <td>{player.avgFreeThrowsAttempted}</td>
              <td>{(player.freeThrowsPercentage >= 0) ? player.freeThrowsPercentage : '-'}</td>
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
      </tbody>
    </table>

  );
  function _createPlayerUrl (league = {}, player = {}) {
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
