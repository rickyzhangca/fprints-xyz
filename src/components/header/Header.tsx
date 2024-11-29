import { CreateBlueprintButton } from '@/components/create-blueprint-button';
import {
  AuthLogin,
  AuthLogOut,
  AuthSignUp,
  Logo,
} from '@/components/header/subcomponents';
import { SearchBar } from '@/components/search-bar';
import { useBearStore } from '@/store';

export const Header = () => {
  const { session, supabase } = useBearStore();

  if (!supabase) return null;

  return (
    <div className="flex items-center justify-between gap-4 py-5 lg:gap-6">
      <Logo />
      <div className="flex flex-1 items-center gap-4">
        <CreateBlueprintButton />
        <SearchBar />
      </div>
      <div className="flex items-center gap-4">
        {session ? (
          <AuthLogOut />
        ) : (
          <>
            <AuthSignUp />
            <AuthLogin />
          </>
        )}
      </div>
    </div>
  );
};
