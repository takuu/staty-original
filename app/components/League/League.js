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
      <div>
        <div className="portlet-title">
          <div className="page-title">{season}</div>
        </div>
        <div className="row" style={{backgroundColor: '#eff3f8'}}>
          <div className="col-md-5 col-xs-5" style={{margin: '20px 0px'}}>
            <div className="sub-container">
              <div className="sub-title-container">
                <div className="sub-title">Divisions</div>
              </div>
              <div style={{padding: "10px"}}>
                {divisionList}
              </div>
            </div>
          </div>

          <div className="col-md-7 col-xs-7" style={{margin: '20px 0px'}}>
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
