import { useBearStore } from '@/store';
import { useMutation } from '@tanstack/react-query';

export const usePostGetFactorioSchoolData = () => {
  const session = useBearStore(state => state.session);

  return useMutation({
    mutationKey: ['factorio-school-data'],
    mutationFn: async (id: string) => {
      if (!session?.access_token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(
        `${import.meta.env.VITE_GET_FACTORIO_SCHOOL_DATA}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch blueprint data');
      }

      return response.json();
    },
    onError: (error: Error) => {
      console.error('Error fetching Factorio School data:', error);
    },
  });
};
