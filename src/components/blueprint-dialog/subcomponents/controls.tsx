import { reddit } from '@/assets';
import { CollectButton, CopyButton, LikeButton } from '@/components';
import { useRPCCopy } from '@/hooks';
import type { IBlueprintDetails } from '@/supabase';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui';
import { getPermalink } from '@/utils';
import { Link } from 'react-router-dom';

export const Controls = ({ blueprint }: { blueprint: IBlueprintDetails }) => {
  const rpcCopy = useRPCCopy();

  return (
    <div className="flex w-full min-w-0 items-center justify-between gap-3 border-t border-steel-800 bg-steel-900 p-3 md:p-6">
      <div className="flex min-w-0 items-center gap-2">
        <CopyButton
          content={blueprint.blueprint_string ?? ''}
          onCopy={() => rpcCopy.mutate({ blueprintId: blueprint.id ?? '' })}
          umamiEvent="copied"
        />
        <CollectButton blueprint={blueprint} />
        <LikeButton blueprint={blueprint} />
      </div>
      <Tooltip delayDuration={80}>
        <TooltipTrigger className="shrink-0 transition-all duration-75 hover:rotate-6 hover:scale-150 active:rotate-0 active:scale-100">
          <Link
            to={`https://www.reddit.com/r/factorio/submit?url=${getPermalink(
              blueprint.id ?? ''
            )}&title=${blueprint.title}&type=link`}
            target="_blank"
            data-umami-event="reddit-shared"
          >
            <img src={reddit} alt="Reddit" className="size-8 shrink-0" />
          </Link>
        </TooltipTrigger>
        <TooltipContent>Share to r/factorio</TooltipContent>
      </Tooltip>
    </div>
  );
};
