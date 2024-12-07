import { SwappableMap } from '@/components';
import { IBlueprintWrapper, itemsSchemaV1, itemsSchemaV2 } from '@/utils';
import { getBlueprintType } from '@/utils/blueprint/get-type';
import { z } from 'zod';

export const swap = (
  blueprint: IBlueprintWrapper,
  swappable: SwappableMap
): IBlueprintWrapper => {
  const type = getBlueprintType(blueprint);
  const swapComponent = (name: string | undefined) => {
    if (!name) return '';
    const match =
      swappable.entities.find(swap => swap.from === name) ||
      swappable.tiles.find(swap => swap.from === name) ||
      swappable.items.find(swap => swap.from === name);
    return match ? match.to : name;
  };

  if (type === 'blueprint' && blueprint.blueprint) {
    if (blueprint.blueprint.entities) {
      blueprint.blueprint.entities = blueprint.blueprint.entities.map(
        entity => ({
          ...entity,
          name: swapComponent(entity.name) ?? entity.name,
        })
      );
      blueprint.blueprint.entities = blueprint.blueprint.entities.map(
        (entity): typeof entity => {
          const items = entity.items;
          if (itemsSchemaV1.safeParse(items).success) {
            return {
              ...entity,
              items: Object.fromEntries(
                Object.entries(items ?? {}).map(([key, value]) => [
                  key,
                  Array.isArray(value)
                    ? value.map(item => swapComponent(item))
                    : typeof value === 'string'
                      ? swapComponent(value)
                      : value,
                ])
              ),
            };
          } else if (itemsSchemaV2.safeParse(items).success) {
            return {
              ...entity,
              items: (items as z.infer<typeof itemsSchemaV2>).map(item => ({
                ...item,
                id: {
                  ...item.id,
                  name: swapComponent(item.id.name) ?? item.id.name,
                },
              })),
            };
          }
          return entity;
        }
      );
    }
    if (blueprint.blueprint.tiles) {
      blueprint.blueprint.tiles = blueprint.blueprint.tiles.map(tile => ({
        ...tile,
        name: swapComponent(tile.name) ?? tile.name,
      }));
    }
  }

  if (type === 'blueprint_book' && blueprint.blueprint_book) {
    blueprint.blueprint_book.blueprints =
      blueprint.blueprint_book.blueprints.map((item: IBlueprintWrapper) =>
        swap(item, swappable)
      );
  }

  if (
    type === 'upgrade_planner' &&
    blueprint.upgrade_planner?.settings?.mappers
  ) {
    const newMappers = blueprint.upgrade_planner.settings.mappers.map(
      mapper => {
        const toMatch = mapper.to?.name
          ? swappable.entities.find(swap => swap.from === mapper.to?.name) ||
            swappable.tiles.find(swap => swap.from === mapper.to?.name)
          : undefined;

        if (toMatch) {
          return {
            ...mapper,
            from: mapper.from
              ? { ...mapper.from, name: swapComponent(mapper.from.name) }
              : mapper.from,
            to: mapper.to ? { ...mapper.to, name: toMatch.to } : mapper.to,
          };
        }

        return {
          ...mapper,
          from: mapper.from
            ? { ...mapper.from, name: swapComponent(mapper.from.name) }
            : mapper.from,
          to: mapper.to ? { ...mapper.to, name: mapper.to.name } : mapper.to,
        };
      }
    );

    blueprint.upgrade_planner.settings.mappers = newMappers;
  }

  if (
    type === 'deconstruction_planner' &&
    blueprint.deconstruction_planner?.settings
  ) {
    if (blueprint.deconstruction_planner.settings.entity_filters) {
      blueprint.deconstruction_planner.settings.entity_filters =
        blueprint.deconstruction_planner.settings.entity_filters.map(
          filter => ({
            ...filter,
            name: swapComponent(filter.name) ?? filter.name,
          })
        );
    }
    if (blueprint.deconstruction_planner.settings.tile_filters) {
      blueprint.deconstruction_planner.settings.tile_filters =
        blueprint.deconstruction_planner.settings.tile_filters.map(filter => ({
          ...filter,
          name: swapComponent(filter.name) ?? filter.name,
        }));
    }
  }

  return blueprint;
};
