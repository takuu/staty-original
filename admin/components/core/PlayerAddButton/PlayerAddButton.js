import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Modal from '../../../components/core/Modal/Modal';
import { addPlayerToWatchList, removePlayerFromWatchList } from '../../../actions/followActions';
import _ from 'lodash';
// import './styles.css';

if (process.env.BROWSER) require('./styles.css');

export default class PlayerAddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showModal: false};
  }

  static propTypes = {
    league: PropTypes.object,
    player: PropTypes.object,
    dispatch: PropTypes.func,
    watchList: PropTypes.array
  };

  remove () {
    const { player: {_id}, dispatch, watchList } = this.props;
    dispatch(removePlayerFromWatchList(_id));
    debugger;
    // this.setState({ showModal: false });
  }

  open () {
    const { player: {_id}, dispatch, watchList } = this.props;
    dispatch(addPlayerToWatchList(_id));
    debugger;
    // this.setState({ showModal: true });
  }
  render() {
    const {player, watchList, user} = this.props;
    debugger;
    let which = (_.indexOf(watchList, player._id) >= 0)
      ? (
        <button onClick={this.remove.bind(this)} className='btn btn-info'
                style={{fontSize: '.8em', width: '28px', padding: '5px', backgroundColor: '#ffffff', color: '#5bc0de', border: '1px solid'}}>
          <span className='glyphicon glyphicon-minus' style={{left: '1px'}}></span>
        </button>
      )
      : (
        <button onClick={this.open.bind(this)} className='btn btn-info' style={{fontSize: '.8em', width: '28px', padding: '5px', backgroundColor: '#ffffff', color: '#5bc0de', border: '1px solid'}}>
          <span className='glyphicon glyphicon-plus' style={{left: '1px'}}></span>
        </button>
      );

    return (
      <div>
        {which}
        <Modal isOpen={this.state.showModal}
               transitionName="modal-anim">
          <div>
            <h1>HELLO WORLD {this.props.player.name}</h1>
            <button onClick={this.remove.bind(this)}>Remove</button>
          </div>
        </Modal>
      </div>
    );
  }


};

