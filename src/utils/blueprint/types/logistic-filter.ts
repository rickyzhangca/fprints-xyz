import { z } from 'zod';

export const logisticFilterSchema = z.object({
  name: z.string(),
  index: z.number().int().positive(),
  count: z.number().int(),
});
