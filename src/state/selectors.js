export * from './moves/selectors';

export const canUndo = ({ moves }) => moves.length > 1;
