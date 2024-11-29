import { IBlueprintWrapper } from '@/utils/blueprint/types';

export type ComponentCounts = Record<string, number>;

export const countComponents = (
  blueprint: IBlueprintWrapper
): ComponentCounts => {
  const counts = {} as ComponentCounts;

  if (!blueprint.blueprint) return counts;

  // Count entities
  blueprint.blueprint.entities?.forEach(entity => {
    if (entity.name) {
      counts[entity.name] = (counts[entity.name] || 0) + 1;
    }
  });

  // Count tiles
  blueprint.blueprint.tiles?.forEach(tile => {
    if (tile.name) {
      counts[tile.name] = (counts[tile.name] || 0) + 1;
    }
  });

  const entries = Object.entries(counts);
  entries.sort((a, b) => {
    // sort by count descending
    const countDiff = b[1] - a[1];
    // if counts equal, sort by name
    return countDiff !== 0 ? countDiff : a[0].localeCompare(b[0]);
  });
  const result: ComponentCounts = {};
  for (let i = 0; i < entries.length; i++) {
    result[entries[i][0]] = entries[i][1];
  }

  return result;
};
