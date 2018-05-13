
export const getBoard = ({ moves }) => moves.list[moves.list.length - 1].board;

export const getScore = ({ moves }) => moves.list.reduce(
  (acc, { scoreWon }) => acc + scoreWon, 0
);

export const canUndo = ({ moves }) => moves.list.length > 1;

export const getMovesCount = ({ moves }) => moves.list.length;

const neighboursDiffs = [
  { diffI: -1, diffJ:  0 },
  { diffI: +1, diffJ:  0 },
  { diffI:  0, diffJ: -1 },
  { diffI:  0, diffJ: +1 }
];

export const canMakeMoreMoves = ({ moves }) => {
  if (moves.list.length === 0) {
    return true;
  }

  const { board } = moves.list[moves.list.length - 1];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0) {
        return true;
      }

      for (const { diffI, diffJ } of neighboursDiffs) {
        const newI = i + diffI;
        const newJ = j + diffJ;

        if (newI >= 0 && newI < board.length && newJ >= 0 && newJ < board[i].length) {
          if (board[i][j] === board[newI][newJ]) {
            return true;
          }
        }
      }
    }
  }

  return false;
}
