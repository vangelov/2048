import { combineReducers } from 'redux';

import movesMaker from './moves/reducerMaker';
import boardSize from './boardSize/reducer';

export default combineReducers({
  moves: movesMaker(),
  boardSize
});
