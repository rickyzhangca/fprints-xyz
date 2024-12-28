import { cdnData } from '@/data';
import { useBearStore, useCdnStore } from '@/store';
import { supabase } from '@/supabase';
import { useEffect } from 'react';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const setSession = useBearStore(state => state.setSession);
  const setUser = useBearStore(state => state.setUser);
  const cdnStore = useCdnStore(state => state);

  useEffect(() => {
    if (!cdnStore.initialized) {
      cdnStore.initializeFiles(cdnData);
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setSession]);

  return <>{children}</>;
}
