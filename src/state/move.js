/*
. 4 4 .
2 . 4 4
2 2 4 4
*/

const board = [
  [2, null, 4, null, 4, 2],
  [4,    4, 4, null, 2, 2],
  [2,    2, 4,    4, 4, 2],
  [2,    8, 4, null, 4, 4],
  [2,    8, 4, null, 4, 4],
  [2,    8, 4, null, 4, 4],
];

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
  const newRow = Array(row.length).fill(null);
  let k = 0;

  row.filter(x => x !== null).forEach(x => {
    newRow[k++] = x;
  });

  return newRow;
}

function mergeRowFromLeft(row) {
  const newRow = Array(row.length).fill(null);
  let mergedJ = null;

  for (let j = 0; j < row.length; j++) {
    if (mergedJ === null && j + 1 < row.length && row[j] !== null && row[j] === row[j + 1]) {
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
    left: 0,
    up: 1,
    right: 2,
    down: 3
  };
  const turns = turnsToNormalizeForDir[dir];

  for (let i = 0; i < turns; i++) {
    board = rotateBoardLeft(board);
  }
  console.log(board);
  board = moveBoardLeft(board);
  console.log(board, turns);

console.log('---');
  for (let i = 0; i < 4 - turns; i++) {
    board = rotateBoardLeft(board);
    console.log(board);
  }

  return board;
}

console.log(move(board, 'right'));
