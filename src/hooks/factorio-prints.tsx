import { useMutation } from '@tanstack/react-query';

export const usePostGetFactorioPrintsData = () => {
  return useMutation({
    mutationKey: ['factorio-prints-data'],
    mutationFn: async (url: string) => {
      const id = url.split('/').pop();
      const response = await fetch(
        `https://facorio-blueprints.firebaseio.com/blueprints/${id}.json`
      );
      const data = await response.json();
      if (!!data && !!data.blueprintString) return data;
      throw new Error('Failed to fetch blueprint data');
    },
    onError: (error: Error) => {
      console.error('Error fetching Factorio Prints data:', error);
    },
  });
};
