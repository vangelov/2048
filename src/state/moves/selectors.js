
export const getBoard = ({ moves }) => moves.list[moves.list.length - 1].board;

export const getScore = ({ moves }) => moves.list.reduce((acc, { scoreWon }) => acc + scoreWon, 0);
