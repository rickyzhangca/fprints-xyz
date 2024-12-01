import { LockIcon } from 'lucide-react';

import { crashSite } from '@/assets';
import { IBlueprintCard } from '@/supabase';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui';
import { BookIcon } from 'lucide-react';

export const Badges = ({ blueprint }: { blueprint: IBlueprintCard }) => {
  return (
    <div className="absolute bottom-1.5 right-1.5 z-10 flex items-center gap-1">
      {blueprint.meta?.includes('first-100') && (
    <Tooltip>
      <TooltipTrigger className="rounded bg-amber-400 p-1 text-steel-950">
        <img src={crashSite} alt="crash-site" className="size-4" />
      </TooltipTrigger>
      <TooltipContent>
        Was at the crash site
        <p className="text-steel-400">
          The first 100 blueprints shared in Fprints
        </p>
      </TooltipContent>
    </Tooltip>
  )}
  {blueprint.type === 'blueprint_book' && (
    <div className="rounded bg-sky-600 p-1 text-steel-50">
      <BookIcon size={16} />
    </div>
  )}
  {!blueprint.is_public && (
          <div className="rounded bg-steel-200 p-1 text-steel-950">
            <LockIcon size={16} />
          </div>
        )}
    </div>
  );
};
