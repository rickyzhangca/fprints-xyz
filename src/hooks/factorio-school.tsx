import { useBearStore } from '@/store';
import { supabase, SupabaseEdgeFunctions } from '@/supabase';
import { useMutation } from '@tanstack/react-query';
export const usePostGetFactorioSchoolData = () => {
  const session = useBearStore(state => state.session);

  return useMutation({
    mutationKey: ['factorio-school-data'],
    mutationFn: async (id: string) => {
      if (!session?.access_token) {
        throw new Error('No authentication token found');
      }
      const res = await supabase.functions.invoke(
        SupabaseEdgeFunctions.proxyFactorioSchoolApi,
        {
          body: JSON.stringify({ id }),
        }
      );
      if (res.error) {
        throw new Error('Failed to fetch blueprint data');
      }
      return res.data;
    },
    onError: (error: Error) => {
      console.error('Error fetching Factorio School data:', error);
    },
  });
};
