import React, { PropTypes } from 'react';

// import './styles.css';
if (process.env.BROWSER) require('./styles.css');
import _ from 'lodash';
import PlayerList from '../../components/core/PlayerList/PlayerList';
import { getUserProfile } from '../../actions/userActions';
import { connect } from 'react-redux';

//"/profile"

@connect((state,router) => {

  const watchList = _.cloneDeep(state.user.players);
  return {watchList: watchList};
}, {
  getUserProfile
})
export default class PlayerLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    user: PropTypes.object,
    watchList: PropTypes.array
  };
  static fillStore (redux, router) {
    // const {playerId, teamId} = router.params;
    // return Promise.all([
    //   redux.dispatch(getUserProfile())
    // ]);
  }
  // componentWillReceiveProps(a, b) {
  //   const {dispatch, watchList, user} = this.props;
  // }

  // shouldComponentUpdate(a, b) {
  //   const {dispatch, watchList, user} = this.props;
  // }

  render () {
    const {dispatch, watchList, user} = this.props;
    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {user: user});
    });
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
