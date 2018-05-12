export * from './moves/selectors';

export const canUndo = ({ moves }) => moves.list.length > 1;
