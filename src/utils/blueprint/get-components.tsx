import { IBlueprintWrapper, itemsSchemaV1, itemsSchemaV2 } from '@/utils';
import { getBlueprintType } from '@/utils/blueprint/get-type';
import { z } from 'zod';

export const getComponents = (
  blueprint: IBlueprintWrapper,
  components: string[] = [],
  checkItems = true
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
    // Get item names
    const allItems = blueprint.blueprint?.entities
      ?.map(entity => entity.items)
      .filter(Boolean);
    // Get item names from entities
    if (checkItems && allItems) {
      allItems.forEach(items => {
        if (itemsSchemaV1.safeParse(items).success) {
          components.push(
            ...Object.keys(items as unknown as z.infer<typeof itemsSchemaV1>)
          );
        } else if (itemsSchemaV2.safeParse(items).success) {
          components.push(
            ...(items as unknown as z.infer<typeof itemsSchemaV2>).flatMap(
              item => item.id.name
            )
          );
        }
      });
    }

    // Combine and add to components array
    components.push(...entityNames, ...tileNames);
  }

  if (type === 'blueprint_book') {
    // Recursively get components from all blueprints in the book
    // ignore the index
    blueprint.blueprint_book?.blueprints.forEach((item: IBlueprintWrapper) => {
      if (item.blueprint) {
        getComponents({ blueprint: item.blueprint }, components, checkItems);
      }
      if (item.blueprint_book) {
        getComponents(
          { blueprint_book: item.blueprint_book },
          components,
          checkItems
        );
      }
      if (item.upgrade_planner) {
        getComponents(
          { upgrade_planner: item.upgrade_planner },
          components,
          checkItems
        );
      }
      if (item.deconstruction_planner) {
        getComponents(
          { deconstruction_planner: item.deconstruction_planner },
          components,
          checkItems
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
