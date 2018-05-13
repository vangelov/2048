import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './style.css';
import Button from './Button';
import SizeLabel from './SizeLabel';
import {
  canUndo,
  getBoardSizeValue,
  canUseBoardSizeValue
} from '../../state/selectors';
import * as actions from '../../state/actions';

export function Menu(props) {
  const { canUndo, boardSize, canStartGame } = props;

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
      <Button label="New Game" enabled={canStartGame} onClick={handleNewGame} />
      <Button label="Undo (Z)" enabled={canUndo} onClick={handleUndo} />
    </div>
  );
}

Menu.propTypes = {
  canUnfo: PropTypes.bool,
  boardSize: PropTypes.any,
  onUndo: PropTypes.func,
  onNewGame: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    canUndo: canUndo(state),
    canStartGame: canUseBoardSizeValue(state),
    boardSize: getBoardSizeValue(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUndo: () => {
      dispatch(actions.moveUndo());
    },
    onNewGame: (boardSize) => {
      dispatch(actions.moveInit({ boardSize, onlyIfNoSavedState: false }))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
