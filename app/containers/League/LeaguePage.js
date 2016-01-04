import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import League from '../../components/League/League';
import _ from 'lodash';
import {PanelContainer} from '../../components/PanelContainer/PanelContainer';
import DivisionList from '../../components/core/DivisionList/DivisionList.js';
import { getLeagueByName } from '../../actions/leagues';
import { getActiveDivisionByLeagueId } from '../../actions/divisionActions';


@connect((state,router) => {
  const leagueName = router.params.leagueName;
  const leagues = state.leagues.toJS();
  const league = _.find(leagues, {name: leagueName});

  const divisionsJS = state.divisions.toJS();
  const divisions = _.map(divisionsJS, (division)=>{return division});

  return {league: league, divisions: divisions}
}, {
  getLeagueByName,
  getActiveDivisionByLeagueId
})

class LeagueRoute extends React.Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    league: PropTypes.object.isRequired,
    divisions: PropTypes.array.isRequired
  };

  static fillStore(redux, route) {
    let leagueName = route.params.leagueName;
    return redux.dispatch(getLeagueByName(leagueName));
  }

  componentWillReceiveProps(nextProps) {
    const { league, getActiveDivisionByLeagueId } = nextProps;
    const shouldFetch =
      !_.isEqual(nextProps.divisions, this.props.divisions) ||
      nextProps.divisions.length==0;

    // TODO: currently called twice, fix so it's only called once
    if(league && shouldFetch) {
      getActiveDivisionByLeagueId(league._id);
    }
  }

  render() {
    let {league, divisions} = this.props;
    let season = (divisions.length) ? divisions[0].season.name: '';
    return (
      <div>
        <div className="row" style={{backgroundColor: '#eff3f8'}}>
          <div className="col-md-4 col-xs-4" style={{margin: '20px 0px'}}>
            <div className="sub-container">
              <div className="sub-title-container">
                <div className="sub-title">Leagues</div>
              </div>
              <div>
                <div className="page-title text-center">{season}</div>
                <DivisionList league={league} divisions={divisions}></DivisionList>
              </div>
            </div>
          </div>

          <div className="col-md-8 col-xs-8" style={{margin: '20px 0px'}}>
            <div className="sub-container">
              <div className="sub-title-container">
                <div className="sub-title">LEAGUE INFO</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}




export default LeagueRoute;
