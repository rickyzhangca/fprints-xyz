import { describe, expect, it } from 'vitest';
import { decodeVersion } from '../get-game-version';

describe('decodeVersion', () => {
  it('should correctly decode version string into major, minor, patch, and dev components', () => {
    const version1 = '562949954797573';
    expect(decodeVersion(version1)).toEqual({
      major: 2,
      minor: 0,
      patch: 21,
      dev: 5,
    });
  });
});
