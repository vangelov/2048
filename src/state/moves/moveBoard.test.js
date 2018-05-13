import moveBoard from './moveBoard';
import * as actions from './actions';

describe('moveboard', () => {

  it('returns a new board moved up and the score won', () => {
    const board = [
      [0, 4, 8, 0],
      [0, 4, 0, 2],
      [0, 4, 8, 2],
      [2, 4, 2, 2]
    ];

    const expectedBoard = [
      [2, 8, 16, 4],
      [0, 4,  2, 2],
      [0, 4,  0, 0],
      [0, 0,  0, 0]
    ];

    const expectedScoreWon = 0 + 8 + 16 + 4;

    const {
      movedBoard: actualBoard,
      scoreWon: actualScoreWon
    } = moveBoard(board, actions.MOVE_UP);

    expect(actualBoard).toEqual(expectedBoard);
    expect(actualScoreWon).toEqual(expectedScoreWon);
    expect(actualBoard).not.toBe(board);
  });

  it('returns a new board moved right and the score won', () => {
    const board = [
      [0, 4, 4, 2],
      [4, 4, 4, 4],
      [0, 8, 8, 2],
      [2, 4, 2, 2]
    ];

    const expectedBoard = [
      [0, 0,  8, 2],
      [0, 4,  4, 8],
      [0, 0, 16, 2],
      [0, 2, 4, 4]
    ];

    const expectedScoreWon = 8 + 8 + 16 + 4;

    const {
      movedBoard: actualBoard,
      scoreWon: actualScoreWon
    } = moveBoard(board, actions.MOVE_RIGHT);

    expect(actualBoard).toEqual(expectedBoard);
    expect(actualScoreWon).toEqual(expectedScoreWon);
    expect(actualBoard).not.toBe(board);
  });

  it('returns a new board moved right and the score won', () => {
    const board = [
      [0, 4, 4, 2],
      [4, 4, 4, 4],
      [0, 8, 8, 2],
      [2, 4, 2, 2]
    ];

    const expectedBoard = [
      [0, 0,  8, 2],
      [0, 4,  4, 8],
      [0, 0, 16, 2],
      [0, 2, 4, 4]
    ];

    const expectedScoreWon = 8 + 8 + 16 + 4;

    const {
      movedBoard: actualBoard,
      scoreWon: actualScoreWon
    } = moveBoard(board, actions.MOVE_RIGHT);

    expect(actualBoard).toEqual(expectedBoard);
    expect(actualScoreWon).toEqual(expectedScoreWon);
    expect(actualBoard).not.toBe(board);
  });

  it('returns a new board moved down and the score won', () => {
    const board = [
      [0, 4, 8, 4],
      [4, 4, 0, 4],
      [0, 4, 8, 2],
      [4, 4, 8, 2]
    ];

    const expectedBoard = [
      [0, 0,  0, 0],
      [0, 4,  0, 4],
      [0, 4,  8, 4],
      [8, 8, 16, 4]
    ];

    const expectedScoreWon = 8 + 8 + 16 + 4;

    const {
      movedBoard: actualBoard,
      scoreWon: actualScoreWon
    } = moveBoard(board, actions.MOVE_DOWN);

    expect(actualBoard).toEqual(expectedBoard);
    expect(actualScoreWon).toEqual(expectedScoreWon);
    expect(actualBoard).not.toBe(board);
  });

  it('returns a new board moved left and the score won', () => {
    const board = [
      [4, 4, 8, 0],
      [4, 4, 4, 4],
      [4, 4, 0, 2],
      [2, 0, 2, 2]
    ];

    const expectedBoard = [
      [8, 8, 0, 0],
      [8, 4, 4, 0],
      [8, 2, 0, 0],
      [4, 2, 0, 0]
    ];

    const expectedScoreWon = 8 + 8 + 8 + 4;

    const {
      movedBoard: actualBoard,
      scoreWon: actualScoreWon
    } = moveBoard(board, actions.MOVE_LEFT);

    expect(actualBoard).toEqual(expectedBoard);
    expect(actualScoreWon).toEqual(expectedScoreWon);
    expect(actualBoard).not.toBe(board);
  });
});
