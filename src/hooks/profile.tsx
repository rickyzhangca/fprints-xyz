import { useBearStore } from '@/store';
import { IProfile } from '@/supabase';
import { getRandomBackground } from '@/utils/color';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useGetProfile = () => {
  const supabase = useBearStore(state => state.supabase);
  const session = useBearStore(state => state.session);
  const setProfile = useBearStore(state => state.setProfile);

  return useQuery({
    queryKey: ['get-user-profile', session?.user.id],
    queryFn: async () => {
      const { data, error } = await supabase!
        .from('user_profiles')
        .select('*')
        .eq('user_id', session!.user.id)
        .single();

      if (error) throw error;

      setProfile(data);
      return data as IProfile;
    },
    enabled: !!session?.user.id,
    retry: false,
  });
};

export const useGetProfileByUserId = (userId: string) => {
  const supabase = useBearStore(state => state.supabase);

  return useQuery({
    queryKey: ['get-user-profile', userId],
    queryFn: async () => {
      const { data, error } = await supabase!
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
      const newProfile = await supabase!
        .from('user_profiles')
        .insert([
          {
            user_id: session!.user.id,
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

      const newCollection = await supabase!
        .from('collections')
        .insert([{ user_id: session!.user.id, title: 'My collection' }])
        .select()
        .single();

      const myCollections = await supabase!
        .from('collections')
        .select('*')
        .eq('user_id', session!.user.id);

      if (newCollection.error || myCollections.error) throw new Error();

      setProfile(newProfile.data);
      setCollections(myCollections.data);

      navigate('/');
      return newProfile.data as IProfile;
    },
  });
};
