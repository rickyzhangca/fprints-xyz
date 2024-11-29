import { infinityFilterSchema } from '@/utils/blueprint/types/infinity-filter';
import { z } from 'zod';

export const infinitySettingsSchema = z.object({
  remove_unfiltered_items: z.boolean(),
  filters: z.array(infinityFilterSchema).optional(),
});
