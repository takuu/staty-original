import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import _ from 'lodash';
import './styles.css';

const GridLink = ({url, text}) => (
  <div>
    <Link to={url}>{text}</Link>
  </div>
);

GridLink.propTypes = {
  text: PropTypes.string,
  url: PropTypes.string
};

export default GridLink;

