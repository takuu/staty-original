import styles from './../styles/global.css';
import React from 'react';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class NotFound extends React.Component {
  render() {
    return (
      <div styleName="wrapper">
        <h1>Not Found</h1>
      </div>
    );
  }
}
