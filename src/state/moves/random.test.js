
import { getCachedRandom } from './random';

describe('random', () => {

  describe('getCachedRandom', () => {

    it('generates the value and updates the cached if the key is new', () => {
      const randomNumber = 8;
      const rngCache = {};
      const key = 'test';
      const actualResult = getCachedRandom(key, rngCache, () => randomNumber);
      const expectedResult = {
        randomNumber,
        updatedRngCache: {
          [key]: randomNumber
        }
      };

      expect(actualResult).toEqual(expectedResult);
    });

    it('returns the value from the cache if the key is present', () => {
      const randomNumber = 8;
      const key = 'test';
      const rngCache = { [key]: 2 };
      const actualResult = getCachedRandom(key, rngCache, () => randomNumber);
      const expectedResult = {
        randomNumber: rngCache[key],
        updatedRngCache: rngCache 
      };

      expect(actualResult).toEqual(expectedResult);
    });
  });
});
