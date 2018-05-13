import * as actions from './actions';

const turnsToNormalizeForActionType = {
  [actions.MOVE_LEFT]: 0,
  [actions.MOVE_UP]: 1,
  [actions.MOVE_RIGHT]: 2,
  [actions.MOVE_DOWN]: 3
};

const turnsTypesCount = Object.keys(turnsToNormalizeForActionType).length;

/* We have the logic to move the board to the left so we transform all
  other cases to this */
export default function moveBoard(board, actionType) {
  const turns = turnsToNormalizeForActionType[actionType];
  let rotatedBoard = board;

  // 'Normalize' the board
  for (let i = 0; i < turns; i++) {
    rotatedBoard = rotateLeft(rotatedBoard);
  }

  let { movedBoard: movedAndRotatedBoard, scoreWon } = moveLeft(rotatedBoard);

  // Bring it back to the original orientation
  for (let i = 0; i < turnsTypesCount - turns; i++) {
    movedAndRotatedBoard = rotateLeft(movedAndRotatedBoard);
  }

  return { movedBoard: movedAndRotatedBoard, scoreWon };
}

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

/* For each row we move left, merge and (if necessary ) move left again */
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
