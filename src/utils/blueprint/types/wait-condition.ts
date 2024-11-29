import { circuitConditionSchema } from '@/utils/blueprint/types/circuit-condition';
import { z } from 'zod';

export const waitConditionSchema = z.object({
  // should be enum, full list unknown
  type: z.string(),
  // should be enum, full list unknown
  compare_type: z.string(),
  ticks: z.number().optional(),
  // only present when type is "item_count", "circuit" or "fluid_count"
  condition: circuitConditionSchema.optional(),
});
