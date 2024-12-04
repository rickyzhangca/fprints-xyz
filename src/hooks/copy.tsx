import { useBearStore } from '@/store';
import { IBlueprint } from '@/supabase';
import { useMutation } from '@tanstack/react-query';

export const useRPCCopy = () => {
  const supabase = useBearStore(state => state.supabase);

  return useMutation({
    mutationFn: async ({ blueprintId }: { blueprintId: IBlueprint['id'] }) => {
      const { error } = await supabase.rpc('increment_blueprint_copy_count', { 
        blueprint_id: blueprintId,
      });
      if (error) throw error;
    },
  });
};
