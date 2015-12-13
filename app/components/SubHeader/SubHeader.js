import React, { PropTypes} from 'react';
import styles from './styles.styl';
import { Link } from 'react-router';

import CSSModules from 'react-css-modules';

@CSSModules(styles)
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
    if(this.props.league) {
      title = this.props.league.name.toUpperCase();
    }

    return (
      <div>
        <div className="col-md-12 col-xs-12 nopadding">
          <ul className="nav nav-pills">
            <li><a href={"/" + this.props.league.name}>Home</a></li>
            <li><a href={"/" + this.props.league.name + "/register"}>Registration</a></li>
            <li><a href={"/" + this.props.league.name + "/about"}>About</a></li>
            <li><a href={"/" + this.props.league.name + "/pricing"}>Pricing</a></li>
            <li><a href={"/" + this.props.league.name + "/pastResults"}>Past Results</a></li>
            <li><a href={"/" + this.props.league.name + "/contact"}>Contact</a></li>
            <li><a href={"/" + this.props.league.name + "/rules"}>Rules</a></li>
            <li><a href={"/" + this.props.league.name + "/gyms"}>Gyms</a></li>
            <li><a href={"/" + this.props.league.name + "/news"}>News</a></li>
          </ul>

          <div className="col-md-6 col-xs-6">
            <h2 style={{color:"#444"}}>{title}</h2>
          </div>
          <div className="col-md-6 col-xs-6" style={{marginTop: "15px"}}>
            <div className="form-inline pull-right">
              <div className="form-group">
                <input type="text" className="form-control" name="searchText" onChange={this.handleSearchChange.bind(this)} placeholder="Search for player..." />
                <Link to={'/' + this.props.league.name + '/results/' + this.state.searchText}>
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
