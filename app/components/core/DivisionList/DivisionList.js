import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import statParser from '../../../utils/statParser';
import helper from '../../../utils/helpers';
import classNames from 'classnames';
import './styles.css';
export default class DivisionList extends React.Component {
  static propTypes = {
    divisions: PropTypes.array,
    league: PropTypes.object,
    currentDivision: PropTypes.object,
  };
  static defaultProps = {
    divisions: [],
    league: {},
    currentDivision: {}
  };

  render() {
    const {divisions, league, currentDivision} = this.props;
    let season = (divisions.length) ? divisions[0].season.name: '';
    return (
      <div>
        <div className="page-title text-center">{season}</div>
        <ul className="list-group">
          {
            _.map(divisions, (division) => {
              let divisionClass = classNames({
                'active': division._id == currentDivision._id,
                'list-group-item': true
              });
              return (
                <li key={division._id} className="list-group-item">
                  <Link to={"/" + league.name + "/division/" + division._id + "/schedule"} className={divisionClass}>
                    <span className="inline-list-item date-item">
                      Dec 1
                    </span>
                    <span className="inline-list-item division-item">
                      {division.name}
                    </span>
                    <span className="inline-list-item status-item">
                      Completed
                    </span>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}