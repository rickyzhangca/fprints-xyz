import { z } from 'zod';

export const speakerParameterSchema = z.object({
  playback_volume: z.number(),
  playback_globally: z.boolean(),
  allow_polyphony: z.boolean(),
});
