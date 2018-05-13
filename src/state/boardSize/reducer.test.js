
import * as actions from './actions';
import boardSize, { MIN_SIZE } from './reducer';

describe('boardSize reducer', () => {

  it(`updates the value and sets canBeUsed to true if it's a number and
      bigger than ${MIN_SIZE} on ${actions.BOARD_SIZE_UPDATE}`, () => {

    const state = {
      value: 4,
      canBeUsed: true
    };
    const action = actions.boardSizeUpdate(MIN_SIZE + 1);
    const actualState = boardSize(state, action);
    const expectedState = {
      value: MIN_SIZE + 1,
      canBeUsed: true
    };

    expect(actualState).toEqual(expectedState);
  });

  it(`updates the value and sets canBeUsed to fase if it's isNaN
      on ${actions.BOARD_SIZE_UPDATE}`, () => {

    const state = {
      value: 4,
      canBeUsed: true
    };
    const action = actions.boardSizeUpdate(NaN);
    const actualState = boardSize(state, action);
    const expectedState = {
      value: NaN,
      canBeUsed: false
    };

    expect(actualState).toEqual(expectedState);
  });

  it(`updates the value and sets canBeUsed to fase if it's less
      than ${MIN_SIZE} on ${actions.BOARD_SIZE_UPDATE}`, () => {

    const state = {
      value: 4,
      canBeUsed: true
    };
    const action = actions.boardSizeUpdate(MIN_SIZE - 1);
    const actualState = boardSize(state, action);
    const expectedState = {
      value: MIN_SIZE - 1,
      canBeUsed: false
    };

    expect(actualState).toEqual(expectedState);
  });
});
