
export const getBoard = ({ moves }) => moves[moves.length - 1].board;

export const getScore = ({ moves }) => moves.reduce(({ scoreWon }, acc) => acc + scoreWon, 0);
