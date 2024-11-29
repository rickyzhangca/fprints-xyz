import { connectionPointSchema } from '@/utils/blueprint/types/connection-point';
import { z } from 'zod';

export const connectionSchema = z.object({
  // 2.x change
  1: connectionPointSchema.optional(),
  // 2.x change
  2: connectionPointSchema.optional(),
});
