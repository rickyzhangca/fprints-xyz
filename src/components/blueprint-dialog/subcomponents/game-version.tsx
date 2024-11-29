import { IBlueprintDetails } from '@/supabase';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui';
import { Gamepad2Icon } from 'lucide-react';

export const GameVersion = ({
  game_version,
}: Pick<IBlueprintDetails, 'game_version'>) => {
  return (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger>
        <div className="flex items-center gap-1.5 text-steel-500">
          <Gamepad2Icon className="size-4 shrink-0" />
          <p className="break-all">{game_version}</p>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Created in game version {game_version}</p>
      </TooltipContent>
    </Tooltip>
  );
};
