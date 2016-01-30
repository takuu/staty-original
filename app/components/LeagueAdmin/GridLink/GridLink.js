import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import _ from 'lodash';
import './styles.css';

const GridLink = ({value, text}) => (
  <div>
    <Link to={value}>{text}</Link>
  </div>
);

GridLink.propTypes = {
  text: PropTypes.string,
  value: PropTypes.string
};

export default GridLink;

