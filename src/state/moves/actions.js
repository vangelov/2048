export const MOVE_UP = 'MOVE_UP';
export const moveUp = () => ({ type: MOVE_UP });

export const MOVE_DOWN = 'MOVE_DOWN';
export const moveDown = () => ({ type: MOVE_DOWN });

export const MOVE_RIGHT = 'MOVE_RIGHT';
export const moveRight = () => ({ type: MOVE_RIGHT });

export const MOVE_LEFT = 'MOVE_LEFT';
export const moveLeft = () => ({ type: MOVE_LEFT });

export const MOVE_INIT = 'MOVE_INIT';
export const moveInit = (size = 4) => ({ type: MOVE_INIT, size });

export const MOVE_UNDO = 'MOVE_UNDO';
export const moveUndo = () => ({ type: MOVE_UNDO });
