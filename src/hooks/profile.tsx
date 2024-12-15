import { useBearStore } from '@/store';
import { ICollectionWithBlueprintCount, IProfile } from '@/supabase';
import { getRandomBackground } from '@/utils/color';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useGetProfile = () => {
  const supabase = useBearStore(state => state.supabase);
  const session = useBearStore(state => state.session);
  const setProfile = useBearStore(state => state.setProfile);

  return useQuery({
    queryKey: ['get-my-profile'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', session?.user?.id ?? '')
        .single();

      if (error) throw error;

      setProfile(data);
      return data as IProfile;
    },
    enabled: !!session?.user?.id,
    retry: false,
  });
};

export const useGetProfileByUserId = (userId: string) => {
  const supabase = useBearStore(state => state.supabase);

  return useQuery({
    queryKey: ['get-user-profile', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      return data as IProfile;
    },
    enabled: !!userId,
    retry: false,
  });
};

export const useCreateProfile = () => {
  const supabase = useBearStore(state => state.supabase);
  const session = useBearStore(state => state.session);
  const setProfile = useBearStore(state => state.setProfile);
  const setCollections = useBearStore(state => state.setCollections);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (handle: string) => {
      if (!session?.user?.id) throw new Error('User not found');

      const newProfile = await supabase
        .from('user_profiles')
        .insert([
          {
            user_id: session.user.id,
            handle,
            color: getRandomBackground(),
          },
        ])
        .select()
        .single();

      if (newProfile.error) {
        if (newProfile.status === 409) {
          throw new Error('Handle already exists');
        }
        throw newProfile.error;
      }

      const newCollection = await supabase
        .from('collections')
        .insert([{ user_id: session.user.id, title: 'My collection' }])
        .select()
        .single();

      const myCollections = await supabase
        .from('collections')
        .select('*')
        .eq('user_id', session.user.id);

      if (newCollection.error || myCollections.error) throw new Error();

      setProfile(newProfile.data);
      setCollections(myCollections.data as ICollectionWithBlueprintCount[]);

      navigate('/');
      return newProfile.data as IProfile;
    },
  });
};

export const useGetMyPrintsCount = () => {
  const supabase = useBearStore(state => state.supabase);
  const session = useBearStore(state => state.session);

  return useQuery({
    queryKey: ['get-my-prints-count', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) throw new Error('User not found');
      const { count, error } = await supabase
        .from('blueprints')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session.user.id);

      if (error) throw error;
      return count;
    },
    enabled: !!session?.user?.id,
  });
};

export const useUpdateProfile = () => {
  const supabase = useBearStore(state => state.supabase);
  const session = useBearStore(state => state.session);

  return useMutation({
    mutationFn: async (profile: IProfile) => {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(profile)
        .eq('user_id', session?.user?.id ?? '')
        .select()
        .single();

      if (error || !data) throw error;
      return data as IProfile;
    },
  });
};

export const useRPCStats = (enabled: boolean) => {
  const supabase = useBearStore(state => state.supabase);
  const session = useBearStore(state => state.session);

  return useQuery({
    queryKey: ['get-user-stats', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) throw new Error('User not found');
      const { data, error } = await supabase.rpc('get_user_blueprint_stats', {
        user_id: session.user.id,
      });
      if (error) throw error;
      return data as {
        total_likes: number;
        total_copies: number;
        total_collections: number;
      };
    },
    enabled,
  });
};
