import { useCdnStore } from '@/store';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui';
import { FileQuestion } from 'lucide-react';

const ComponentIconImage = ({ component }: { component: string }) => {
  const getCdnUrl = useCdnStore(state => state.getCdnUrl);

  const url = getCdnUrl(component);

  if (!url)
    return (
      <FileQuestion
        className="size-5 text-steel-600"
        absoluteStrokeWidth
        strokeWidth={1.5}
        aria-label={component}
      />
    );

  return <img src={url} alt={component} className="size-full" />;
};

export const BlueprintComponentIcon = ({
  component,
  count,
}: {
  component: string;
  count: number;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger type="button">
        <div className="relative size-[44px] rounded-md bg-black/60 p-1">
          <ComponentIconImage component={component} />
          <p className="absolute bottom-px right-1 text-sm font-semibold text-steel-50 shadow-sm">
            {count}
          </p>
        </div>
      </TooltipTrigger>
      <TooltipContent>{component}</TooltipContent>
    </Tooltip>
  );
};
