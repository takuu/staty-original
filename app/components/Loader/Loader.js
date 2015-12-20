import React, { PropTypes } from 'react';

class Loader extends React.Component {
  render() {
    return (
      <div style={{width: '100px', marginLeft: 'auto', marginRight: 'auto'}}>
        <div className="">
          Loading…
        </div>
      </div>
    );
  }
}

export default Loader;
