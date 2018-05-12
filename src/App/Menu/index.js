import React from 'react';
import { connect } from 'react-redux';

import './style.css';
import Button from '../__shared__/Button';
import SizeLabel from './SizeLabel';
import { canUndo, getBoardSize } from '../../state/selectors';
import * as actions from '../../state/actions';

export function Menu(props) {
  const { canUndo, boardSize } = props;

  function handleNewGame() {
    props.onNewGame(boardSize);
  }

  function handleUndo() {
    if (props.canUndo) {
      props.onUndo();
    }
  }

  return (
    <div className="Menu">
      <SizeLabel />
      <Button label="New Game" onClick={handleNewGame} />
      <Button label="Undo" enabled={canUndo} onClick={handleUndo} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    canUndo: canUndo(state),
    boardSize: getBoardSize(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUndo: () => {
      dispatch(actions.moveUndo());
    },
    onNewGame: (boardSize) => {
      dispatch(actions.moveInit(boardSize))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
