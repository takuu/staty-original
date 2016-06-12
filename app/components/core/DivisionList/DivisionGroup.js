import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import _ from 'lodash';
// import './styles.css';
if (process.env.BROWSER) require('./styles.css');
const DivisionGroup = ({divisions, league, currentDivision}) => {
  let season = (divisions.length) ? divisions[0].season.name : '';
  const sortedDivisions = _.orderBy(divisions, ['strengthLevel'], ['desc']);

  return (
    <div>
      <div className='page-title text-center'>{season}</div>
      <ul className='list-group'>
        {
          _.map(sortedDivisions, (division) => {
            let divisionClass = classNames({
              'active': division._id === currentDivision._id,
              'list-group-item': true,
              'noborder': true,
              'list-group-item-md': true
            });
            return (
              <li key={division._id} className='list-group-item nopadding'>
                <Link to={_createScheduleLink(league, division)} className={divisionClass}>
                  <span className='inline-list-item date-item'>
                    Dec 1
                  </span>
                  <span className='inline-list-item division-item'>
                    {division.name}
                  </span>
                  <span className='inline-list-item status-item'>
                    Completed
                  </span>
                </Link>
              </li>
            );
          })
        }
      </ul>
    </div>
  )
  function _createScheduleLink (league, division) {
    return (division) ? `/${league.name}/division/${division._id}` : '#';
  }
}

DivisionGroup.propTypes = {
  divisions: PropTypes.array,
  league: PropTypes.object,
  currentDivision: PropTypes.object
};
DivisionGroup.defaultProps = {
  divisions: [],
  league: {},
  currentDivision: {}
};

export default DivisionGroup;