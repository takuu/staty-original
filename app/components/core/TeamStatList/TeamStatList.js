import React, { PropTypes } from 'react';
// import './styles.css';
if (process.env.BROWSER) require('./styles.css');
import _ from 'lodash';
import { Link } from 'react-router';
import statParser from '../../../utils/statParser';
import createLinks from '../../../utils/createLinks';
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
        _.map(playerSummaryList, (stat, index) => {
          let {player} = stat;

          return (
            <tr key={index}>

              <th className='name' style={{'borderBottom': '1px solid #ddd'}}><Link to={createLinks.createPlayerUrl(league, player)}>{player && player.name}</Link></th>

              <td>{stat.gameCount}</td>
              <td>{stat.avgFieldGoalsMade}</td>
              <td>{stat.avgFieldGoalsAttempted}</td>
              <td>{(stat.fieldGoalPercentage >= 0) ? stat.fieldGoalPercentage : '-'}</td>
              <td>{stat.avgThreePointsMade}</td>
              <td>{stat.avgThreePointsAttempted}</td>
              <td>{(stat.threePointPercentage >= 0) ? stat.threePointPercentage : '-'}</td>
              <td>{stat.avgFreeThrowsMade}</td>
              <td>{stat.avgFreeThrowsAttempted}</td>
              <td>{(stat.freeThrowsPercentage >= 0) ? stat.freeThrowsPercentage : '-'}</td>
              <td>{stat.avgRebounds}</td>
              <td>{stat.avgAssists}</td>
              <td>{stat.avgSteals}</td>
              <td>{stat.avgBlocks}</td>
              <td>{stat.avgFouls}</td>
              <td>{stat.avgPoints}</td>
            </tr>
          );
        })
      }
      </tbody>
    </table>
  );

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
