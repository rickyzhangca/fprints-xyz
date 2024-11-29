import { z } from 'zod';

export const infinityFilterSchema = z.object({
  name: z.string(),
  count: z.number().int(),
  mode: z.enum(['exactly', 'at-least', 'at-most']),
  index: z.number().int().positive(),
});
