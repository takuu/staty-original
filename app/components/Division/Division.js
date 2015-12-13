import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import styles from './styles.styl';
import CSSModules from 'react-css-modules';
import _ from 'lodash';

@CSSModules(styles)
class Division extends React.Component {
  static propTypes = {
    league: PropTypes.object,
    divisions: PropTypes.array
  };
  static defaultProps = {
    league: {},
    divisions: []
  };
  render() {
    let {league, divisions} = this.props;
    let divisionList = (
      <dl>
        {
          _.map(divisions, (division) => {
            return (
              <dt key={division._id}>
                <Link to={"/" + this.props.league.name + "/division/" + division._id}>
                  {division.name}
                </Link>
              </dt>

            )
          })
        }
      </dl>
    );
    return (
      <div className="DivisionPage">
        <div className="DivisionPage-container">
          <h1>{league.name}</h1>
          {divisionList}
        </div>
      </div>
    );
  }

}

export default Division;
