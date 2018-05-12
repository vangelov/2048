import React from 'react';
import { connect } from 'react-redux';

import './style.css';
import Button from '../__shared__/Button';
import SizeLabel from './SizeLabel';
import * as actions from '../../state/actions';

export function Menu(props) {
  function handleNewGame() {
    props.onNewGame();
  }

  function handleUndo() {
    console.log('fdsdf');
    props.onUndo();
  }

  return (
    <div className="Menu">
      <SizeLabel />
      <Button label="New Game" onClick={handleNewGame} />
      <Button label="Undo" onClick={handleUndo} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUndo: () => {
      console.log('undo');
      dispatch(actions.moveUndo());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
