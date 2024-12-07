import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/ui';
import { BlueprintUtils, IBlueprintWrapper } from '@/utils';
import { useEffect, useState } from 'react';
import { CopyButton } from '../copy-button';
import { SwapIcon } from './subcomponents/swap-icon';
import { SwappablesGroup } from './subcomponents/swappables-group';

type SwapBlueprintButtonProps = {
  blueprintData: IBlueprintWrapper;
};

export type Swappable = {
  from: string;
  to: string;
};

export type SwappableMap = {
  entities: Swappable[];
  tiles: Swappable[];
  items: Swappable[];
};

export const SwapBlueprintButton = ({
  blueprintData,
}: SwapBlueprintButtonProps) => {
  const [swappableMap, setSwappableMap] = useState<SwappableMap>({
    entities: [],
    tiles: [],
    items: [],
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open)
      setSwappableMap(BlueprintUtils.Swapping.getSwappableMap(blueprintData));
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger onClick={e => e.stopPropagation()}>
        <Button
          variant="headless"
          data-umami-event="swapping"
          className="ml-2 p-2 text-steel-50 opacity-40 transition duration-75 hover:opacity-100"
        >
          <SwapIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="flex flex-col gap-0 p-0"
        onClick={e => e.stopPropagation()}
      >
        <SheetHeader className="gap-4 bg-sky-600 p-6 pt-12">
          <p className="w-fit rounded bg-white px-1 py-0.5 text-sm font-bold text-sky-600">
            BETA
          </p>
          <div className="flex flex-col">
            <SheetTitle>Swap components</SheetTitle>
            <p className="text-sm text-white/70">
              Adapt the blueprint to your progress
            </p>
          </div>
        </SheetHeader>
        <div className="flex flex-col gap-5 p-6">
          <div className="flex flex-col gap-5">
            <SwappablesGroup
              group="entities"
              swappableMap={swappableMap}
              setSwappableMap={setSwappableMap}
            />
            <SwappablesGroup
              group="tiles"
              swappableMap={swappableMap}
              setSwappableMap={setSwappableMap}
            />
            <SwappablesGroup
              group="items"
              swappableMap={swappableMap}
              setSwappableMap={setSwappableMap}
            />
          </div>
          <CopyButton
            content={''}
            umamiEvent="copied-swapping"
            beforeCopy={() => {
              return BlueprintUtils.Conversion.encodeBase64String(
                BlueprintUtils.Swapping.swap(blueprintData, {
                  entities: swappableMap.entities.filter(
                    swappable => !!swappable.to
                  ),
                  tiles: swappableMap.tiles.filter(swappable => !!swappable.to),
                  items: swappableMap.items.filter(swappable => !!swappable.to),
                })
              );
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
