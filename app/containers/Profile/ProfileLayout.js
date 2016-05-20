import React, { PropTypes } from 'react';

// import './styles.css';
if (process.env.BROWSER) require('./styles.css');
import _ from 'lodash';
import PlayerList from '../../components/core/PlayerList/PlayerList';
import { getUserProfile, getUserStats } from '../../actions/userActions';
import { getStatsByPlayerListId } from '../../actions/statActions';
import helpers from '../../utils/helpers';
import { connect } from 'react-redux';

//"/profile"

@connect((state,router) => {
  const { user } = state;
  const { id } = router.location.query;
  // const list = id.split(',');

  const watchList = _.cloneDeep(user.players);

  const list = _.map(watchList, '_id');
  const statsJS = state.stats.toJS();
  const stats = _.filter(statsJS, (stat) => {
    return list.indexOf(helpers.getObjId(stat.player)) >= 0;
  });

  return {watchList, user, stats};
}, {
  getStatsByPlayerListId,
  getUserStats
})
export default class PlayerLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    user: PropTypes.object,
    watchList: PropTypes.array,
    stats: PropTypes.array
  };
  static defaultProps = {
    watchList: [],
    user: {},
    children: [],
    stats: []
  };
  static fillStore (redux, router) {
    const { id } = router.location.query;
    // const playerList = id.split(',');
    return redux.dispatch(getUserStats());
    // return redux.dispatch(getStatsByPlayerListId(playerList));
  }

  render () {
    const {dispatch, watchList, user, stats} = this.props;
    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {user: user, watchList: watchList, stats: stats});
    });
    return (
      <div>
        <div className='page-content'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-12 col-xs-12'>
                <div className='portlet light portlet-fit portlet datatable'>
                  <div className='row' style={{backgroundColor: '#eff3f8'}}>
                    <div>
                      <div className='col-md-4 col-xs-4' style={{margin: '20px 0px'}}>
                        <div className='sub-container'>
                          <div className='sub-title-container'>WATCH LIST</div>
                          <div>
                            <PlayerList players={watchList} dispatch={dispatch} watchList={watchList} user={user} />
                          </div>
                        </div>
                      </div>
                      <div className='col-md-8 col-xs-8' style={{margin: '21px 0px'}}>
                        {childrenWithProps}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
