import { useBearStore } from '@/store';
import { ITag } from '@/supabase';
import { useQuery } from '@tanstack/react-query';

export const useGetTags = (enabled = true) => {
  const supabase = useBearStore(state => state.supabase);
  if (!supabase) throw new Error('Supabase client not initialized');

  return useQuery<ITag[]>({
    queryKey: ['get-tags'],
    queryFn: async () => {
      const { data } = await supabase
        .from('tags')
        .select('*')
        .order('created_at', { ascending: true });
      if (!data) return [];
      return data;
    },
    enabled,
  });
};
