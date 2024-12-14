import { z } from 'zod';
import { circuitConditionSchema } from './circuit-condition';
import { signalIdSchema } from './signal-id';

export const controlBehaviorSchema = z.object({
  // Circuit and logistic conditions
  logistic_condition: z.object({}).optional(),
  connect_to_logistic_network: z.boolean().optional(),
  circuit_condition: circuitConditionSchema.optional(),
  circuit_enable_disable: z.boolean().optional(),
  circuit_close_signal: z.boolean().optional(),

  // Signal reading and state
  circuit_read_signal: z.boolean().optional(),
  red_output_signal: signalIdSchema.optional(),
  orange_output_signal: signalIdSchema.optional(),
  green_output_signal: signalIdSchema.optional(),
  blue_output_signal: signalIdSchema.optional(),

  // Train-related controls
  send_to_train: z.boolean().optional(),
  read_from_train: z.boolean().optional(),
  read_stopped_train: z.boolean().optional(),
  train_stopped_signal: signalIdSchema.optional(),
  set_trains_limit: z.boolean().optional(),
  trains_limit_signal: signalIdSchema.optional(),
  read_trains_count: z.boolean().optional(),
  trains_count_signal: signalIdSchema.optional(),

  // Logistics and robot stats
  read_logistics: z.boolean().optional(),
  read_robot_stats: z.boolean().optional(),
  available_logistic_output_signal: signalIdSchema.optional(),
  total_logistic_output_signal: signalIdSchema.optional(),
  available_construction_output_signal: signalIdSchema.optional(),
  total_construction_output_signal: signalIdSchema.optional(),

  // Gate and sensor controls
  circuit_open_gate: z.boolean().optional(),
  circuit_read_sensor: z.boolean().optional(),
  output_signal: signalIdSchema.optional(),

  // Belt and inserter controls
  circuit_read_hand_contents: z.boolean().optional(),
  circuit_contents_read_mode: z.number().int().optional(),
  circuit_mode_of_operation: z.number().int().optional(),
  circuit_hand_read_mode: z.number().int().optional(),
  circuit_set_stack_size: z.boolean().optional(),
  stack_control_input_signal: signalIdSchema.optional(),

  // Mining and resource controls
  circuit_read_resources: z.boolean().optional(),
  circuit_resource_read_mode: z.number().int().optional(),

  // Combinator specific
  is_on: z.boolean().optional(),
  filters: z.array(z.any()).optional(),
  arithmetic_conditions: z.object({}).passthrough().optional(),
  decider_conditions: z.object({}).passthrough().optional(),

  // Miscellaneous
  circuit_parameters: z.object({}).passthrough().optional(),
  use_colors: z.boolean().optional(),
});

export type ControlBehavior = z.infer<typeof controlBehaviorSchema>;
