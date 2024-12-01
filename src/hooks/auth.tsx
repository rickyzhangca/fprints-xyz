import { useBearStore } from '@/store';
import { AuthResponse, AuthTokenResponsePassword } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useSignUpWithEmail = () => {
  const supabase = useBearStore(state => state.supabase);
  return useMutation<
    AuthResponse['data'],
    Error,
    { email: string; password: string }
  >({
    mutationFn: async ({ email, password }) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: '',
      });

      if (error) {
        if (error.message != 'Invalid login credentials') {
          throw new Error('Email already exists');
        }
      }

      const res = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'https://fprints.xyz/new-profile',
        },
      });
      if (res.error) throw new Error(res.error.message);
      if (res.data.user?.identities?.length === 0)
        throw new Error('Email already exists');
      return res.data;
    },
  });
};

export const useLogInWithEmail = () => {
  const supabase = useBearStore(state => state.supabase);
  return useMutation<
    AuthTokenResponsePassword['data'],
    Error,
    { email: string; password: string }
  >({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (res?.error) throw new Error(res.error.message);
      return res.data;
    },
  });
};

export const useForgotPasswordWithEmail = () => {
  const supabase = useBearStore(state => state.supabase);

  return useMutation({
    mutationFn: async (email: string) => {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://fprints.xyz/reset-password',
      });
    },
  });
};

export const useLogInWithGoogle = () => {
  const supabase = useBearStore(state => state.supabase);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (res?.error) throw res.error;

      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
};

export const useSignUpWithGoogle = () => {
  const supabase = useBearStore(state => state.supabase);

  return useMutation({
    mutationFn: async () => {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `/new-profile`,
        },
      });
    },
  });
};

export const useLogInWithGithub = () => {
  const supabase = useBearStore(state => state.supabase);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await supabase.auth.signInWithOAuth({
        provider: 'github',
      });

      if (res?.error) throw res.error;

      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
};

export const useSignUpWithGithub = () => {
  const supabase = useBearStore(state => state.supabase);

  return useMutation({
    mutationFn: async () => {
      await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `/new-profile`,
        },
      });
    },
  });
};

export const useSignOut = () => {
  const supabase = useBearStore(state => state.supabase);
  const setProfile = useBearStore(state => state.setProfile);
  const setCollections = useBearStore(state => state.setCollections);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await supabase?.auth.signOut();
      setProfile(null);
      setCollections(null);
      queryClient.removeQueries({ queryKey: ['get-user-profile'] });
      queryClient.removeQueries({ queryKey: ['get-user-collections'] });
      navigate('/');
    },
  });
};

export const useUpdatePassword = () => {
  const supabase = useBearStore(state => state.supabase);

  return useMutation({
    mutationFn: async (password: string) => {
      await supabase.auth.updateUser({
        password,
      });
    },
  });
};
