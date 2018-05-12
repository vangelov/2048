import * as actions from './actions';

const initialState = 4;

export default (state = initialState, action) => {
  switch(action.type) {
    case actions.BOARD_SIZE_UPDATE:
      return action.value;
    default:
      return state;
  }
}
