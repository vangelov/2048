
import { MOVE_UNDO, MOVE_INIT, MOVE_LEFT, MOVE_RIGHT, MOVE_DOWN, MOVE_UP } from './actions';
import moveBoard from './moveBoard';
import * as boardUtils from './boardUtils';

const initialState = {
  list: [],
  rngCache: {},
};

function getCachedRandom(key, rngCache) {
  let result = rngCache[key];

  if (result === undefined) {
    result = Math.random();
    rngCache[key] = result;
  }

  return result;
}

function getNextNumber(movesCount, rngCache) {
  return getCachedRandom(`number-${movesCount}`, rngCache) < 0.5 ? 2 : 4;
}

function getNextFreePosition(board, movesCount, rngCache) {
  const freePositions = boardUtils.getFreePositions(board);

  if (freePositions.length > 0) {
    const randomNumber = getCachedRandom(`position-${movesCount}`, rngCache);
    const positionIndex = Math.floor(randomNumber * freePositions.length);
    return freePositions[positionIndex];
  }

  return null;
}

function addRandomNumberAtRandomPosition(board, movesCount, rngCache) {
  const position = getNextFreePosition(board, movesCount, rngCache);
  const nextNumber = getNextNumber(movesCount, rngCache);
  return boardUtils.addNumber(board, nextNumber, position);
}

export default (state = initialState, action) => {
  let rngCache;

  switch (action.type) {
    case MOVE_INIT:
      rngCache = {};
      let initBoard = boardUtils.create(action.size);
      initBoard = addRandomNumberAtRandomPosition(initBoard, state.list.length, rngCache);

      return {
        list: [
          {
            board: initBoard,
            scoreWon: 0,
          }
        ],
        rngCache
      };

    case MOVE_UP:
    case MOVE_DOWN:
    case MOVE_LEFT:
    case MOVE_RIGHT:
      rngCache = {
        ...state.rngCache
      };

      const { board } = state.list[state.list.length - 1];
      let { movedBoard, scoreWon } = moveBoard(board, action.type);
      movedBoard = addRandomNumberAtRandomPosition(movedBoard, state.list.length, rngCache);

      return {
        ...state,
        rngCache,
        list: [
          ...state.list,
          {
            board: movedBoard,
            scoreWon
          }
        ]
      };

    case MOVE_UNDO:
      return {
        ...state,
        list: state.list.slice(0, state.list.length - 1)
      };

    default:
      return state;
  }
};
