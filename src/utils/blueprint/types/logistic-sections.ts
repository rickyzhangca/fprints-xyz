import { logisticSectionSchema } from '@/utils/blueprint/types/logistic-section';
import { z } from 'zod';

export const logisticSectionsSchema = z.object({
  sections: logisticSectionSchema.array().optional(),
  trash_not_requested: z.boolean().optional().default(false),
});
