import { Input, Tooltip, TooltipContent, TooltipTrigger } from '@/ui';

import {
  usePostGetBlueprintTitle,
  usePostGetFactorioBinData,
  usePostGetFactorioPrintsData,
  usePostGetFactorioSchoolData,
} from '@/hooks';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui';
import { CheckIcon, CircleHelpIcon } from 'lucide-react';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ICreateBlueprintFormValues } from '../BlueprintForm';

export const Remix = ({
  form,
}: {
  form: UseFormReturn<ICreateBlueprintFormValues>;
}) => {
  const [title, setTitle] = useState(form.getValues('remixed_from_title'));

  const postGetFactorioBinData = usePostGetFactorioBinData();
  const postGetFactorioSchoolData = usePostGetFactorioSchoolData();
  const postGetFactorioPrintsData = usePostGetFactorioPrintsData();
  const postGetBlueprintTitle = usePostGetBlueprintTitle();

  return (
    <FormField
      name="remixed_from_url"
      rules={{ required: false }}
      render={({ field }) => (
        <FormItem>
          <Tooltip>
            <TooltipTrigger>
              <FormLabel className="cursor-pointer">
                Remixed from
                <CircleHelpIcon className="ml-1.5 inline-block size-4 opacity-50" />
              </FormLabel>
            </TooltipTrigger>
            <TooltipContent>
              A remix is a copy of a blueprint that is based on another
              blueprint. You can reference the original blueprint here and show
              off your contribution.
            </TooltipContent>
          </Tooltip>
          <FormControl>
            <Input
              placeholder="If this is a remix, reference the original blueprint here"
              value={field.value}
              onChange={async e => {
                const value = e.target.value.trim();
                field.onChange(value);

                form.setValue('remixed_from_title', undefined);
                setTitle(undefined);

                if (!value) return;

                if (value.includes('factoriobin.com')) {
                  const data = await postGetFactorioBinData.mutateAsync(value);
                  form.setValue('remixed_from_title', data.node.name);
                  setTitle(data.node.name);
                } else if (value.includes('factorioprints.com')) {
                  const data =
                    await postGetFactorioPrintsData.mutateAsync(value);
                  form.setValue('remixed_from_title', data.title);
                  setTitle(data.title);
                } else if (value.includes('factorio.school')) {
                  const data = await postGetFactorioSchoolData.mutateAsync(
                    value.split('/').pop()!
                  );
                  form.setValue('remixed_from_title', data.title);
                  setTitle(data.title);
                } else if (value.includes('fprints.xyz')) {
                  const data = await postGetBlueprintTitle.mutateAsync(
                    value.split('/').pop()!
                  );
                  form.setValue('remixed_from_title', data?.title ?? '');
                  setTitle(data?.title ?? '');
                }
              }}
            />
          </FormControl>
          {title && (
            <p className="line-clamp-1 overflow-hidden text-ellipsis break-all rounded-md bg-steel-900 px-3 py-2 text-sm text-steel-300">
              <CheckIcon className="mr-2 inline-block size-4 shrink-0" />
              Title found, {`"${title}"`}
            </p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
