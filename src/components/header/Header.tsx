import { CreateBlueprintButton } from '@/components/create-blueprint-button';
import {
  AuthLogin,
  AuthLogOut,
  AuthSignUp,
  Logo,
} from '@/components/header/subcomponents';
import { SearchBar } from '@/components/search-bar';
import { useBearStore } from '@/store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui';
import { UserIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Header = () => {
  const { session, supabase } = useBearStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (isOpen) setIsOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  if (!supabase) return null;

  return (
    <div className="flex items-center justify-between gap-4 py-5 lg:gap-6">
      <Logo />
      <h1 className="absolute -z-10 select-none text-[#151515]">Fprints</h1>
      <div className="flex flex-1 items-center gap-4">
        <CreateBlueprintButton />
        <SearchBar />
      </div>
      <div className="flex items-center gap-4">
        {session ? (
          <AuthLogOut />
        ) : (
          <>
            <div className="hidden items-center gap-2 md:flex">
              <AuthSignUp />
              <AuthLogin />
            </div>
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger className="md:hidden">
                <UserIcon size={16} absoluteStrokeWidth strokeWidth={2} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={e => e.preventDefault()}>
                  <AuthSignUp />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={e => e.preventDefault()}>
                  <AuthLogin />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </div>
  );
};
