import React, { PropTypes } from 'react';
import styles from './styles.styl';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
class Loader extends React.Component {
  render() {
    return (
      <div style={{width: '100px', marginLeft: 'auto', marginRight: 'auto'}}>
        <div className="throbber-loader">
          Loading…
        </div>
      </div>
    );
  }
}

export default Loader;
