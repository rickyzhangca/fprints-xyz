import { IBlueprintWrapper } from '@/utils/blueprint/types';

export type BlueprintType =
  | 'blueprint'
  | 'blueprint_book'
  | 'upgrade_planner'
  | 'deconstruction_planner';

export const getBlueprintType = (
  blueprint: IBlueprintWrapper
): BlueprintType => {
  if (Object.keys(blueprint).length === 0) return 'blueprint';
  if (blueprint.blueprint) return 'blueprint';
  if (blueprint.blueprint_book) return 'blueprint_book';
  if (blueprint.deconstruction_planner) return 'deconstruction_planner';
  if (blueprint.upgrade_planner) return 'upgrade_planner';
  return 'blueprint';
};
