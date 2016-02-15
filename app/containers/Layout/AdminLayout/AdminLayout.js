import React, { PropTypes } from 'react';

import './styles.css';
import _ from 'lodash';
import { getLeagueByName } from '../../../actions/leagues';
import SideNav from '../../../components/LeagueAdmin/SideNav/SideNav';
import { connect } from 'react-redux';

@connect((state,router) => {
  const leagueName = router.params.leagueName;
  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  return {league: league, params: router.params};
}, {
  getLeagueByName
})
export default class AdminLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    league: PropTypes.object
  };
  static fillStore (redux, route) {
    let leagueName = route.params.leagueName;
    return redux.dispatch(getLeagueByName(leagueName));
  }

  render() {
    const {league, params} = this.props;
    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {league: league});
    });
    return (
      <div>
        <div className='col-md-3 col-xs-3' style={{margin: '20px 0px'}}>
          <div className='sub-container'>
            <div className='sub-title-container'>
              <div className='sub-title'>Main</div>
            </div>
            <div>
              <SideNav league={league} />
            </div>
          </div>
        </div>
        <div className="col-md-9 col-xs-9" style={{margin: '21px 0px'}}>
          {childrenWithProps}
        </div>
      </div>
    );
  }
}