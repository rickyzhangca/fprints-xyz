import { DeconstructionPlannerComponentIcon } from '@/components/blueprint-glance/subcomponents/deconstruction-planner-component-icon';
import { IBlueprintWrapper } from '@/utils';

export const DeconstructionPlannerComponents = ({
  data,
}: {
  data: IBlueprintWrapper;
}) => {
  const entityFilters = data.deconstruction_planner?.settings?.entity_filters;
  const tileFilters = data.deconstruction_planner?.settings?.tile_filters;

  if (
    (!entityFilters || entityFilters.length === 0) &&
    (!tileFilters || tileFilters.length === 0)
  ) {
    let message = 'Empty deconstruction planner';
    if (data.deconstruction_planner?.settings?.tile_selection_mode === 1) {
      message = 'Always tiles';
    } else if (
      data.deconstruction_planner?.settings?.tile_selection_mode === 2
    ) {
      message = 'Never tiles';
    } else if (data.deconstruction_planner?.settings?.trees_and_rocks_only) {
      message = 'Trees and rocks only';
    }
    return (
      <p className="border-t border-steel-700 p-2 text-steel-400">{message}</p>
    );
  }
  return (
    <div className="flex flex-wrap gap-2 border-t border-steel-700 p-2">
      {entityFilters?.map(filter => (
        <DeconstructionPlannerComponentIcon
          key={filter.index}
          name={filter.name}
        />
      ))}
      {tileFilters?.map(filter => (
        <DeconstructionPlannerComponentIcon
          key={filter.index}
          name={filter.name}
        />
      ))}
    </div>
  );
};
