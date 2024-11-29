import { IBlueprintWrapper } from '@/utils/blueprint/types';

export const getBlueprintType = (blueprint: IBlueprintWrapper) => {
  if (blueprint.blueprint) return 'blueprint';
  if (blueprint.blueprint_book) return 'blueprint_book';
  if (blueprint.deconstruction_planner) return 'deconstruction_planner';
  if (blueprint.upgrade_planner) return 'upgrade_planner';
  return 'blueprint';
};
