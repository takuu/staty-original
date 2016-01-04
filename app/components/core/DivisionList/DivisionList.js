import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import statParser from '../../../utils/statParser';
import helper from '../../../utils/helpers';
import './styles.css';
export default class DivisionList extends React.Component {
  static propTypes = {
    divisions: PropTypes.array,
    league: PropTypes.object
  };
  static defaultProps = {
    divisions: [],
    league: {}
  };

  render() {
    const {divisions, league} = this.props;
    return (
      <ul className="list-group">
        {
          _.map(divisions, (division) => {
            return (
              <li key={division._id} className="list-group-item">
                <Link to={"/" + league.name + "/division/" + division._id}>
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
    );
  }
}