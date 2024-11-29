import { positionSchema } from '@/utils/blueprint/types/position';
import { z } from 'zod';

export const tileSchema = z.object({
  name: z.string(),
  position: positionSchema,
});
