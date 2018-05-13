import * as actions from './actions';

const initialState = {
  value: 4,
  canBeUsed: true
};

export const MIN_SIZE = 2;

export default (state = initialState, action) => {
  switch(action.type) {
    case actions.BOARD_SIZE_UPDATE:
      const canBeUsed = !isNaN(action.value) && action.value >= MIN_SIZE;

      return {
        value: canBeUsed ? Number(action.value) : action.value,
        canBeUsed
      };

    default:
      return state;
  }
}
