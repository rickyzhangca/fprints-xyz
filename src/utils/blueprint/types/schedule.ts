import { scheduleRecordSchema } from '@/utils/blueprint/types/schedule-record';
import { z } from 'zod';

export const scheduleSchema = z.object({
  locomotives: z.array(z.number().int()),
  // 2.x change
  schedule: z.object({
    records: z.array(scheduleRecordSchema),
  }),
});
