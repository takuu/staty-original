import React, { PropTypes } from 'react';
import { Link } from 'react-router';
class LeagueRoute extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    league: PropTypes.object
  };
  render () {
    const {league} = this.props;

    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {league: league});
    });
    return (
      <div className='sub-container'>
        <div className='sub-title-container'>
          <div className='container'>
            <div className='col-md-6 col-xs-12'>
              <ul className='nav nav-tabs nav-justified'>
                <li role='presentation' className='active'>
                  <Link to={''}><div className='sub-title'>Home</div></Link>
                </li>
                <li role="presentation">
                  <Link to={''}><div className='sub-title'>Register</div></Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div style={{padding: '10px'}}>
          {childrenWithProps}
        </div>
      </div>
    );
  }
}

export default LeagueRoute;
