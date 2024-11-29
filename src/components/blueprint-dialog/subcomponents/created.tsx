import { IBlueprintDetails } from '@/supabase';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui';
import fromnow from 'fromnow';
import { CirclePlusIcon } from 'lucide-react';

export const Created = ({
  created_at,
}: Pick<IBlueprintDetails, 'created_at'>) => {
  if (!created_at) return null;
  return (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger>
        <div className="flex items-center gap-1.5 text-steel-500">
          <CirclePlusIcon className="size-4 shrink-0" />
          <p className="break-all">
            Created{' '}
            {fromnow(new Date(created_at), {
              max: 1,
              suffix: true,
            })}
          </p>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{new Date(created_at).toLocaleString()}</p>
      </TooltipContent>
    </Tooltip>
  );
};
