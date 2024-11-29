import { iconSchema } from '@/utils/blueprint/types/icon';
import { z } from 'zod';

export type IDeconstructionPlannerSettings = z.infer<
  typeof deconstructionPlannerSchema
>;

export const deconstructionPlannerSchema = z.object({
  item: z.literal('deconstruction-planner'),
  label: z.string().optional(),
  version: z.number().int(),
  settings: z
    .union([
      z.object({
        icons: z.array(iconSchema).optional(),
        entity_filters: z
          .array(
            z.object({
              name: z.string(),
              index: z.number().int(),
            })
          )
          .optional(),
        entity_filter_mode: z.number().int().optional(),
        tile_filters: z
          .array(
            z.object({
              name: z.string(),
              index: z.number().int(),
            })
          )
          .optional(),
        tile_selection_mode: z.number().int().optional(),
        trees_and_rocks_only: z.boolean().optional(),
      }),
      z.null(),
    ])
    .optional(),
});

export type IDeconstructionPlanner = z.infer<
  typeof deconstructionPlannerSchema
>;
