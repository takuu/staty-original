import React, { PropTypes} from 'react';
import './styles.css';
import { Link } from 'react-router';


class SubHeader extends React.Component {

  static propTypes = {
    league: PropTypes.object
  };

  constructor() {
    super();
    this.state = {searchText: ''};
  }


  handleSearchChange(e) {
    console.log(this);
    this.setState({searchText: e.target.value});
  }

  render() {
    let title;
    const {league} = this.props;
    let leagueName = league && league.name;
    if(league) {
      title = league.name.toUpperCase();
    }

    return (
      <div>
        <div className="col-md-12 col-xs-12 nopadding">
          <ul className="nav nav-pills">
            <li><a href={"/" + leagueName}>Home</a></li>
            <li><a href={"/" + leagueName + "/register"}>Registration</a></li>
            <li><a href={"/" + leagueName + "/about"}>About</a></li>
            <li><a href={"/" + leagueName + "/pricing"}>Pricing</a></li>
            <li><a href={"/" + leagueName + "/pastResults"}>Past Results</a></li>
            <li><a href={"/" + leagueName + "/contact"}>Contact</a></li>
            <li><a href={"/" + leagueName + "/rules"}>Rules</a></li>
            <li><a href={"/" + leagueName + "/gyms"}>Gyms</a></li>
            <li><a href={"/" + leagueName + "/news"}>News</a></li>
          </ul>

          <div className="col-md-6 col-xs-6">
            <h2 style={{color:"#444"}}>{title}</h2>
          </div>
          <div className="col-md-6 col-xs-6" style={{marginTop: "15px"}}>
            <div className="form-inline pull-right">
              <div className="form-group">
                <input type="text" className="form-control" name="searchText" onChange={this.handleSearchChange.bind(this)} placeholder="Search for player..." />
                <Link to={'/' + leagueName + '/results/' + this.state.searchText}>
                  <button className="btn btn-default" type="button">Search</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default SubHeader;
