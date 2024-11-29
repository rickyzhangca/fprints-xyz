import { IBlueprintDetails } from '@/supabase';
import { FolderIcon } from 'lucide-react';

export const Collected = ({
  collection_count,
}: Pick<IBlueprintDetails, 'collection_count'>) => {
  if (!collection_count) return null;
  return (
    <div className="flex items-center gap-1.5 text-steel-500">
      <FolderIcon className="size-4 shrink-0" />
      <p className="break-all">
        In {collection_count}{' '}
        {collection_count === 1 ? 'collection' : 'collections'}
      </p>
    </div>
  );
};
