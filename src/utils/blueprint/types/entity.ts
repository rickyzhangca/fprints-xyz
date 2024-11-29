import { colorSchema } from '@/utils/blueprint/types/color';
import { connectionSchema } from '@/utils/blueprint/types/connection';
import { controlBehaviorSchema } from '@/utils/blueprint/types/control-behavior';
import { infinitySettingsSchema } from '@/utils/blueprint/types/infinity-settings';
import { inventorySchema } from '@/utils/blueprint/types/inventory';
import { itemFilterSchema } from '@/utils/blueprint/types/item-filter';
import { logisticSectionsSchema } from '@/utils/blueprint/types/logistic-sections';
import { positionSchema } from '@/utils/blueprint/types/position';
import { signalIdSchema } from '@/utils/blueprint/types/signal-id';
import { speakerAlertParameterSchema } from '@/utils/blueprint/types/speaker-alert-parameter';
import { speakerParameterSchema } from '@/utils/blueprint/types/speaker-parameter';
import { tagSchema } from '@/utils/blueprint/types/tag';
import { z } from 'zod';

export const entitySchema = z.object({
  entity_number: z.number().int().positive(),
  name: z.string().optional(),
  position: positionSchema,
  // 2.x change
  direction: z.number().int().optional(),
  orientation: z.number().min(0).max(1).optional(),
  connections: connectionSchema.optional(),
  neighbours: z.array(z.number().int().positive()).optional(),
  control_behavior: controlBehaviorSchema.optional(),
  items: z
    .union([
      z.record(z.string(), z.number().int()),
      // 2.x change
      z.array(
        z.object({
          id: signalIdSchema,
          items: z.record(z.string(), z.array(z.any())),
        })
      )
    ])
    .optional(),
  recipe: z.string().optional(),
  bar: z.number().int().optional(),
  ammo_inventory: inventorySchema.optional(),
  trunk: inventorySchema.optional(),
  inventory: inventorySchema.optional(),
  infinity_settings: infinitySettingsSchema.optional(),
  type: z.enum(['input', 'output']).optional(),
  input_priority: z.enum(['right', 'left', 'none']).optional(),
  output_priority: z.enum(['right', 'left', 'none']).optional(),
  // 2.x change
  filter: itemFilterSchema.optional(),
  // 2.x change
  filters: z.array(itemFilterSchema).optional(),
  // 2.x change
  use_filters: z.boolean().optional(),
  filter_mode: z.enum(['whitelist', 'blacklist']).optional(),
  override_stack_size: z.number().int().optional(),
  drop_position: positionSchema.optional(),
  pickup_position: positionSchema.optional(),
  // 2.x change
  request_filters: logisticSectionsSchema.optional(),
  // appears to be optional
  request_from_buffers: z.boolean().optional(),
  parameters: speakerParameterSchema.optional(),
  alert_parameters: speakerAlertParameterSchema.optional(),
  auto_launch: z.boolean().optional(),
  variation: z.any().optional(),
  color: colorSchema.optional(),
  station: z.string().optional(),
  manual_trains_limit: z.number().int().optional(),
  switch_state: z.boolean().optional(),
  tags: tagSchema.optional(),
});
