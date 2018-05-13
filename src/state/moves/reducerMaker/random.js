import * as boardUtils from '../boardUtils';

function getCachedRandom(key, rngCache) {
  let randomNumber = rngCache[key];
  let updatedRngCache = rngCache;

  if (randomNumber === undefined) {
    randomNumber = Math.random();

    updatedRngCache = {
      ...rngCache,
      [key]: randomNumber
    };
  }

  return { randomNumber, updatedRngCache };
}

export function getRandomNumber(movesCount, rngCache) {
  const key = `number-${movesCount}`;
  const { randomNumber, updatedRngCache } = getCachedRandom(key, rngCache);

  return {
    nextNumber: randomNumber < 0.5 ? 2 : 4,
    updatedRngCache
  };
}

export function getRandomFreePosition(board, movesCount, rngCache) {
  const freePositions = boardUtils.getFreePositions(board);

  if (freePositions.length > 0) {
    const key = `position-${movesCount}`;
    const { randomNumber, updatedRngCache } = getCachedRandom(key, rngCache);
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
