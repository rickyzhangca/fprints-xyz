import { itemFilterSchema } from '@/utils/blueprint/types/item-filter';
import { z } from 'zod';

export const inventorySchema = z.union([
  z.object({
    filters: z.array(itemFilterSchema).nullable(),
    bar: z.number().int().nullable(),
  }),
  z.null()
]);
