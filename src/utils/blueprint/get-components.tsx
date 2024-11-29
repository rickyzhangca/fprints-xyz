import { IBlueprintWrapper } from '@/utils';
import { getBlueprintType } from '@/utils/blueprint/get-type';

export const getComponents = (
  blueprint: IBlueprintWrapper,
  components: string[] = []
): string[] => {
  const type = getBlueprintType(blueprint);

  if (type === 'blueprint') {
    // Get entity names
    const entityNames =
      blueprint.blueprint?.entities
        ?.map(entity => entity.name)
        .filter((name): name is string => !!name) ?? [];
    // Get tile names
    const tileNames =
      blueprint.blueprint?.tiles
        ?.map(tile => tile.name)
        .filter((name): name is string => !!name) ?? [];
    // Combine and add to components array
    components.push(...entityNames, ...tileNames);
  }

  if (type === 'blueprint_book') {
    // Recursively get components from all blueprints in the book
    // ignore the index
    blueprint.blueprint_book?.blueprints.forEach((item: IBlueprintWrapper) => {
      if (item.blueprint) {
        getComponents({ blueprint: item.blueprint }, components);
      }
      if (item.blueprint_book) {
        getComponents({ blueprint_book: item.blueprint_book }, components);
      }
      if (item.upgrade_planner) {
        getComponents({ upgrade_planner: item.upgrade_planner }, components);
      }
      if (item.deconstruction_planner) {
        getComponents(
          { deconstruction_planner: item.deconstruction_planner },
          components
        );
      }
    });
  }

  if (type === 'upgrade_planner') {
    // Get from and to entities from upgrade rules
    blueprint.upgrade_planner?.settings?.mappers?.forEach(mapper => {
      if (mapper.from?.name) components.push(mapper.from.name);
      if (mapper.to?.name) components.push(mapper.to.name);
    });
  }

  if (type === 'deconstruction_planner') {
    // Get entity filters if they exist
    const entityFilters =
      blueprint.deconstruction_planner?.settings?.entity_filters?.map(
        filter => filter.name
      ) ?? [];
    // Get tile filters if they exist
    const tileFilters =
      blueprint.deconstruction_planner?.settings?.tile_filters?.map(
        filter => filter.name
      ) ?? [];
    // Add all filters to components
    components.push(...entityFilters, ...tileFilters);
  }

  // Remove duplicates and return
  return [...new Set(components)];
};
