import { reddit } from '@/assets';
import { CollectButton, LikeButton } from '@/components';
import type { IBlueprintDetails } from '@/supabase';
import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@/ui';
import { getPermalink } from '@/utils';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Controls = ({ blueprint }: { blueprint: IBlueprintDetails }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex w-full min-w-0 items-center justify-between gap-3 border-t border-steel-800 bg-steel-900 p-6">
      <div className="flex min-w-0 items-center gap-2">
        <Button
          data-umami-event="copied"
          autoFocus
          leftIcon={
            copied ? (
              <CheckIcon
                className="size-4 shrink-0"
                absoluteStrokeWidth
                strokeWidth={2.5}
              />
            ) : (
              <CopyIcon
                className="size-4 shrink-0"
                absoluteStrokeWidth
                strokeWidth={2.5}
              />
            )
          }
          onClick={() => {
            navigator.clipboard.writeText(blueprint.blueprint_string ?? '');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
        >
          {copied ? 'Copied!' : 'Copy to clipboard'}
        </Button>
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
          >
            <img src={reddit} alt="Reddit" className="size-8 shrink-0" />
          </Link>
        </TooltipTrigger>
        <TooltipContent>Share to r/factorio</TooltipContent>
      </Tooltip>
    </div>
  );
};
