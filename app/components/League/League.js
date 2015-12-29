import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import './styles.css';
import _ from 'lodash';


class League extends React.Component {
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
    let season = divisions.length && divisions[0].season.name;
    let divisionList = (
      <ul className="list-group">
        {
          _.map(divisions, (division) => {
            return (
              <li key={division._id} className="list-group-item">
                <Link to={"/" + this.props.league.name + "/division/" + division._id}>
                  <span className="inline-list-item" style={{width: '25%'}}>Dec 1</span>
                  <span className="inline-list-item" style={{width: '50%'}}>{division.name}</span>
                  <span className="inline-list-item" style={{width: '25%'}}>Completed</span>
                </Link>

              </li>

            )
          })
        }
      </ul>
    );
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
                {divisionList}
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

export default League;
