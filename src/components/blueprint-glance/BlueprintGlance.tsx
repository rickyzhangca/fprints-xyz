import { BlueprintUtils, IBlueprintBook, IBlueprintWrapper, tw } from '@/utils';

import { BlueprintComponents } from '@/components/blueprint-glance/subcomponents/blueprint-components';
import { BlueprintWrapperIcon } from '@/components/blueprint-glance/subcomponents/blueprint-wrapper-icon';
import { DeconstructionPlannerComponents } from '@/components/blueprint-glance/subcomponents/deconstruction-planner-components';
import { UpgradePlannerComponents } from '@/components/blueprint-glance/subcomponents/upgrade-planner-components';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/ui';

const _BlueprintGlance = ({ isChild, blueprintData }: BlueprintGlanceProps) => {
  const type = BlueprintUtils.Analysis.getBlueprintType(blueprintData);

  const { label } = BlueprintUtils.Analysis.cleanUpLabel(
    blueprintData[type].label ?? ''
  );

  return (
    <div
      className={tw(
        'flex flex-col rounded-md border border-steel-800 bg-steel-900',
        isChild ? 'ml-6' : ''
      )}
    >
      {label && (
        <div className="flex items-center gap-2 p-2 text-sm text-steel-50">
          <BlueprintWrapperIcon data={blueprintData} />
          {label}
        </div>
      )}
      {type === 'blueprint' && <BlueprintComponents data={blueprintData} />}
      {type === 'upgrade_planner' && (
        <UpgradePlannerComponents data={blueprintData} />
      )}
      {type === 'deconstruction_planner' && (
        <DeconstructionPlannerComponents data={blueprintData} />
      )}
    </div>
  );
};

type BlueprintGlanceProps = {
  isChild?: boolean;
  blueprintData: IBlueprintWrapper;
};

export const BlueprintGlance = ({
  blueprintData,
  isChild,
}: BlueprintGlanceProps) => {
  if (Object.keys(blueprintData).length === 0) return null;

  if (
    BlueprintUtils.Analysis.getBlueprintType(blueprintData) === 'blueprint_book'
  ) {
    const book = blueprintData.blueprint_book as IBlueprintBook;
    const { label } = BlueprintUtils.Analysis.cleanUpLabel(
      book.label ?? 'Untitled'
    );

    return (
      <Accordion type="single" collapsible className={isChild ? 'ml-6' : ''}>
        <AccordionItem value={book.label ?? 'Untitled'}>
          <AccordionTrigger className="py-2 pl-2 pr-3 text-steel-50">
            <div className="flex items-center gap-2">
              <BlueprintWrapperIcon data={blueprintData} />
              {label}
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            {book.blueprints.map((blueprint, i) => {
              return (
                <BlueprintGlance key={i} blueprintData={blueprint} isChild />
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return <_BlueprintGlance isChild={isChild} blueprintData={blueprintData} />;
};
