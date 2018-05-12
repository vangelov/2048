import * as actions from './actions';

function rotateLeft(board) {
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

function moveLeft(board) {
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

const turnsToNormalizeForDir = {
  [actions.MOVE_LEFT]: 0,
  [actions.MOVE_UP]: 1,
  [actions.MOVE_RIGHT]: 2,
  [actions.MOVE_DOWN]: 3
};

const moveBoard = (dir) => (board) => {
  const turns = turnsToNormalizeForDir[dir];

  for (let i = 0; i < turns; i++) {
    board = rotateLeft(board);
  }

  board = moveLeft(board);

  for (let i = 0; i < 4 - turns; i++) {
    board = rotateLeft(board);
  }

  return board;
}

export default moveBoard;
