import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import DivisionGroup from './DivisionGroup';
import _ from 'lodash';
if (process.env.BROWSER) require('./styles.css');
const DivisionList = ({divisions, league, currentDivision}) => {
  const divisionGroup = _.groupBy(_.orderBy(divisions, ['season.startDate'], ['desc']), 'season._id');
  return (
    <div>
      {
        _.map(Object.keys(divisionGroup), (key) => {
          const divisionList = divisionGroup[key];
          return (
            <div>
              <DivisionGroup divisions={divisionList} league={league} currentDivision={currentDivision} />
            </div>
          );
        })
      }
    </div>
  );
}

DivisionList.propTypes = {
  divisions: PropTypes.array,
  league: PropTypes.object,
  currentDivision: PropTypes.object
};
DivisionList.defaultProps = {
  divisions: [],
  league: {},
  currentDivision: {}
};

export default DivisionList;