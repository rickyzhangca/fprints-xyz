import { describe, expect, it } from 'vitest';
import { decodeBase64String, encodeBase64String } from './base64-string';

const encoded =
  '0eNqVlu9ugyAUxV9l4TMuBaSrfYE9xLIsaO82EgQHuD9pfPfd2m1uqxj5ZET4cQ73XPVIatND57WNZH8kunE2kP3dkQT9ZJU5jVnVAtkTMNBE76xuikb7pteRDJRoe4B3smfDPSVgo44azuvHm48H27c1eJxAvznRKxs652NRg4mEks4FXObsaS9Eba4lJR/jdRjoBYj/gFo46L4tzrpQVecMXOLEMk5k4qplXLnaJvstjJKD9rjv+Hg3w5XruXxZ4Ta7EGwedJMN4vOg3Q9IhQBtbbR9KlrVPGsLBU9XlI8Hh8emu9PixnUd+KJR9Vi38/jDS68MbobPrfMtBnpGQLXayXbZCdssWWHpNP2zMtNqWYbY1G3GoYJnhV16KLQN4CNOuAwN+yPkVxgZn+Pz/JizNTFnIj/niXiyMh+VKqvMt8tX2Z2a8VGFuFSgL6xYV5/83hQJ67u1CmWewqnn0sibLCTfZLdxwjRnK8SxZEnKOSTPT2NKnchPo7hMI36v3/D+9LG+41RSQeU9jukILZKnnwJKjEI6jt16AHs1vZBewYcRJre8KqtKiqqU2w0bhk/nlrvI';

const decoded = {
  blueprint: {
    icons: [
      {
        signal: {
          name: 'electronic-circuit',
        },
        index: 1,
      },
    ],
    entities: [
      {
        entity_number: 1,
        name: 'transport-belt',
        position: {
          x: 0.5,
          y: 0.5,
        },
      },
      {
        entity_number: 2,
        name: 'medium-electric-pole',
        position: {
          x: 3.5,
          y: 0.5,
        },
      },
      {
        entity_number: 3,
        name: 'medium-electric-pole',
        position: {
          x: 9.5,
          y: 0.5,
        },
      },
      {
        entity_number: 4,
        name: 'transport-belt',
        position: {
          x: 13.5,
          y: 0.5,
        },
        direction: 8,
      },
      {
        entity_number: 5,
        name: 'transport-belt',
        position: {
          x: 12.5,
          y: 0.5,
        },
      },
      {
        entity_number: 6,
        name: 'transport-belt',
        position: {
          x: 0.5,
          y: 1.5,
        },
      },
      {
        entity_number: 7,
        name: 'transport-belt',
        position: {
          x: 0.5,
          y: 2.5,
        },
      },
      {
        entity_number: 8,
        name: 'assembling-machine-2',
        position: {
          x: 3.5,
          y: 2.5,
        },
        recipe: 'copper-cable',
        recipe_quality: 'normal',
      },
      {
        entity_number: 9,
        name: 'transport-belt',
        position: {
          x: 6.5,
          y: 2.5,
        },
      },
      {
        entity_number: 10,
        name: 'assembling-machine-1',
        position: {
          x: 9.5,
          y: 2.5,
        },
        recipe: 'electronic-circuit',
        recipe_quality: 'normal',
      },
      {
        entity_number: 11,
        name: 'long-handed-inserter',
        position: {
          x: 11.5,
          y: 2.5,
        },
        direction: 12,
      },
      {
        entity_number: 12,
        name: 'transport-belt',
        position: {
          x: 13.5,
          y: 1.5,
        },
        direction: 8,
      },
      {
        entity_number: 13,
        name: 'transport-belt',
        position: {
          x: 12.5,
          y: 1.5,
        },
      },
      {
        entity_number: 14,
        name: 'transport-belt',
        position: {
          x: 12.5,
          y: 2.5,
        },
      },
      {
        entity_number: 15,
        name: 'transport-belt',
        position: {
          x: 13.5,
          y: 2.5,
        },
        direction: 8,
      },
      {
        entity_number: 16,
        name: 'fast-inserter',
        position: {
          x: 1.5,
          y: 3.5,
        },
        direction: 12,
      },
      {
        entity_number: 17,
        name: 'transport-belt',
        position: {
          x: 0.5,
          y: 3.5,
        },
      },
      {
        entity_number: 18,
        name: 'fast-inserter',
        position: {
          x: 5.5,
          y: 3.5,
        },
        direction: 12,
      },
      {
        entity_number: 19,
        name: 'inserter',
        position: {
          x: 7.5,
          y: 3.5,
        },
        direction: 12,
      },
      {
        entity_number: 20,
        name: 'transport-belt',
        position: {
          x: 6.5,
          y: 3.5,
        },
      },
      {
        entity_number: 21,
        name: 'inserter',
        position: {
          x: 11.5,
          y: 3.5,
        },
        direction: 4,
      },
      {
        entity_number: 22,
        name: 'transport-belt',
        position: {
          x: 12.5,
          y: 3.5,
        },
      },
      {
        entity_number: 23,
        name: 'transport-belt',
        position: {
          x: 13.5,
          y: 3.5,
        },
        direction: 8,
      },
    ],
    wires: [[2, 5, 3, 5]],
    item: 'blueprint',
    label: 'Green circuit',
    version: 562949953945601,
  },
};

describe('string utils', () => {
  it('should decode blueprint string correctly', () => {
    const result = decodeBase64String(encoded);
    expect(result).toEqual(decoded);
  });

  it('should encode blueprint object correctly', () => {
    const result = encodeBase64String(decoded);
    expect(result).toBe(encoded);
  });

  it('should encode and decode back to original', () => {
    const result = decodeBase64String(encodeBase64String(decoded));
    expect(result).toEqual(decoded);
  });
});
