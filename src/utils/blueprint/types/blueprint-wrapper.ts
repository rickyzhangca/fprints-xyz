import { blueprintSchema } from '@/utils/blueprint/types/blueprint';
import { blueprintBookSchema } from '@/utils/blueprint/types/blueprint-book';
import { deconstructionPlannerSchema } from '@/utils/blueprint/types/deconstruction-planner';
import { upgradePlannerSchema } from '@/utils/blueprint/types/upgrade-planner';
import { z } from 'zod';

export const blueprintWrapperSchema = z.object({
  blueprint: blueprintSchema.optional(),
  blueprint_book: z.lazy((): z.ZodType => blueprintBookSchema).optional(),
  upgrade_planner: upgradePlannerSchema.optional(),
  deconstruction_planner: deconstructionPlannerSchema.optional(),
});

export type IBlueprintWrapper = z.infer<typeof blueprintWrapperSchema>;
