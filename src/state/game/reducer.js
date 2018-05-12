
import { GAME_NEW, BOARD_MOVE_RIGHT, BOARD_MOVE_UP, BOARD_MOVE_LEFT, BOARD_MOVE_DOWN } from './actions';

const initialState = {
  score: 0,
  board: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
};

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
    BOARD_MOVE_LEFT: 0,
    BOARD_MOVE_UP: 1,
    BOARD_MOVE_RIGHT: 2,
    BOARD_MOVE_DOWN: 3
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

export default (state = initialState, action) => {
  switch (action.type) {
    case GAME_NEW:
      return {
        ...state,
        board: insertRandomNumber(state.board, getFreePositions(state.board))
      };

    case BOARD_MOVE_UP:
    case BOARD_MOVE_DOWN:
    case BOARD_MOVE_LEFT:
    case BOARD_MOVE_RIGHT:
      const movedBoard = move(state.board, action.type);
      const updatedBoard = insertRandomNumber(movedBoard, getFreePositions(movedBoard));

      return {
        ...state,
        board: updatedBoard
      }

    default:
      return state;
  }
};
