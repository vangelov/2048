
import * as actions from './actions';
import boardSize from './reducer';

describe('boardSize reducer', () => {

  it('updates the state on ' + actions.BOARD_SIZE_UPDATE, () => {
    const state = {
      value: 4,
      canBeUsed: true
    };
    const action = actions.boardSizeUpdate(6);
    const actualState = boardSize(state, action);
    const expectedState = {
      value: 6,
      canBeUsed: true
    };

    expect(actualState).toEqual(expectedState);
  });
});
