import { UpgradePlannerComponentIcon } from '@/components/blueprint-glance/subcomponents/upgrade-planner-component-icon';
import { IBlueprintWrapper } from '@/utils';

export const UpgradePlannerComponents = ({
  data,
}: {
  data: IBlueprintWrapper;
}) => {
  const mappers = data.upgrade_planner?.settings?.mappers;

  if (!mappers || mappers.length === 0) {
    return (
      <p className="border-t border-steel-700 p-2 text-steel-400">
        Empty upgrade planner
      </p>
    );
  }
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-2 border-t border-steel-700 p-2">
      {mappers.map((mapper, i) => (
        <div key={i} className="flex items-center gap-0.5">
          <UpgradePlannerComponentIcon
            key={`from-${i}`}
            component={mapper.from?.name ? mapper.from?.name : '_missing'}
          />
          <UpgradePlannerComponentIcon
            key={`to-${i}`}
            component={mapper.to?.name ? mapper.to?.name : '_missing'}
          />
        </div>
      ))}
    </div>
  );
};
