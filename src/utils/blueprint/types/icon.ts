import { signalIdSchema } from '@/utils/blueprint/types/signal-id';
import { z } from 'zod';

export const iconSchema = z.object({
  signal: signalIdSchema,
  index: z.number().int().positive(),
});
