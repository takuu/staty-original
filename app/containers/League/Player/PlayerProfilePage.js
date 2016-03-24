import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';


@connect((state, router) => {
  const {teamId, playerId} = router.params;

  const playersJS = state.players.toJS();
  const players = _.filter(playersJS, (player) => {
    return player.team._id === teamId;
  });

  return {players: players};
}, {
})
class PlayerProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    league: PropTypes.object,
    players: PropTypes.array
  };

  static fillStore (redux, route) {

  }

  render () {
    let {league, players} = this.props;
    return (
      <div>
        Profile stuff
      </div>
    );
  }
}

export default PlayerProfilePage;
