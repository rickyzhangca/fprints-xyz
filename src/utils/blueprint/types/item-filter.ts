import { z } from 'zod';

export const itemFilterSchema = z.object({
  name: z.string().optional(),
  // 2.x changes
  index: z.number().int().positive().optional(),
  // 2.x changes
  quality: z.string().optional(),
  // 2.x changes
  comparator: z.string().optional(),
});
