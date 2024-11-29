import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/ui';

import { useSignOut } from '@/hooks';
import { useBearStore } from '@/store';
import { DropdownMenuItem } from '@/ui';
import { LogOutIcon } from 'lucide-react';

export const AuthLogOut = () => {
  const { profile } = useBearStore();
  const signOut = useSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <p className="hidden max-w-32 shrink-0 truncate lg:block">
          {profile?.handle}
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => signOut.mutate()}>
          <LogOutIcon size={16} absoluteStrokeWidth strokeWidth={1.5} />
          Log out
        </DropdownMenuItem>
        {/* TODO: furnish blueprint lab */}
        {/* <DropdownMenuItem onSelect={() => navigate('/lab')}>
          <FlaskConicalIcon size={16} absoluteStrokeWidth strokeWidth={1.5} />
          Blueprint lab
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
