import * as actions from './actions';

const initialState = {
  value: 4,
  canBeUsed: true
};

const minSize = 2;

export default (state = initialState, action) => {
  switch(action.type) {
    case actions.BOARD_SIZE_UPDATE:
      const canBeUsed = !isNaN(action.value) && action.value >= minSize;

      return {
        value: canBeUsed ? Number(action.value) : action.value,
        canBeUsed
      };

    default:
      return state;
  }
}
