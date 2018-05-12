export function getFreePositions(board) {
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

export function create(size) {
  const board = new Array(size);

  for (let i = 0; i < size; i++) {
    board[i] = new Array(size).fill(0);
  }

  return board;
}

export function addNumber(board, number, position) {
  if (!position) {
    return board;
  }

  const { i, j } = position;
  const newBoard = JSON.parse(JSON.stringify(board));
  newBoard[i][j] = number;
  return newBoard;
}
