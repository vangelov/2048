
import * as actions from './actions';
import boardSize from './reducer';

describe('boardSize reducer', () => {

  it('updates the state on ' + actions.BOARD_SIZE_UPDATE, () => {
    const state = 4;
    const action = actions.boardSizeUpdate(6);
    const actualState = boardSize(state, action);
    const expectedState = 6;

    expect(actualState).toEqual(expectedState);
  });
});
