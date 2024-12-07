import { SwappableMap } from '@/components';
import { swappables } from '@/data';
import { BlueprintUtils, IBlueprintWrapper } from '@/utils';

export const getSwappableMap = (blueprint: IBlueprintWrapper): SwappableMap => {
  const components = BlueprintUtils.Analysis.getComponents(blueprint);

  return {
    entities: components
      .filter(component =>
        swappables.entities.some(group => group.includes(component))
      )
      .map(component => ({
        from: component,
        to: '',
      })),
    tiles: components
      .filter(component =>
        swappables.tiles.some(group => group.includes(component))
      )
      .map(component => ({
        from: component,
        to: '',
      })),
    items: components
      .filter(component =>
        swappables.items.some(group => group.includes(component))
      )
      .map(component => ({
        from: component,
        to: '',
      })),
  };
};
