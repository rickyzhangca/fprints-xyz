import { useBearStore } from '@/store';
import { supabase, SupabaseEdgeFunctions } from '@/supabase';
import { optionallyRemoveTrailingSlash } from '@/utils';
import { useMutation } from '@tanstack/react-query';

import { z } from 'zod';

const urlSchema = z.string().url();
const userSchema = z.object({
  username: z.string(),
  hasCheckmark: z.boolean(),
});
const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.string().datetime(),
  expiresAt: z.string().datetime().nullable(),
  postedBy: userSchema,
});

const baseNodeSchema = z.object({
  index: z.number().int(),
  parentIndex: z.number().int().nullable(),
  name: z.string(),
  description: z.string().nullable(),
  blueprintStringUrl: urlSchema,
  blueprintStringLength: z.number().int(),
  simpleIconUrl: urlSchema,
  factorioVersion: z.string(),
});
const blueprintNodeSchema = baseNodeSchema.extend({
  type: z.literal('blueprint'),
  renderImageUrl: urlSchema,
  requiresSpaceAge: z.boolean(),
  numEntities: z.number().int(),
  numRequests: z.number().int(),
  numTiles: z.number().int(),
});
const blueprintBookNodeSchema = baseNodeSchema.extend({
  type: z.literal('blueprint-book'),
  renderImageUrl: z.null(),
  requiresSpaceAge: z.null(),
  numEntities: z.null(),
  numRequests: z.null(),
  numTiles: z.null(),
});

const nodeSchema = z.discriminatedUnion('type', [
  blueprintNodeSchema,
  blueprintBookNodeSchema,
]);
export const factorioBinSchema = z.object({
  post: postSchema,
  node: nodeSchema,
});

export type FactorioBin = z.infer<typeof factorioBinSchema>;

export const usePostGetFactorioBinData = () => {
  const session = useBearStore(state => state.session);

  return useMutation({
    mutationKey: ['factorio-bin-data'],
    mutationFn: async (url: string) => {
      if (!session?.access_token) {
        throw new Error('No authentication token found');
      }
      const res = await supabase.functions.invoke(
        SupabaseEdgeFunctions.proxyFactorioBinApi,
        {
          body: {
            type: 'info',
            url: optionallyRemoveTrailingSlash(url),
          },
        }
      );
      if (res.error) throw new Error('Failed to fetch factorio bin data');
      const data = res.data;
      const parsed = factorioBinSchema.safeParse(data);
      if (!parsed.success) throw new Error('Failed to parse factorio bin data');
      return parsed.data;
    },
  });
};

export const usePostGetFactorioBinString = () => {
  const session = useBearStore(state => state.session);

  return useMutation({
    mutationKey: ['factorio-bin-string'],
    mutationFn: async (url: string) => {
      if (!session?.access_token) {
        throw new Error('No authentication token found');
      }

      const res = await supabase.functions.invoke(
        SupabaseEdgeFunctions.proxyFactorioBinApi,
        {
          body: {
            type: 'string',
            url: optionallyRemoveTrailingSlash(url),
          },
        }
      );
      if (res.error) throw new Error('Failed to fetch factorio bin string');
      const data = res.data;
      const parsed = z.string().safeParse(data);
      if (!parsed.success)
        throw new Error('Failed to parse factorio bin string');
      return parsed.data;
    },
  });
};
