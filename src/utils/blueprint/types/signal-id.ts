import { z } from 'zod';

export const signalIdSchema = z.object({
  name: z.string(),
  // 2.x change
  type: z
    .enum([
      'item',
      'fluid',
      'virtual',
      'entity',
      'recipe',
      'space-location',
      'asteroid-chunk',
      'quality',
    ])
    .optional()
    .default('item'),
});
