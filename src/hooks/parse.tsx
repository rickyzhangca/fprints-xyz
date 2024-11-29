import {
  BlueprintUtils,
  blueprintWrapperSchema,
  IBlueprintWrapper,
} from '@/utils';
import { useMutation } from '@tanstack/react-query';

export const useParseBlueprintString = () => {
  return useMutation({
    mutationFn: async (blueprintString: string) => {
      try {
        const parsed =
          BlueprintUtils.Conversion.decodeBase64String(blueprintString);
        const result = blueprintWrapperSchema.safeParse(parsed);

        if (!result.success) {
          throw new Error(
            'Blueprint validation failed: ' + result.error.message
          );
        }

        return result.data as IBlueprintWrapper;
      } catch (err) {
        throw new Error('Failed to parse blueprint string: ' + err);
      }
    },
  });
};
