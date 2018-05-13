import * as boardUtils from './boardUtils';

/* random should be a method which returns a number in [0; 1) */
export function getCachedRandom(key, rngCache, random) {
  let randomNumber = rngCache[key];
  let updatedRngCache = rngCache;

  if (randomNumber === undefined) {
    randomNumber = random();

    updatedRngCache = {
      ...rngCache,
      [key]: randomNumber
    };
  }

  return { randomNumber, updatedRngCache };
}

export function getRandomNumber(
  movesCount,
  rngCache,
  random = Math.random
) {
  const key = `number-${movesCount}`;
  const {
    randomNumber,
    updatedRngCache
  } = getCachedRandom(key, rngCache, random);

  return {
    nextNumber: randomNumber < 0.5 ? 2 : 4,
    updatedRngCache
  };
}

export function getRandomFreePosition(
  board,
  movesCount,
  rngCache,
  random = Math.random
) {
  const freePositions = boardUtils.getFreePositions(board);

  if (freePositions.length > 0) {
    const key = `position-${movesCount}`;
    const {
      randomNumber,
      updatedRngCache
    } = getCachedRandom(key, rngCache, random);
    const positionIndex = Math.floor(randomNumber * freePositions.length);

    return {
      nextFreePosition: freePositions[positionIndex],
      updatedRngCache: updatedRngCache
    };
  }

  return {
    randomFreePosition: null,
    updatedRngCache: rngCache
  };
}
