import { colorSchema } from '@/utils/blueprint/types/color';
import { entitySchema } from '@/utils/blueprint/types/entity';
import { iconSchema } from '@/utils/blueprint/types/icon';
import { positionSchema } from '@/utils/blueprint/types/position';
import { scheduleSchema } from '@/utils/blueprint/types/schedule';
import { tileSchema } from '@/utils/blueprint/types/tile';
import { z } from 'zod';

export const blueprintSchema = z.object({
  item: z.string(),
  label: z.string().optional(),
  label_color: colorSchema.optional(),
  entities: z.array(entitySchema),
  // 2.x change
  tiles: z.array(tileSchema).optional(),
  icons: z.array(iconSchema),
  // 2.x change
  schedules: z.array(scheduleSchema).optional(),
  description: z.string().optional(),
  snap_to_grid: z.boolean().optional(),
  absolute_snapping: z.boolean().optional(),
  position_relative_to_grid: positionSchema.optional().optional(),
  version: z.number().int(),
});

export type IBlueprint = z.infer<typeof blueprintSchema>;
