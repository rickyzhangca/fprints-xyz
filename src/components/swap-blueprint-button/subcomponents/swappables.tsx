import { ComponentIcon } from '@/components';
import { swappables } from '@/data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui';
import { ArrowRightIcon } from 'lucide-react';
import { Swappable, SwappableMap } from '../SwapBlueprintButton';

export const Swappables = ({
  group,
  mappedSwappables,
  setMappedSwappables,
}: {
  group: keyof SwappableMap;
  mappedSwappables: Swappable[];
  setMappedSwappables: (mappedSwappables: Swappable[]) => void;
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {mappedSwappables.map(({ from, to }) => (
        <div key={from} className="flex items-center gap-0.5">
          <ComponentIcon component={from} />
          <ArrowRightIcon className="size-4 text-steel-50" />
          <DropdownMenu>
            <DropdownMenuTrigger variant="headless">
              <ComponentIcon component={to} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {swappables[group]
                ?.find(s => s.includes(from))
                ?.map(component => (
                  <DropdownMenuItem
                    key={component}
                    onSelect={() =>
                      setMappedSwappables(
                        mappedSwappables.map(item => {
                          if (item.from === from) {
                            return {
                              ...item,
                              to: component,
                            };
                          }
                          return item;
                        })
                      )
                    }
                  >
                    <ComponentIcon component={component} />
                    {component}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
};
