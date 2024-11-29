import { IBlueprintDetails } from '@/supabase';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui';
import fromnow from 'fromnow';
import { PenIcon } from 'lucide-react';

export const Updated = ({
  updated_at,
}: Pick<IBlueprintDetails, 'updated_at'>) => {
  if (!updated_at) return null;
  return (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger>
        <div className="flex items-center gap-1.5 text-steel-500">
          <PenIcon className="size-4 shrink-0" />
          <p className="break-all">
            Updated{' '}
            {fromnow(new Date(updated_at ?? ''), {
              max: 1,
              suffix: true,
            })}
          </p>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{new Date(updated_at).toLocaleString()}</p>
      </TooltipContent>
    </Tooltip>
  );
};
