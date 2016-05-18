import React, { PropTypes } from 'react';

// import './styles.css';
if (process.env.BROWSER) require('./styles.css');
import _ from 'lodash';
import PlayerList from '../../components/core/PlayerList/PlayerList';
import { getUserProfile } from '../../actions/userActions';
import { getStatsByPlayerListId } from '../../actions/statActions';
import helpers from '../../utils/helpers';
import { connect } from 'react-redux';

//"/profile"

@connect((state,router) => {
  const { user } = state;

  const watchList = _.cloneDeep(user.players);

  const list = _.map(watchList, '_id');
  const statsJS = state.stats.toJS();
  const stats = _.filter(statsJS, (stat) => {
    // return !!_.find(list, helpers.getObjId(stat.player));
    return list.indexOf(helpers.getObjId(stat.player)) >= 0;
  });
  debugger;

  return {watchList, user, stats};
}, {
  getUserProfile
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
    const { user } = this.props;
    // return Promise.all([
    //   redux.dispatch(getUserProfile())
    // ]);
  }
  componentWillReceiveProps(nextProps) {
    const {dispatch, watchList, user, stats} = nextProps;

    const list = _.map(watchList, '_id');
    if (list.length && !stats.length) return dispatch(getStatsByPlayerListId(list));
  }

  // shouldComponentUpdate(a, b) {
  //   const {dispatch, watchList, user} = this.props;
  // }

  render () {
    const {dispatch, watchList, user} = this.props;
    debugger;
    var childrenWithProps = (watchList.length) ? React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {user: user, watchList: watchList});
    }) : null;
    // debugger;
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
