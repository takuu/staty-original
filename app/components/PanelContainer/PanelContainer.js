import React, { PropTypes } from 'react';

import styles from './styles.styl';
import _ from 'lodash';

import SubHeader from '../../components/SubHeader/SubHeader.js';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
export var PanelContainer = ComposedComponent => class extends React.Component {
  constructor() {
    super();
    this.state = { data: null };
  }

  render() {
    return (
      <div className="">
        <div className="page-head">
          <div className="container">
            <SubHeader league={this.props.league}></SubHeader>
          </div>
        </div>
        <div className="page-content">
          <div className="container">

            <div className="row">
              <div className="col-md-12 col xs-12">
                <div className="portlet light portlet-fit portlet datatable">
                  <ComposedComponent {...this.props} data={this.state.data} />
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
};
