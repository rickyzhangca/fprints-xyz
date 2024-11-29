import { z } from 'zod';

export const positionSchema = z.object({
  x: z.number(),
  y: z.number(),
});
