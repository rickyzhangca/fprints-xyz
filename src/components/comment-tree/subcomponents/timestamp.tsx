import fromnow from 'fromnow';

import { IComment } from '@/supabase';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui';

export const Timestamp = ({ created_at }: Pick<IComment, 'created_at'>) => {
  return (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger className="w-fit">
        <span className="text-sm text-steel-400">
          {fromnow(new Date(created_at), {
            max: 1,
            suffix: true,
          })}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>{new Date(created_at).toLocaleString()}</p>
      </TooltipContent>
    </Tooltip>
  );
};
