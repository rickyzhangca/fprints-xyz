import { z } from 'zod';

// https://lua-api.factorio.com/latest/concepts/Tags.html
export const tagSchema = z.record(z.string(), z.any());
