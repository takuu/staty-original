import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import statParser from '../../../utils/statParser';
import helper from '../../../utils/helpers';

export default class PlayerList extends React.Component {
  static propTypes = {
    players: PropTypes.array,
    team: PropTypes.object,
    league: PropTypes.object
  };
  static defaultProps = {
    players: [],
    team: {},
    league: {}
  };

  render() {
    const {players, team, league} = this.props;
    let hasNumber = helper.doesKeyExistInList(players, 'number');
    let hasName = helper.doesKeyExistInList(players, 'name');
    let hasPos = helper.doesKeyExistInList(players, 'position');
    let hasHeight = helper.doesKeyExistInList(players, 'height');

    return (
      <div className="sub-container">
        <div className="sub-title-container">
          <div className="sub-title">Roster</div>
        </div>
        <table className="table">
          {
            _.map(players, (player) => {
              let playerUrl = "/" + league.name +
                "/team/" + team._id + "/player/" + player._id;
              return (
                <tr>
                  {(hasNumber) ? (<td>{player.number || '-'}</td>): ''}
                  {(hasName) ? (<td><Link to={playerUrl}>{player.name || '-'}</Link></td>): ''}
                  {(hasPos) ? (<td>{player.position || '-'}</td>): ''}
                  {(hasHeight) ? (<td>{player.height || '-'}</td>): ''}
                </tr>
              )
            })
          }
        </table>
      </div>
    );
  }
}