import React, { PropTypes } from 'react';

// import './styles.css';
if (process.env.BROWSER) require('./styles.css');
import _ from 'lodash';
import PlayerList from '../../components/core/PlayerList/PlayerList';
import { fetchWatchList } from '../../actions/userActions';
import { connect } from 'react-redux';

//"/profile"

@connect((state,router) => {

  const watchList = _.cloneDeep(state.user.players);
  return {watchList: watchList};
}, {
  fetchWatchList
})
export default class PlayerLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    user: PropTypes.object,
    watchList: PropTypes.array
  };
  static fillStore (redux, router) {
    // const {playerId, teamId} = router.params;
    return Promise.all([
      redux.dispatch(fetchWatchList())
    ]);
  }
  componentWillReceiveProps(a, b) {
    const {dispatch, watchList, user} = this.props;
    debugger;

  }

  shouldComponentUpdate(a, b) {
    const {dispatch, watchList, user} = this.props;
    debugger;
  }

  render () {
    const {dispatch, watchList, user} = this.props;
    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {user: user});
    });
    debugger;
    return (
      <div>
        <div className='col-md-4 col-xs-4' style={{margin: '20px 0px'}}>
          <div className='sub-container'>
            <div className='sub-title-container'>
            </div>
            <div>
              <PlayerList players={watchList} dispatch={dispatch} watchList={watchList} user={user} />
            </div>
          </div>
        </div>
        <div className='col-md-8 col-xs-8' style={{margin: '21px 0px'}}>
          {childrenWithProps}
        </div>
      </div>
    );
  }
}
