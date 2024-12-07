import { SwappableMap } from '@/components';
import { Swappables } from './swappables';
type SwappablesGroupProps = {
  group: keyof SwappableMap;
  swappableMap: SwappableMap;
  setSwappableMap: (swappableMap: SwappableMap) => void;
};

export const SwappablesGroup = ({
  group,
  swappableMap,
  setSwappableMap,
}: SwappablesGroupProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="w-fit rounded-lg bg-steel-800 px-1.5 py-0.5 text-sm font-medium text-steel-50">
        {group}
      </p>
      {swappableMap[group].length === 0 ? (
        <p className="pl-0.5 text-sm text-steel-50/50">
          No {group} found for swapping
        </p>
      ) : (
        <Swappables
          group={group}
          mappedSwappables={swappableMap[group]}
          setMappedSwappables={s =>
            setSwappableMap({ ...swappableMap, [group]: s })
          }
        />
      )}
    </div>
  );
};
