import { useBearStore } from '@/store';
import type {
  Database,
  IBlueprint,
  ICollection,
  ICollectionWithBlueprintCount,
} from '@/supabase';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetCollections = () => {
  const supabase = useBearStore(state => state.supabase);
  const session = useBearStore(state => state.session);

  return useQuery({
    queryKey: ['get-my-collections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('collections')
        .select(
          `
          *,
          blueprint_count:collection_blueprints(count)
        `
        )
        .eq('user_id', session?.user?.id ?? '');

      if (error) throw error;
      //@ts-expect-error somehow it's an array
      return data as ICollectionWithBlueprintCount[];
    },
    enabled: !!session?.user?.id,
  });
};

export const useGetBlueprintsByCollection = (collectionId: string) => {
  const supabase = useBearStore(state => state.supabase);

  return useQuery<
    Database['public']['Views']['collection_blueprint_cards']['Row'][]
  >({
    queryKey: ['get-blueprints-by-collection', collectionId],
    queryFn: async () => {
      const { data } = await supabase
        .from('collection_blueprint_cards')
        .select('*')
        .eq('collection_id', collectionId);

      return data ?? [];
    },
    enabled: !!collectionId,
  });
};

export const useAddBlueprintToCollection = () => {
  const supabase = useBearStore(state => state.supabase);

  return useMutation({
    mutationFn: async ({
      blueprintId,
      collectionId,
    }: {
      blueprintId: IBlueprint['id'];
      collectionId: ICollection['id'];
    }) => {
      const { error } = await supabase
        .from('collection_blueprints')
        .insert({ blueprint_id: blueprintId, collection_id: collectionId });
      if (error) throw error;
    },
  });
};

export const useRemoveBlueprintFromCollection = () => {
  const supabase = useBearStore(state => state.supabase);

  return useMutation({
    mutationFn: async ({
      blueprintId,
      collectionId,
    }: {
      blueprintId: IBlueprint['id'];
      collectionId: ICollection['id'];
    }) => {
      const { error } = await supabase
        .from('collection_blueprints')
        .delete()
        .eq('blueprint_id', blueprintId)
        .eq('collection_id', collectionId);
      if (error) throw error;
    },
  });
};
