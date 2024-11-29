import { iconSchema } from '@/utils/blueprint/types/icon';
import { z } from 'zod';

export type IUpgradePlannerSettings = z.infer<typeof upgradePlannerSchema>;

export const upgradePlannerSchema = z.object({
  item: z.literal('upgrade-planner'),
  label: z.string().optional(),
  version: z.number().int(),
  settings: z
    .union([
      z.object({
        icons: z.array(iconSchema).optional(),
        mappers: z
          .array(
            z.object({
              from: z
                .object({
                  name: z.string(),
                  type: z.string(),
                })
                .optional(),
              to: z
                .object({
                  name: z.string(),
                  type: z.string(),
                })
                .optional(),
            })
          )
          .optional(),
      }),
      z.null(),
    ])
    .optional(),
});

export type IUpgradePlanner = z.infer<typeof upgradePlannerSchema>;