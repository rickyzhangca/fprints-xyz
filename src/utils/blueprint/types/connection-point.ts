import { connectionDataSchema } from '@/utils/blueprint/types/connection-data';
import { z } from 'zod';

export const connectionPointSchema = z.object({
  // 2.x change
  red: z.array(connectionDataSchema).optional(),
  // 2.x change
  green: z.array(connectionDataSchema).optional(),
});
