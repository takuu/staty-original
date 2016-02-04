import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import _ from 'lodash';
import './styles.css';

/*
const GridLink = ({value, text}) => {

  const {route, params, league} = value;
  const url = '/' + league.name + '/league/' + league._id + '/admin/' + route;
  debugger;
  return (
    <div>
      <Link to={url} params={params}>{text}</Link>
    </div>
  );
}
*/
class TempLink extends React.Component {
  render() {
    const {text, value} = this.props;
    let params={}, link;
    if(value) {
      let temp = value.split('?');
      link = temp[0];
      let [key, val] = temp[1].split('=');
      params[key] = val;

    }

    return (
      <div>
        <Link to={{pathname: link, query: params}} params={params}>{text}</Link>
      </div>
    )
  }
}

export default TempLink;

