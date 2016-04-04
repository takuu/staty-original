import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Modal from '../../../components/core/Modal/Modal';
// import './styles.css';
if (process.env.BROWSER) require('./styles.css');

export default class PlayerAddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showModal: false};
  }

  static propTypes = {
    league: PropTypes.object,
    player: PropTypes.object
  };


  close () {
    debugger;
    this.setState({ showModal: false });
  }

  open () {
    console.log('open', this.setState);
    debugger;
    this.setState({ showModal: true });
  }
  render() {

    return (
      <div>
      <button onClick={this.open.bind(this)} className='btn btn-info' style={{fontSize: '.8em', width: '28px', padding: '5px', backgroundColor: '#ffffff', color: '#5bc0de', border: '1px solid'}}>
        <span className='glyphicon glyphicon-plus' style={{left: '1px'}}></span>
      </button>
        <Modal isOpen={this.state.showModal}
               transitionName="modal-anim">
          <div>
            <h1>HELLO WORLD {this.props.player.name}</h1>
            <button onClick={this.close.bind(this)}>Close</button>
          </div>
        </Modal>
      </div>
    );
  }


};

