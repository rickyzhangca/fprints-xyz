import { z } from 'zod';

export const comparatorStringSchema = z.enum([
  '=',
  '>',
  '<',
  '≥',
  '>=',
  '≤',
  '<=',
  '≠',
  '!=',
]);
