import { useBearStore } from '@/store';
import type { Database, IBlueprintCard } from '@/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetBlueprintCardsCount = () => {
  const supabase = useBearStore(state => state.supabase);
  return useQuery({
    queryKey: ['get-blueprint-cards-count'],
    queryFn: async () => {
      const { count } = await supabase!.from('blueprint_card').select('*', {
        count: 'exact',
      });
      return count ?? 0;
    },
  });
};

export const useGetAllBlueprints = (page: number) => {
  const supabase = useBearStore(state => state.supabase);
  const sort = useBearStore(state => state.sort);
  const blueprintCardsPerPage = useBearStore(
    state => state.blueprintCardsPerPage
  );

  return useQuery<IBlueprintCard[]>({
    queryKey: ['get-all-blueprints', sort, page, blueprintCardsPerPage],
    queryFn: async () => {
      const { data } = await supabase!
        .from('blueprint_card')
        .select('*')
        .eq('is_public', true)
        .order(sort === 'Most recent' ? 'created_at' : 'like_count', {
          ascending: false,
        })
        .range(
          (page - 1) * blueprintCardsPerPage,
          page * blueprintCardsPerPage - 1
        );
      return data ?? [];
    },
  });
};

export const useCreateBlueprint = () => {
  const supabase = useBearStore(state => state.supabase);

  return useMutation({
    mutationFn: async ({
      blueprintProps,
      tags,
    }: {
      blueprintProps: Database['public']['Tables']['blueprints']['Insert'];
      tags: Database['public']['Tables']['blueprint_tags']['Insert']['tag_id'][];
    }) => {
      // First check total blueprint count
      const { count } = await supabase
        .from('blueprint_card')
        .select('*', { count: 'exact' });

      // Add first-100 to meta if count is less than 100
      const updatedBlueprintProps = {
        ...blueprintProps,
        meta: [
          ...(blueprintProps.meta || []),
          ...(count !== null && count < 100 ? ['first-100'] : []),
        ],
      };

      // Insert blueprint with potentially modified meta
      const insertBlueprint = await supabase
        .from('blueprints')
        .insert([updatedBlueprintProps])
        .select();

      if (insertBlueprint.error) {
        throw new Error(
          insertBlueprint.error?.message ?? 'Error creating blueprint'
        );
      }

      const blueprintId = insertBlueprint.data[0].id;
      if (!blueprintId) {
        throw new Error('Blueprint ID not found');
      }

      // Insert tags
      const insertBlueprintTags = await supabase.from('blueprint_tags').insert(
        tags.map((tag, i) => ({
          blueprint_id: blueprintId,
          tag_id: tag,
          is_main_tag: i === 0,
        }))
      );

      if (insertBlueprintTags.error) {
        throw new Error(
          insertBlueprintTags.error?.message ?? 'Error creating blueprint tags'
        );
      }

      return { id: blueprintId };
    },
  });
};

export const useGetMyBlueprints = () => {
  const supabase = useBearStore(state => state.supabase);
  const session = useBearStore(state => state.session);
  const sort = useBearStore(state => state.sort);

  return useQuery({
    queryKey: ['get-my-blueprints', session?.user.id, sort],
    queryFn: async () => {
      const { data } = await supabase!
        .from('my_blueprint_cards')
        .select('*')
        .order(sort === 'Most recent' ? 'created_at' : 'like_count', {
          ascending: false,
        });
      return data ?? [];
    },
  });
};

export const useGetBlueprintsByUserId = (userId: string) => {
  const supabase = useBearStore(state => state.supabase);
  const sort = useBearStore(state => state.sort);

  return useQuery({
    queryKey: ['get-blueprints-by-user-id', userId, sort],
    queryFn: async () => {
      const { data } = await supabase!
        .from('blueprint_card')
        .select('*')
        .eq('user_id', userId)
        .eq('is_public', true)
        .order(sort === 'Most recent' ? 'created_at' : 'like_count', {
          ascending: false,
        });
      return data ?? [];
    },
  });
};

export const useGetBlueprint = (blueprintId: string) => {
  const supabase = useBearStore(state => state.supabase);

  return useQuery({
    queryKey: ['get-blueprint-details', blueprintId],
    queryFn: async () => {
      const { data } = await supabase!
        .from('blueprint_details')
        .select('*')
        .eq('id', blueprintId);
      return data?.[0];
    },
  });
};

export const useUpdateBlueprint = () => {
  const supabase = useBearStore(state => state.supabase);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      blueprintId,
      blueprintProps,
      tags,
    }: {
      blueprintId: string;
      blueprintProps: Partial<
        Database['public']['Tables']['blueprints']['Update']
      >;
      tags: Database['public']['Tables']['blueprint_tags']['Insert']['tag_id'][];
    }) => {
      // Update blueprint details with current timestamp
      const updateBlueprint = await supabase
        .from('blueprints')
        .update({
          ...blueprintProps,
          updated_at: new Date().toISOString(),
        })
        .eq('id', blueprintId)
        .select('*');

      if (updateBlueprint.error) {
        throw new Error(
          updateBlueprint.error?.message ?? 'Error updating blueprint'
        );
      }

      // Delete existing tags
      const deleteTags = await supabase
        .from('blueprint_tags')
        .delete()
        .eq('blueprint_id', blueprintId)
        .select();

      if (deleteTags.error) {
        throw new Error(
          deleteTags.error?.message ?? 'Error deleting existing tags'
        );
      }

      // Insert new tags
      const insertTags = await supabase
        .from('blueprint_tags')
        .insert(
          tags.map((tag, i) => ({
            blueprint_id: blueprintId,
            tag_id: tag,
            is_main_tag: i === 0,
          }))
        )
        .select();

      if (insertTags.error) {
        throw new Error(
          insertTags.error?.message ?? 'Error updating blueprint tags'
        );
      }

      return { id: blueprintId };
    },
    onSuccess: () => void queryClient.invalidateQueries(),
  });
};

export const useDeleteBlueprint = () => {
  const supabase = useBearStore(state => state.supabase);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      blueprintId,
      blueprintImageUrl,
    }: {
      blueprintId: string;
      blueprintImageUrl: string;
    }) => {
      // Delete the blueprint from Supabase
      const { error } = await supabase
        .from('blueprints')
        .delete()
        .eq('id', blueprintId);

      if (error) {
        throw new Error(error.message);
      }

      // If there's an image URL, delete it from Bunny CDN
      if (blueprintImageUrl) {
        const { error: imageDeleteError } = await supabase.functions.invoke(
          'fprints-delete-image',
          {
            body: { imagePath: blueprintImageUrl },
          }
        );

        if (imageDeleteError) {
          console.error('Failed to delete image:', imageDeleteError);
        }
      }
    },
    onSuccess: () => {
      // Invalidate relevant queries to refresh the UI
      queryClient.invalidateQueries({
        queryKey: ['get-all-blueprints'],
      });
      queryClient.invalidateQueries({
        queryKey: ['get-my-blueprints'],
      });
    },
  });
};
