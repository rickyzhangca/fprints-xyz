import { BlueprintGlance } from '@/components';
import { ICreateBlueprintFormValues } from '@/components/blueprint-form/BlueprintForm';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from '@/ui';
import { BlueprintUtils, IBlueprintWrapper } from '@/utils';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

const parseBlueprintString = (value: string) => {
  try {
    const json = BlueprintUtils.Conversion.decodeBase64String(value);
    if (!json) return;
    const validated = BlueprintUtils.Analysis.validateJson(json);
    if (!validated.success) {
      console.error(validated.error);
      return;
    }
    return validated.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const BlueprintString = ({
  form,
  blueprintData,
  setBlueprintData,
}: {
  form: UseFormReturn<ICreateBlueprintFormValues>;
  blueprintData: IBlueprintWrapper;
  setBlueprintData: (data: IBlueprintWrapper) => void;
}) => {
  useEffect(() => {
    const value = form.getValues('blueprint_string');
    if (value) {
      const parsed = parseBlueprintString(value);
      if (parsed) setBlueprintData(parsed);
    }
  }, []);

  const handleBlueprintChange = (shouldParse: boolean, value: string) => {
    form.setValue('blueprint_string', value, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setBlueprintData({});
    if (shouldParse) {
      const parsed = parseBlueprintString(value);
      if (parsed) setBlueprintData(parsed);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const wasPaste =
      e.nativeEvent instanceof InputEvent &&
      e.nativeEvent.inputType === 'insertFromPaste';
    handleBlueprintChange(wasPaste, target.value);
  };

  return (
    <FormField
      control={form.control}
      name="blueprint_string"
      rules={{ required: true }}
      render={({ field }) => (
        <FormItem>
          <div className="flex h-5 items-center justify-between">
            <FormLabel>Blueprint string</FormLabel>
            {!!form.getValues('blueprint_string') && (
              <p className="text-sm text-steel-400">
                {BlueprintUtils.Analysis.getGameVersion('patch', blueprintData)}
              </p>
            )}
          </div>
          <FormControl>
            <Textarea
              autoFocus
              placeholder="Paste blueprint string here"
              value={field.value}
              onChange={handleInput}
              className="min-h-16"
            />
          </FormControl>
          <FormMessage />
          <BlueprintGlance hideSwap blueprintData={blueprintData} />
        </FormItem>
      )}
    />
  );
};
