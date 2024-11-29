import { BlueprintComponentIcon } from '@/components/blueprint-glance/subcomponents/blueprint-component-icon';
import { BlueprintUtils, IBlueprintWrapper } from '@/utils';

export const BlueprintComponents = ({ data }: { data: IBlueprintWrapper }) => {
  const components = BlueprintUtils.Analysis.countComponents(data);

  if (!components || Object.keys(components).length === 0) {
    return (
      <p className="border-t border-steel-700 p-2 text-steel-400">
        Empty blueprint
      </p>
    );
  }
  return (
    <div className="flex flex-wrap gap-2 border-t border-steel-700 p-2">
      {Object.entries(components).map(([key, value]) => (
        <BlueprintComponentIcon key={key} component={key} count={value} />
      ))}
    </div>
  );
};
