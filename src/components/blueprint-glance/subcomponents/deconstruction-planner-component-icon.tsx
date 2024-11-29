import { useCdnStore } from '@/store';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui';
import { FileQuestion, XIcon } from 'lucide-react';

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

export const DeconstructionPlannerComponentIcon = ({
  name,
}: {
  name: string;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger type="button">
        <div className="relative size-[44px] rounded-md bg-black/60 p-1">
          <ComponentIconImage component={name} />
          <XIcon
            absoluteStrokeWidth
            className="absolute bottom-px right-0.5 text-red-500 shadow-sm"
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>{name}</TooltipContent>
    </Tooltip>
  );
};
