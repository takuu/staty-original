import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import redux, { bindActionCreators, dispatch } from 'redux'
import Division from '../components/Division/Division';
import _ from 'lodash';

import { getActiveDivisionByLeagueId } from '../actions/divisionActions';




var factory = function(Type, props) {
  @connect((state) => {
    const divisions = _.map(state.divisions, (division)=>{return division});
    return {divisions: divisions }
  }, {
    getActiveDivisionByLeagueId,
    dispatch
  })
  class factoryComponent extends React.Component {
    static propTypes = {
      divisions: PropTypes.array.isRequired
    };


    componentWillReceiveProps(newProps) {
      console.log(props, this.props);
      if(props.league) {
        debugger;
        console.log('Winner A?');
        debugger;
      }
      debugger;
    }

    componentWillMount() {
      console.log(props, this.props);
      if(props.league) {
        console.log('Winner B?');
        debugger;
        this.props.dispatch(getActiveDivisionByLeagueId(props.league._id));
      }

      debugger;
    }

    render() {
      console.log(props, this.props);
      debugger;
      return <Type {...this.props} {...props} />
    }
  };

  return factoryComponent;
};


export default factory;