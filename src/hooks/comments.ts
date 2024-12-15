import { useBearStore } from '@/store';
import { IComment, ICommentInsert } from '@/supabase';
import { buildCommentTree } from '@/utils/comment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetCommentTreeByBlueprintId = (blueprintId: string) => {
  const supabase = useBearStore(state => state.supabase);

  return useQuery({
    queryKey: ['get-comments-by-blueprint-id', blueprintId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('blueprint_id', blueprintId);

      if (error) throw error;

      return buildCommentTree(data);
    },
  });
};

export const useCreateComment = () => {
  const supabase = useBearStore(state => state.supabase);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (comment: ICommentInsert) => {
      const { data, error } = await supabase.from('comments').insert(comment);

      if (error) throw error;

      queryClient.invalidateQueries({
        queryKey: ['get-comments-by-blueprint-id', comment.blueprint_id],
      });

      return data;
    },
  });
};

export const useDeleteComment = () => {
  const supabase = useBearStore(state => state.supabase);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (comment: IComment) => {
      const { error } = await supabase
        .from('comments')
        .update({ is_deleted: true })
        .eq('id', comment.id);

      if (error) throw error;

      queryClient.invalidateQueries({
        queryKey: ['get-comments-by-blueprint-id', comment.blueprint_id],
      });
    },
  });
};
