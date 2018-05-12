export const BOARD_MOVE_UP = 'BOARD_MOVE_UP';
export const boardMoveUp = () => ({ type: BOARD_MOVE_UP });

export const BOARD_MOVE_DOWN = 'BOARD_MOVE_DOWN';
export const boardMoveDown = () => ({ type: BOARD_MOVE_DOWN });

export const BOARD_MOVE_RIGHT = 'BOARD_MOVE_RIGHT';
export const boardMoveRight = () => ({ type: BOARD_MOVE_RIGHT });

export const BOARD_MOVE_LEFT = 'BOARD_MOVE_LEFT';
export const boardMoveLeft = () => ({ type: BOARD_MOVE_LEFT });

export const GAME_NEW = 'GAME_NEW';
export const gameNew = (size = 4) => ({ type: GAME_NEW, size });

export const GAME_UPDATE = 'GAME_UPDATE';
export const gameUpdate = () => ({ type: GAME_UPDATE });
