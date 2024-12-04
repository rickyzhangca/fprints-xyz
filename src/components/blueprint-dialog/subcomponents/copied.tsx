import { IBlueprintDetails } from '@/supabase';
import { AwardIcon } from 'lucide-react';

export const Copied = ({
  copy_count,
}: Pick<IBlueprintDetails, 'copy_count'>) => {
  if (!copy_count || copy_count < 2) return null;
  return (
    <div className="flex items-center gap-1.5 text-steel-500">
      <AwardIcon className="size-4 shrink-0" />
      <p className="break-all">Copied {copy_count} times</p>
    </div>
  );
};
