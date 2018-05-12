
import { MOVE_UNDO, MOVE_INIT, MOVE_LEFT, MOVE_RIGHT, MOVE_DOWN, MOVE_UP } from './actions';

function getFreePositions(board) {
  const freePositions = [];
  const rowsCount = board.length;
  const columnsCount = board[0].length;

  for (let i = 0; i < rowsCount; i++) {
    for (let j = 0; j < columnsCount; j++) {
      if (board[i][j] === 0) {
        freePositions.push({ i, j })
      }
    }
  }

  return freePositions;
}

function insertRandomNumber(board, freePositions) {
  const index = Math.floor(Math.random() * freePositions.length);
  const { i, j } = freePositions[index];
  const newBoard = JSON.parse(JSON.stringify(board));

  newBoard[i][j] = 2;

  return newBoard;
}

function rotateBoardLeft(board) {
  const rotatedBoard = [];
  const rowsCount = board.length;
  const columnsCount = board[0].length;

  for (let i = 0; i < rowsCount; i++) {
    rotatedBoard.push([]);

    for (let j = 0; j < columnsCount; j++) {
      rotatedBoard[i][j] = board[j][columnsCount - i - 1];
    }
  }

  return rotatedBoard;
};

function moveRowLeft(row) {
  const newRow = Array(row.length).fill(0);
  let k = 0;

  row.filter(x => x !== 0).forEach(x => {
    newRow[k++] = x;
  });

  return newRow;
}

function mergeRowFromLeft(row) {
  const newRow = Array(row.length).fill(0);
  let mergedJ = null;

  for (let j = 0; j < row.length; j++) {
    if (mergedJ === null && j + 1 < row.length && row[j] !== 0 && row[j] === row[j + 1]) {
      newRow[j] = 2 * row[j];
      mergedJ = j + 1;
    } else if (j !== mergedJ) {
      newRow[j] = row[j];
    }
  }

  return { newRow, madeMerge: mergedJ !== null };
}

function moveBoardLeft(board) {
  const result = [];

  for (const row of board) {
    let newRow = moveRowLeft(row);
    const { newRow: rowAfterMerge, madeMerge } = mergeRowFromLeft(newRow);

    if (madeMerge) {
      newRow = moveRowLeft(rowAfterMerge);;
    }

    result.push(newRow);
  }

  return result;
}
/*
left: 0
up: 1
right: 2
down: 3
*/

function move(board, dir) {
  const turnsToNormalizeForDir = {
    MOVE_LEFT: 0,
    MOVE_UP: 1,
    MOVE_RIGHT: 2,
    MOVE_DOWN: 3
  };
  const turns = turnsToNormalizeForDir[dir];

  for (let i = 0; i < turns; i++) {
    board = rotateBoardLeft(board);
  }

  board = moveBoardLeft(board);

  for (let i = 0; i < 4 - turns; i++) {
    board = rotateBoardLeft(board);
  }

  return board;
}

function createBoard(size) {
  const board = new Array(size);

  for (let i = 0; i < size; i++) {
    board[i] = new Array(size).fill(0);
  }

  return board;
}

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case MOVE_INIT:
      const initBoard = createBoard(action.size);

      return [
        {
          board: insertRandomNumber(initBoard, getFreePositions(initBoard)),
          scoreWon: 0
        }
      ];

    case MOVE_UP:
    case MOVE_DOWN:
    case MOVE_LEFT:
    case MOVE_RIGHT:
      const { board } = state[state.length - 1];
      const movedBoard = move(board, action.type);
      const updatedBoard = insertRandomNumber(movedBoard, getFreePositions(movedBoard));

      return [
        ...state,
        {
          board: updatedBoard,
          scoreWon: 0
        }
      ];

    case MOVE_UNDO:
      return state.slice(0, state.length - 1);

    default:
      return state;
  }
};
