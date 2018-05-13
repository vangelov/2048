import reducerMaker from './index';
import * as actions from '../actions';

describe('moves reducer maker', () => {

  it('returns a new reducer', () => {
    const reducer = reducerMaker(() => 0, () => null);
    expect(reducer).toBeInstanceOf(Function);
  });

  describe('returned reducer', () => {

    it(`adds an initial move on ${actions.MOVE_INIT} if onlyIfNoSavedState is false`, () => {
      const nextNumber = 2;
      const nextFreePosition = { i: 1, j: 1 };

      const reducer = reducerMaker(
        () => ({ nextNumber, updatedRngCache: null }),
        () => ({ nextFreePosition, updatedRngCache: null })
      );

      const state = {
        list: [],
        rngCache: null
      };
      const x = nextNumber;
      const expectedState = {
        list: [
          {
            board: [
              [0, 0, 0, 0],
              [0, x, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0]
            ],
            scoreWon: 0
          }
        ],
        rngCache: null
      };

      const action = actions.moveInit({ boardSize: 4, onlyIfNoSavedState: false });
      const actualState = reducer(state, action);

      expect(actualState).toEqual(expectedState);
    });

    it(`adds an initial move on ${actions.MOVE_INIT} if onlyIfNoSavedState is true
        and there's no saved state`, () => {

      const nextNumber = 2;
      const nextFreePosition = { i: 1, j: 1 };

      const reducer = reducerMaker(
        () => ({ nextNumber, updatedRngCache: null }),
        () => ({ nextFreePosition, updatedRngCache: null })
      );

      const state = {
        list: [],
        rngCache: null
      };
      const x = nextNumber;
      const expectedState = {
        list: [
          {
            board: [
              [0, 0, 0, 0],
              [0, x, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0]
            ],
            scoreWon: 0
          }
        ],
        rngCache: null
      };

      const action = actions.moveInit({ boardSize: 4, onlyIfNoSavedState: false });
      const actualState = reducer(state, action);

      expect(actualState).toEqual(expectedState);
    });

    it(`does not add an initial move on ${actions.MOVE_INIT} if onlyIfNoSavedState is true
        and there's saved state`, () => {

      const nextNumber = 2;
      const nextFreePosition = { i: 1, j: 1 };

      const reducer = reducerMaker(
        () => ({ nextNumber, updatedRngCache: null }),
        () => ({ nextFreePosition, updatedRngCache: null })
      );

      const state = {
        list: [
          {
            board: [
              [0, 0, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 2]
            ],
            scoreWon: 0
          }
        ],
        rngCache: null
      };
      const x = nextNumber;
      const expectedState = {
        list: [
          {
            board: [
              [0, 0, 0, 0],
              [0, x, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0]
            ],
            scoreWon: 0
          }
        ],
        rngCache: null
      };

      const action = actions.moveInit({ boardSize: 4, onlyIfNoSavedState: false });
      const actualState = reducer(state, action);

      expect(actualState).toEqual(expectedState);
    });

    it(`add a new move with the board moved left and
       updated with a new number on ${actions.MOVE_LEFT}`, () => {

      const nextNumber = 4;
      const nextFreePosition = { i: 0, j: 0 };

      const reducer = reducerMaker(
        () => ({ nextNumber, updatedRngCache: null }),
        () => ({ nextFreePosition, updatedRngCache: null })
      );

      const state = {
        list: [
          {
            board: [
              [0, 0],
              [2, 2]
            ],
            scoreWon: 0
          }
        ],
        rngCache: null
      };
      const x = nextNumber;
      const expectedState = {
        list: [
          state.list[0],
          {
            board: [
              [x, 0],
              [4, 0]
            ],
            scoreWon: 4
          }
        ],
        rngCache: null
      };

      const action = actions.moveLeft();
      const actualState = reducer(state, action);

      expect(actualState).toEqual(expectedState);
    });

    it(`add a new move with the board moved up and
       updated with a new number on ${actions.MOVE_UP}`, () => {

      const nextNumber = 4;
      const nextFreePosition = { i: 1, j: 1 };

      const reducer = reducerMaker(
        () => ({ nextNumber, updatedRngCache: null }),
        () => ({ nextFreePosition, updatedRngCache: null })
      );

      const state = {
        list: [
          {
            board: [
              [2, 0],
              [2, 0]
            ],
            scoreWon: 0
          }
        ],
        rngCache: null
      };
      const x = nextNumber;
      const expectedState = {
        list: [
          state.list[0],
          {
            board: [
              [4, 0],
              [0, x]
            ],
            scoreWon: 4
          }
        ],
        rngCache: null
      };

      const action = actions.moveUp();
      const actualState = reducer(state, action);

      expect(actualState).toEqual(expectedState);
    });

    it(`add a new move with the board moved right and
       updated with a new number on ${actions.MOVE_RIGHT}`, () => {

      const nextNumber = 4;
      const nextFreePosition = { i: 1, j: 0 };

      const reducer = reducerMaker(
        () => ({ nextNumber, updatedRngCache: null }),
        () => ({ nextFreePosition, updatedRngCache: null })
      );

      const state = {
        list: [
          {
            board: [
              [2, 2],
              [0, 0]
            ],
            scoreWon: 0
          }
        ],
        rngCache: null
      };
      const x = nextNumber;
      const expectedState = {
        list: [
          state.list[0],
          {
            board: [
              [0, 4],
              [x, 0]
            ],
            scoreWon: 4
          }
        ],
        rngCache: null
      };

      const action = actions.moveRight();
      const actualState = reducer(state, action);

      expect(actualState).toEqual(expectedState);
    });

    it(`add a new move with the board moved down and
       updated with a new number on ${actions.MOVE_DOWN}`, () => {

      const nextNumber = 4;
      const nextFreePosition = { i: 0, j: 1 };

      const reducer = reducerMaker(
        () => ({ nextNumber, updatedRngCache: null }),
        () => ({ nextFreePosition, updatedRngCache: null })
      );

      const state = {
        list: [
          {
            board: [
              [2, 0],
              [2, 0]
            ],
            scoreWon: 0
          }
        ],
        rngCache: null
      };
      const x = nextNumber;
      const expectedState = {
        list: [
          state.list[0],
          {
            board: [
              [0, x],
              [4, 0]
            ],
            scoreWon: 4
          }
        ],
        rngCache: null
      };

      const action = actions.moveDown();
      const actualState = reducer(state, action);

      expect(actualState).toEqual(expectedState);
    });
  });
});
