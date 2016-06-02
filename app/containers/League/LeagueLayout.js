import React, { PropTypes } from 'react';

// import './styles.css';
if (process.env.BROWSER) require('./styles.css');
import _ from 'lodash';
import SubHeader from '../../components/SubHeader/SubHeader.js';
//import DivisionList from '../../../components/core/DivisionList/DivisionList';
import { getLeagueByName } from '../../actions/leagues';
import { connect } from 'react-redux';

@connect((state, router) => {
  const leagueName = router.params.leagueName;
  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  return {league: league}
}, {
  getLeagueByName
})
export default class LeagueLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    league: PropTypes.object,
    dispatch: PropTypes.func
  };
  static fillStore(redux, route) {
    let leagueName = route.params.leagueName;
    return redux.dispatch(getLeagueByName(leagueName));
  }

  render () {
    const {league, dispatch, user} = this.props;
    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { league: league, dispatch: dispatch, user: user });
    });

    return (
      <div>
        <SubHeader league={league}></SubHeader>
        <div className='page-content'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-12 col-xs-12'>
                <div className='portlet light portlet-fit portlet datatable'>
                  <div className='row' style={{backgroundColor: '#eff3f8'}}>
                    {childrenWithProps}
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

