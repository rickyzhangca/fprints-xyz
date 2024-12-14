import { Input, Tooltip, TooltipContent, TooltipTrigger } from '@/ui';

import {
  usePostGetBlueprintTitle,
  usePostGetFactorioBinData,
  usePostGetFactorioPrintsData,
  usePostGetFactorioSchoolData,
} from '@/hooks';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui';
import { CheckIcon, CircleHelpIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ICreateBlueprintFormValues } from '../BlueprintForm';

export const Remix = ({
  form,
}: {
  form: UseFormReturn<ICreateBlueprintFormValues>;
}) => {
  const [title, setTitle] = useState(form.getValues('remixed_from_title'));

  useEffect(() => {
    setTitle(form.getValues('remixed_from_title'));
  }, [form.getValues('remixed_from_title')]);

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
                field.onChange(e);
                form.setValue('remixed_from_title', '');
                if (e.target.value.includes('factoriobin.com')) {
                  const data = await postGetFactorioBinData.mutateAsync(
                    e.target.value
                  );
                  form.setValue('remixed_from_title', data.node.name);
                } else if (e.target.value.includes('factorioprints.com')) {
                  const data = await postGetFactorioPrintsData.mutateAsync(
                    e.target.value
                  );
                  form.setValue('remixed_from_title', data.title);
                } else if (e.target.value.includes('factorio.school')) {
                  const data = await postGetFactorioSchoolData.mutateAsync(
                    e.target.value.split('/').pop()!
                  );
                  form.setValue('remixed_from_title', data.title);
                } else if (e.target.value.includes('fprints.xyz')) {
                  const data = await postGetBlueprintTitle.mutateAsync(
                    e.target.value.split('/').pop()!
                  );
                  form.setValue('remixed_from_title', data?.title ?? '');
                } else {
                  form.setValue('remixed_from_title', '');
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
