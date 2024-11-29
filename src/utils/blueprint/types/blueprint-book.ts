import { IBlueprint } from '@/utils/blueprint/types/blueprint';
import { colorSchema } from '@/utils/blueprint/types/color';
import { deconstructionPlannerSchema, IDeconstructionPlanner } from '@/utils/blueprint/types/deconstruction-planner';
import { iconSchema } from '@/utils/blueprint/types/icon';
import { IUpgradePlanner, upgradePlannerSchema } from '@/utils/blueprint/types/upgrade-planner';
import { z, ZodType } from 'zod';

const baseBlueprintBookSchema = z.object({
  item: z.string(),
  label: z.string().optional(),
  label_color: colorSchema.optional(),
  active_index: z.number().int(),
  icons: z.array(iconSchema).optional(),
  description: z.string().optional(),
  version: z.number().int(),
});

export type IBlueprintBook = z.infer<typeof baseBlueprintBookSchema> & {
  blueprints: {
    index: number;
    blueprint?: IBlueprint;
    blueprint_book?: IBlueprintBook;
    upgrade_planner?: IUpgradePlanner;
    deconstruction_planner?: IDeconstructionPlanner;
  }[];
};

// https://github.com/colinhacks/zod#recursive-types
// @ts-expect-error should work
export const blueprintBookSchema: ZodType<IBlueprintBook> =
  baseBlueprintBookSchema.extend({
    blueprints: z.array(
      z.object({
        index: z.number().int(),
        blueprint: z.lazy(() => z.custom<IBlueprint>()).optional(),
        blueprint_book: z.lazy(() => blueprintBookSchema).optional(),
        upgrade_planner: upgradePlannerSchema.optional(),
        deconstruction_planner: deconstructionPlannerSchema.optional(),
      })
    ),
  });
