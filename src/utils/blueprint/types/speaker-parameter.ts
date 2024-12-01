import { z } from 'zod';

export const speakerParameterSchema = z.object({
  playback_volume: z.number().optional(),
  playback_globally: z.boolean().optional(),
  allow_polyphony: z.boolean().optional(),
});
