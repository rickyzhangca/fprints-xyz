import { z } from 'zod';

export const connectionDataSchema = z.object({
  // 2.x change
  entity_id: z.number().int().optional(),
  // 2.x change
  circuit_id: z.number().int().optional(),
});
