import { compose } from 'redux';

import { MOVE_UNDO, MOVE_INIT, MOVE_LEFT, MOVE_RIGHT, MOVE_DOWN, MOVE_UP } from './actions';
import moveBoard from './moveBoard';
import * as boardUtils from './boardUtils';

const initialState = [];

function getNextNumber() {
  return Math.random() < 0.5 ? 2 : 4;
}

export function getNextFreePosition(board) {
  const freePositions = boardUtils.getFreePositions(board);

  if (freePositions.length > 0) {
    const positionIndex = Math.floor(Math.random() * freePositions.length);
    return freePositions[positionIndex];
  }

  return null;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MOVE_INIT:
      const initBoard = compose(
        boardUtils.addNumber(getNextNumber(), null, getNextFreePosition),
        boardUtils.create,
      )(action.size);

      return [
        {
          board: initBoard,
          scoreWon: 0,
          nextNumber: getNextNumber(),
          nextFreePosition: getNextFreePosition(initBoard),
        }
      ];

    case MOVE_UP:
    case MOVE_DOWN:
    case MOVE_LEFT:
    case MOVE_RIGHT:
      const { board, nextNumber, nextFreePosition } = state[state.length - 1];
      const newBoard = compose(
        boardUtils.addNumber(nextNumber, nextFreePosition),
        moveBoard(action.type)
      )(board);

      return [
        ...state,
        {
          board: newBoard,
          scoreWon: 0,
          nextNumber: getNextNumber(),
          nextFreePosition: getNextFreePosition(newBoard)
        }
      ];

    case MOVE_UNDO:
      return state.slice(0, state.length - 1);

    default:
      return state;
  }
};
