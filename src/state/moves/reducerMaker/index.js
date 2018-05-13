
import * as actions from '../actions';
import { getRandomNumber, getRandomFreePosition } from './random';
import moveBoard from '../moveBoard';
import * as boardUtils from '../boardUtils';

const initialState = {
  list: [],
  rngCache: {},
};

export default function(
  getNextNumber = getRandomNumber,
  getNextFreePosition = getRandomFreePosition) {

  return (state = initialState, action) => {
    let updatedRngCache;
    let nextFreePosition;
    let nextNumber;

    switch (action.type) {
      case actions.MOVE_INIT:
        if (action.onlyIfNoSavedState && state.list.length > 1) {
          return state;
        }

        let initBoard = boardUtils.create(action.boardSize);

        ({
          nextFreePosition,
          updatedRngCache
        } = getNextFreePosition(initBoard, state.length, {}));

        ({
          nextNumber,
          updatedRngCache
        } = getNextNumber(state.length, updatedRngCache));

        initBoard = boardUtils.addNumber(initBoard, nextNumber, nextFreePosition);

        return {
          list: [
            {
              board: initBoard,
              scoreWon: 0,
            }
          ],
          rngCache: updatedRngCache
        };

      case actions.MOVE_UP:
      case actions.MOVE_DOWN:
      case actions.MOVE_LEFT:
      case actions.MOVE_RIGHT:
        const { board } = state.list[state.list.length - 1];
        let { movedBoard, scoreWon } = moveBoard(board, action.type);

        ({
          nextFreePosition,
          updatedRngCache
        } = getNextFreePosition(movedBoard, state.list.length, state.rngCache));

        ({
          nextNumber,
          updatedRngCache
        } = getNextNumber(state.list.length, updatedRngCache));

        movedBoard = boardUtils.addNumber(movedBoard, nextNumber, nextFreePosition);

        return {
          ...state,
          rngCache: updatedRngCache,
          list: [
            ...state.list,
            {
              board: movedBoard,
              scoreWon
            }
          ]
        };

      case actions.MOVE_UNDO:
        if (state.list.length === 1) {
          return state;
        }

        return {
          ...state,
          list: state.list.slice(0, state.list.length - 1)
        };

      default:
        return state;
    }
  }
}
