import React, { PropTypes } from 'react';
if (process.env.BROWSER) require('./styles.css');
import _ from 'lodash';
import statParser from '../../../utils/statParser';
import helpers from '../../../utils/helpers';
import StatsHeader from './StatsHeader';
import StatsRow from './StatsRow';
const SplitStatsv2 = ({statList, showTotal}) => {
  let cummulativeStats = [];
  return (
    <div className='container-fluid'>
      <StatsHeader />
      {
        _.map(Object.keys(statList), (key) => {
          let stat = statList[key];
          cummulativeStats = cummulativeStats.concat(stat);
          let combined = statParser.playerCummulativeStats(stat);
          return (
            <div>
              <StatsRow title={key} combined={combined} />
            </div>
          );
        })
      }
      <StatsRow title={'Total'} combined={statParser.playerCummulativeStats(cummulativeStats)} />
    </div>
  )
};

SplitStatsv2.propTypes = {
  statList: PropTypes.object.isRequired,
  showTotal: PropTypes.bool
};

SplitStatsv2.defaultProps = {
  statList: {}
};

export default SplitStatsv2;
