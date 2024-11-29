import { signalIdSchema } from '@/utils/blueprint/types/signal-id';
import { z } from 'zod';

export const speakerAlertParameterSchema = z.object({
  show_alert: z.boolean(),
  show_on_map: z.boolean(),
  icon_signal_id: signalIdSchema,
  alert_message: z.string(),
});
