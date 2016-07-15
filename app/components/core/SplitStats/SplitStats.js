import React, { PropTypes } from 'react';
if (process.env.BROWSER) require('./styles.css');
import _ from 'lodash';
import statParser from '../../../utils/statParser';
import helpers from '../../../utils/helpers';
import StatsHeader from './StatsHeader';
import StatsRow from './StatsRow';
const SplitStats = ({statList, showTotal}) => {
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
      {(showTotal) ? (
        <StatsRow title={'Total'} combined={statParser.playerCummulativeStats(cummulativeStats)} />
      ) : null}
    </div>
  )
};

SplitStats.propTypes = {
  statList: PropTypes.object.isRequired,
  showTotal: PropTypes.bool
};

SplitStats.defaultProps = {
  statList: {}
};

export default SplitStats;
