import { useBearStore } from '@/store';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useCreateLike = () => {
  const supabase = useBearStore(state => state.supabase);
  const user = useBearStore(state => state.user);
  const likesHistory = useBearStore(state => state.likesHistory);
  const setLikesHistory = useBearStore(state => state.setLikesHistory);

  return useMutation({
    mutationFn: async (blueprintId: string) => {
      return await supabase?.from('likes').insert({
        blueprint_id: blueprintId,
        user_id: user?.id,
      });
    },
    onSuccess: (_, blueprintId) => {
      setLikesHistory([
        ...likesHistory,
        { id: blueprintId, at: new Date(), isLiked: true },
      ]);
    },
  });
};

export const useDeleteLike = () => {
  const supabase = useBearStore(state => state.supabase);
  const user = useBearStore(state => state.user);
  const likesHistory = useBearStore(state => state.likesHistory);
  const setLikesHistory = useBearStore(state => state.setLikesHistory);

  return useMutation({
    mutationFn: async (blueprintId: string) => {
      return await supabase
        ?.from('likes')
        .delete()
        .eq('blueprint_id', blueprintId)
        .eq('user_id', user?.id ?? '');
    },
    onSuccess: (_, blueprintId) => {
      setLikesHistory([
        ...likesHistory,
        { id: blueprintId, at: new Date(), isLiked: false },
      ]);
    },
  });
};

export const useGetLikedBlueprints = (enabled: boolean) => {
  const supabase = useBearStore(state => state.supabase);
  const user = useBearStore(state => state.user);
  const sort = useBearStore(state => state.sort);

  return useQuery({
    queryKey: ['get-my-liked-blueprints', sort],
    queryFn: async () => {
      const { data } = await supabase!
        .from('my_liked_blueprint_cards')
        .select('*')
        .order(sort === 'Most recent' ? 'liked_at' : 'like_count', {
          ascending: false,
        });
      return data ?? [];
    },
    enabled: !!user && enabled,
  });
};

export const useGetLikesCount = () => {
  const supabase = useBearStore(state => state.supabase);
  const session = useBearStore(state => state.session);

  return useQuery({
    queryKey: ['get-user-likes-count', session?.user.id],
    queryFn: async () => {
      const { count, error } = await supabase!
        .from('likes')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session!.user.id);

      if (error) throw error;
      return count;
    },
    enabled: !!session?.user.id,
  });
};
