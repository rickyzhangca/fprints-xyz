import { blueprintWrapperSchema } from '@/utils/blueprint/types';

export const validateJson = (json: any) => {
  //NOTE - possible to speed up with https://github.com/duplojs/zod-accelerator
  const parsed = blueprintWrapperSchema.safeParse(json);
  return parsed;
};
