import { BlueprintUtils, IBlueprintBook, IBlueprintWrapper, tw } from '@/utils';
import { useCallback, useMemo } from 'react';

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
import { CopyButton } from '../copy-button';

const _BlueprintGlance = ({
  isChild,
  blueprintData,
  onCopy,
}: BlueprintGlanceProps) => {
  const type = BlueprintUtils.Analysis.getBlueprintType(blueprintData);

  const { label } = BlueprintUtils.Analysis.cleanUpLabel(
    blueprintData[type].label ?? ''
  );

  const handleEncode = useCallback(() => {
    try {
      return BlueprintUtils.Conversion.encodeBase64String(blueprintData);
    } catch (error) {
      console.error('Failed to encode blueprint:', error);
      return '';
    }
  }, [blueprintData]);

  const encodedString = useMemo(handleEncode, [handleEncode]);

  return (
    <div
      className={tw(
        'flex flex-col rounded-md border border-steel-800 bg-steel-900',
        isChild ? 'ml-6' : ''
      )}
    >
      <div className="flex items-center justify-between gap-2 p-2 text-sm text-steel-50">
        <div className="flex items-center gap-2">
          <BlueprintWrapperIcon data={blueprintData} />
          {label ?? 'Untitled'}
        </div>
        <CopyButton
          hideText
          variant="headless"
          content={encodedString}
          onCopy={onCopy}
          umamiEvent="copied-blueprint"
          className="ml-2 p-2 opacity-40 transition duration-75 hover:opacity-100"
        />
      </div>
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
  onCopy?: () => void;
  blueprintData: IBlueprintWrapper;
};

export const BlueprintGlance = ({
  blueprintData,
  isChild,
  onCopy,
}: BlueprintGlanceProps) => {
  if (Object.keys(blueprintData).length === 0) return null;

  if (
    BlueprintUtils.Analysis.getBlueprintType(blueprintData) === 'blueprint_book'
  ) {
    const book = blueprintData.blueprint_book as IBlueprintBook;
    const { label } = BlueprintUtils.Analysis.cleanUpLabel(
      book.label ?? 'Untitled'
    );

    const handleEncode = useCallback(() => {
      try {
        return BlueprintUtils.Conversion.encodeBase64String(blueprintData);
      } catch (error) {
        console.error('Failed to encode blueprint book:', error);
        return '';
      }
    }, [blueprintData]);

    const encodedString = useMemo(handleEncode, [handleEncode]);

    return (
      <Accordion type="single" collapsible className={isChild ? 'ml-6' : ''}>
        <AccordionItem value={book.label ?? 'Untitled'}>
          <AccordionTrigger className="py-2 pl-2 pr-3 text-steel-50">
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <BlueprintWrapperIcon data={blueprintData} />
                {label}
              </div>
              <CopyButton
                hideText
                variant="headless"
                content={encodedString}
                onCopy={onCopy}
                umamiEvent="copied-blueprint-book"
                className="ml-2 p-2 opacity-40 transition duration-75 hover:opacity-100"
              />
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            {book.blueprints.map((blueprint, i) => (
              <BlueprintGlance
                key={i}
                blueprintData={blueprint}
                isChild
                onCopy={onCopy}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <_BlueprintGlance
      isChild={isChild}
      blueprintData={blueprintData}
      onCopy={onCopy}
    />
  );
};
