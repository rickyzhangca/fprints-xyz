import { comparatorStringSchema } from '@/utils/blueprint/types/comparator-string';
import { signalIdSchema } from '@/utils/blueprint/types/signal-id';
import { z } from 'zod';

export const circuitConditionSchema = z.object({
  comparator: comparatorStringSchema.optional().default('<'),
  first_signal: signalIdSchema.optional(),
  second_signal: signalIdSchema.optional(),
  constant: z.number().optional(),
});
