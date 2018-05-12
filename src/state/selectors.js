export * from './moves/selectors';
export * from './boardSize/selectors';

export const canUndo = ({ moves }) => moves.list.length > 1;
