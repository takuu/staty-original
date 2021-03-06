import React, { PropTypes} from 'react';
// import './styles.css';
if (process.env.BROWSER) require('./styles.css');
import { Link } from 'react-router';


class SubHeader extends React.Component {

  static propTypes = {
    league: PropTypes.object
  };

  constructor () {
    super();
    this.state = {searchText: ''};
  }


  handleSearchChange (e) {
    console.log(this);
    this.setState({searchText: e.target.value});
  }

  render() {
    const {league} = this.props;
    let leagueName = league && league.name;

    return (
          <div className='container-fluid'>
            <div className='col-md-12 col-xs-12 sub-header'>
              <div className='inner-sub-header'>
                <div>
                  <Link to={`/${leagueName}`}>
                    <div className='league-logo pull-left'>
                        <div className='icon-image'></div>
                    </div>
                    <div className='sub-header-title pull-left'>{leagueName}</div>
                  </Link>
                </div>
                <ul className='nav nav-pills pull-right' style={{lineHeight: '30px'}}>
                  <li className='sub-header-link'><Link to={`/${leagueName}/register`}>Register</Link></li>
                  <li className='sub-header-link'><Link to={`/${leagueName}/search`}>Search</Link></li>
                  <li className='sub-header-link'><Link to={`/${leagueName}/rules`}>Rules</Link></li>
                  <li className='sub-header-link'><Link to={`/${leagueName}/about`}>About Us</Link></li>
                  <li className='sub-header-link'><Link to={`/${leagueName}/contact`}>Contact Us</Link></li>
                </ul>
              </div>
            </div>
        </div>
    );
  }
}


export default SubHeader;
