import { logisticFilterSchema } from '@/utils/blueprint/types/logistic-filter';
import { z } from 'zod';

export const logisticSectionSchema = z.object({
  index: z.number().int(),
  filters: logisticFilterSchema.array().optional(),
  group: z.string().optional(),
  multiplier: z.number().optional().default(1),
  active: z.boolean().optional().default(true),
});
