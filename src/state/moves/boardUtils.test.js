import * as boardUtils from './boardUtils';

describe('boardUtils', () => {

  describe('create', () => {

    it('creates a new board filled with zeroes with the sepecified size', () => {
      const actualBoard = boardUtils.create(4);
      const expectedBoard = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      expect(actualBoard).toEqual(expectedBoard);
    });

    it('throws an error when size is 0', () => {
      expect(() => boardUtils.create(0)).toThrow();
    });

    it('throws an error when size is less than 0', () => {
      expect(() => boardUtils.create(-1)).toThrow();
    });
  });

  describe('getFreePositions', () => {

    it('returns a list containing the positions of zeros', () => {
      const board = [
        [0, 2, 2],
        [2, 8, 0],
        [0, 0, 4]
      ];
      const actualPositions = boardUtils.getFreePositions(board);
      const expectedPositions = [
        { i: 0, j: 0 },
        { i: 1, j: 2 },
        { i: 2, j: 0 },
        { i: 2, j: 1 }
      ];

      const comparator = (x, y) => {
        return JSON.stringify(x).localeCompare(JSON.stringify(y));
      }

      actualPositions.sort(comparator);
      expectedPositions.sort(comparator);

      expect(actualPositions).toEqual(expectedPositions);
    });

    it('returns an empty array if there are no free positions', () => {
      const board = [
        [8, 2, 2],
        [2, 2, 8],
        [2, 8, 4]
      ];
      const actualPositions = boardUtils.getFreePositions(board);
      const expectedPositions = [];

      expect(actualPositions).toEqual(expectedPositions);
    });
  });

  describe('addNumber', () => {

    it('returns the same board if the position is null', () => {
      const board = [
        [2, 2],
        [4, 8]
      ];

      const actualBoard = boardUtils.addNumber(board, 2, null);
      const expectedBoard = board;

      expect(actualBoard).toBe(board);
    });

    it('returns a new board with a number added to the position', () => {
      const board = [
        [2, 0],
        [4, 8]
      ];
      const position = { i: 0, j: 1 };

      const actualBoard = boardUtils.addNumber(board, 2, position);
      const expectedBoard = [
        [2, 2],
        [4, 8]
      ];;

      expect(actualBoard).not.toBe(board);
      expect(actualBoard).toEqual(expectedBoard);
    });
  });
});
