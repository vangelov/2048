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
  const mergedRow = Array(row.length).fill(0);
  let mergedJ = null;
  let rowScoreWon = 0;

  for (let j = 0; j < row.length; j++) {
    if (mergedJ === null && j + 1 < row.length && row[j] !== 0 && row[j] === row[j + 1]) {
      mergedRow[j] = 2 * row[j];
      rowScoreWon = mergedRow[j];
      mergedJ = j + 1;
    } else if (j !== mergedJ) {
      mergedRow[j] = row[j];
    }
  }

  return {
    mergedRow,
    rowScoreWon,
    madeMerge: mergedJ !== null
  };
}

function moveLeft(board) {
  const movedBoard = [];
  let scoreWon = 0;

  for (const row of board) {
    let newRow = moveRowLeft(row);
    const {
      mergedRow,
      rowScoreWon,
      madeMerge
    } = mergeRowFromLeft(newRow);

    if (madeMerge) {
      newRow = moveRowLeft(mergedRow);;
    }

    scoreWon += rowScoreWon;
    movedBoard.push(newRow);
  }

  return { movedBoard, scoreWon };
}

const turnsToNormalizeForActionType = {
  [actions.MOVE_LEFT]: 0,
  [actions.MOVE_UP]: 1,
  [actions.MOVE_RIGHT]: 2,
  [actions.MOVE_DOWN]: 3
};

function moveBoard(board, actionType) {
  const turns = turnsToNormalizeForActionType[actionType];
  let rotatedBoard = board;

  for (let i = 0; i < turns; i++) {
    rotatedBoard = rotateLeft(rotatedBoard);
  }

  let { movedBoard: movedAndRotatedBoard, scoreWon } = moveLeft(rotatedBoard);

  for (let i = 0; i < 4 - turns; i++) {
    movedAndRotatedBoard = rotateLeft(movedAndRotatedBoard);
  }

  return { movedBoard: movedAndRotatedBoard, scoreWon };
}

export default moveBoard;
