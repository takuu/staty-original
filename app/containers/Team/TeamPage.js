import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import PlayerList from '../../components/core/PlayerList/PlayerList';
import TeamSchedule from '../../components/core/TeamSchedule/TeamSchedule';
import _ from 'lodash';
import classNames from 'classnames';
import { Link } from 'react-router';
import createLinks from '../../utils/createLinks';

class TeamPage extends React.Component {
  constructor (props) {
    super(props);
  }

  static propTypes = {
    league: PropTypes.object,
    team: PropTypes.object,
    path: PropTypes.string
  };

  static defaultProps = {
    league: {},
    team: {},
    path: ''
  };
  render () {
    let {league, team, path, dispatch} = this.props;

    let {division} = team || {};

    let gameUrl = createLinks.createTeamLink(league, team);
    let rosterUrl = createLinks.createTeamLink(league, team) + '/roster';
    let standingUrl = createLinks.createTeamLink(league, team) + '/team-stats';

    let urlParts = path.split('/');
    let routeName = urlParts[urlParts.length - 1];
    let gamesClass = classNames({
      'active': routeName === team._id || routeName === ''
    });
    let rosterClass = classNames({
      'active': routeName === 'roster'
    });
    let teamStatsClass = classNames({
      'active': routeName === 'team-stats'
    });

    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {league: league, dispatch: dispatch});
    });

    return (
      <div>
        <div className='portlet-title'>
          <div className='page-title'>
            <span>{team && team.name}</span>
            <Link to={createLinks.createDivisionLink(league, division)}>
              <span style={{'marginLeft': '40px', 'fontSize': '.9em'}}>{division && division.name}</span>
            </Link>

          </div>
        </div>
        <div className='row' style={{backgroundColor: '#eff3f8'}}>
          <div className='col-md-12 col-xs-12' style={{margin: '20px 0px'}}>
            <div className='sub-container'>
              <div className='sub-title-container'>
                <div className='container'>
                  <div className='col-md-6 col-xs-12'>
                    <ul className='nav nav-tabs nav-justified'>
                      <li role='presentation' className={gamesClass}>
                        <Link to={gameUrl}><div className='sub-title'>Games</div></Link>
                      </li>
                      <li role='presentation' className={rosterClass}>
                        <Link to={rosterUrl}><div className='sub-title'>Roster</div></Link>
                      </li>
                      <li role='presentation' className={teamStatsClass}>
                        <Link to={standingUrl}><div className='sub-title'>Team Stats</div></Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div style={{padding: '10px'}}>
                {childrenWithProps}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeamPage;
