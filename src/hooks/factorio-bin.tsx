import { useBearStore } from '@/store';
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

      const response = await fetch(
        `${import.meta.env.VITE_GET_FACTORIO_BIN_DATA}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'info',
            url: optionallyRemoveTrailingSlash(url),
          }),
        }
      );
      const data = await response.json();
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

      const response = await fetch(
        `${import.meta.env.VITE_GET_FACTORIO_BIN_DATA}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'string',
            url: optionallyRemoveTrailingSlash(url),
          }),
        }
      );
      const data = await response.text();
      const parsed = z.string().safeParse(data);
      if (!parsed.success)
        throw new Error('Failed to parse factorio bin string');
      return parsed.data;
    },
  });
};
