import { getBoard, getScore, canMakeMoreMoves } from './selectors';

describe('moves selectors', () => {

  describe('getBoard', () => {

    it('returns the board from the last move', () => {
      const state = {
        moves: {
          list: [
            { board: [[0, 0], [0, 2]], scoreWon: 0 },
            { board: [[0, 2], [0, 0]], scoreWon: 0 }
          ],
          rngCache: {}
        }
      };

      const expectedBoard = state.moves.list[1].board;
      const actualBoard = getBoard(state);

      expect(actualBoard).toBe(expectedBoard);
    });
  });

  describe('getScore', () => {

    it('returns the sum of the scores won for each move', () => {
      const state = {
        moves: {
          list: [
            { board: null, scoreWon: 2 },
            { board: null, scoreWon: 8 },
            { board: null, scoreWon: 16 }
          ],
          rngCache: {}
        }
      };

      const expectedScore = 26;
      const actualScore = getScore(state);

      expect(actualScore).toEqual(expectedScore);
    });
  });

  describe('canMakeMoreMoves', () => {

    it('returns true when there are no moves made', () => {
      const state = {
        moves: {
          list: [],
          rngCache: {}
        }
      };

      const expectedResult = true;
      const actualResult = canMakeMoreMoves(state);

      expect(actualResult).toEqual(expectedResult);
    });

    it('returns true when there are still empty cells', () => {
      const board = [
        [8, 4, 16, 2],
        [0, 4,  0, 0],
        [2, 0,  0, 8],
        [2, 2,  2, 2]
      ];

      const state = {
        moves: {
          list: [
            { board, scoreWon: 0 }
          ],
          rngCache: {}
        }
      };

      const expectedResult = true;
      const actualResult = canMakeMoreMoves(state);

      expect(actualResult).toEqual(expectedResult);
    });

    it('returns true when there are still cells to merge', () => {
      const board = [
        [8, 8, 4, 2],
        [4, 4, 4, 4],
        [2, 2, 2, 8],
        [4, 2, 4, 2]
      ];

      const state = {
        moves: {
          list: [
            { board, scoreWon: 0 }
          ],
          rngCache: {}
        }
      };

      const expectedResult = true;
      const actualResult = canMakeMoreMoves(state);

      expect(actualResult).toEqual(expectedResult);
    });

    it('returns false when there are no empty cells or cells to merge', () => {
      const board = [
        [8, 2,  4, 2],
        [4, 8,  2, 4],
        [2, 4, 16, 8],
        [4, 8,  4, 2 ]
      ];

      const state = {
        moves: {
          list: [
            { board, scoreWon: 0 }
          ],
          rngCache: {}
        }
      };

      const expectedResult = false;
      const actualResult = canMakeMoreMoves(state);

      expect(actualResult).toEqual(expectedResult);
    });
  });
});
