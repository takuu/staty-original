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
            <li><Link to={"/" + leagueName}>Home</Link></li>
            <li><Link to={"/" + leagueName + "/register"}>Registration</Link></li>
            <li><Link to={"/" + leagueName + "/about"}>About</Link></li>
            <li><Link to={"/" + leagueName + "/pricing"}>Pricing</Link></li>
            <li><Link to={"/" + leagueName + "/pastResults"}>Past Results</Link></li>
            <li><Link to={"/" + leagueName + "/contact"}>Contact</Link></li>
            <li><Link to={"/" + leagueName + "/rules"}>Rules</Link></li>
            <li><Link to={"/" + leagueName + "/gyms"}>Gyms</Link></li>
            <li><Link to={"/" + leagueName + "/news"}>News</Link></li>
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
