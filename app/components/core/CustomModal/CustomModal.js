import React, { PropTypes } from 'react';
import {Modal} from 'react-bootstrap';
// import './styles.css';
import { hideLoginModal } from '../../../actions/uiActions';
if (process.env.BROWSER) require('./styles.css');

export default class CustomModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
    dispatch: PropTypes.func.isRequired
  };
  close () {
    const {dispatch} = this.props;
    dispatch(hideLoginModal());
  }
  render () {
    const {isOpen} = this.props;
    return (
          <Modal show={isOpen} onHide={this.close.bind(this)}>
            {this.props.children}
          </Modal>
      );
  }
};
