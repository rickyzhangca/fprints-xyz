import { IBlueprintDetails } from '@/supabase';
import { CircleUserRoundIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const By = ({
  user_handle,
  user_id,
}: Pick<IBlueprintDetails, 'user_handle' | 'user_id'>) => {
  return (
    <div className="flex items-center gap-1.5 text-steel-500">
      <CircleUserRoundIcon className="size-4 shrink-0" />
      <p className="break-all">
        By{' '}
        <Link
          className="text-fern-400 hover:text-fern-500 active:text-fern-600"
          to={`/user/${user_id}`}
        >
          {user_handle}
        </Link>
      </p>
    </div>
  );
};
