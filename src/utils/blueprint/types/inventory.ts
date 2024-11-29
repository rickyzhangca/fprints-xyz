import { itemFilterSchema } from '@/utils/blueprint/types/item-filter';
import { z } from 'zod';

export const inventorySchema = z.object({
  filters: z.array(itemFilterSchema),
  bar: z.number().int(),
});
