import { waitConditionSchema } from '@/utils/blueprint/types/wait-condition';
import { z } from 'zod';

export const scheduleRecordSchema = z.object({
  station: z.string(),
  allows_unloading: z.boolean().optional(),
  wait_conditions: z.array(waitConditionSchema).optional(),
  temporary: z.boolean().optional(),
});
