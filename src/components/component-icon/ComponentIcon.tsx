import { useCdnStore } from '@/store';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui/tooltip/Tooltip';
import { tw } from '@/utils/tw';

type ComponentIconProps = {
  variant?: 'default' | 'positive' | 'negative' | 'ghost';
  component: string;
};

export const ComponentIcon = ({
  component,
  variant = 'default',
}: ComponentIconProps) => {
  const getCdnUrl = useCdnStore(state => state.getCdnUrl);

  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger className="shrink-0">
        <button
          key={component}
          className={tw(
            'flex items-center justify-center rounded-md border border-transparent',
            variant === 'default' &&
              'border-steel-600 bg-steel-950 p-1 hover:bg-black/30 active:bg-black/40',
            variant === 'positive' &&
              'border-fern-400 bg-fern-400 p-1 hover:bg-fern-500 active:bg-fern-600',
            variant === 'negative' &&
              'border-red-400 bg-red-400 p-1 hover:bg-red-500 active:bg-red-600'
          )}
        >
          <img
            src={getCdnUrl(component) ?? ''}
            alt={component}
            className="size-8"
          />
        </button>
      </TooltipTrigger>
      <TooltipContent>{component}</TooltipContent>
    </Tooltip>
  );
};
