import { combineReducers } from 'redux';

import moves from './moves/reducer';
import boardSize from './boardSize/reducer';

export default combineReducers({
  moves,
  boardSize
});
