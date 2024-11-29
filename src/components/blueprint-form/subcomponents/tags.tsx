import { ITag, TagCombobox } from '@/components';
import { ICreateBlueprintFormValues } from '@/components/blueprint-form/BlueprintForm';
import { useGetTags } from '@/hooks';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Tag,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/ui';
import { BlueprintUtils, IBlueprintWrapper } from '@/utils';
import { ArrowUpIcon, SparkleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

export const Tags = ({
  form,
  blueprintData,
}: {
  form: UseFormReturn<ICreateBlueprintFormValues>;
  blueprintData: IBlueprintWrapper;
}) => {
  const [recommendedTags, setRecommendedTags] = useState<ITag[]>([]);
  const getTags = useGetTags(true);

  useEffect(() => {
    if (!getTags.data) return;

    const strings = BlueprintUtils.Analysis.recommendTags(blueprintData);
    const tags = getTags.data
      .filter(tag => strings.includes(tag.name))
      .sort((a, b) => a.name.localeCompare(b.name));
    setRecommendedTags(tags);
  }, [blueprintData, getTags.data]);

  return (
    <FormField
      control={form.control}
      name="tag_ids"
      rules={{ required: true }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tags</FormLabel>
          <FormControl>
            <TagCombobox {...field} multiline />
          </FormControl>
          <FormDescription>
            The first tag will be displayed next to the blueprint title.
          </FormDescription>
          <FormMessage />
          {recommendedTags.length > 0 && (
            <div className="flex flex-col gap-3 rounded-lg border border-steel-700 p-3">
              <div className="flex items-center gap-1 text-sm text-fern-400">
                <SparkleIcon className="size-3 fill-fern-400" />
                Recommended tags
              </div>
              <div className="flex flex-wrap gap-2">
                {recommendedTags.map(tag => (
                  <Tag key={tag.id} truncate={false} className="shrink-0">
                    <div className="flex select-none items-center gap-1">
                      {tag.name}
                      <Tooltip delayDuration={500}>
                        <TooltipTrigger>
                          <ArrowUpIcon
                            className="size-4 shrink-0 hover:cursor-pointer"
                            onClick={() => {
                              form.setValue('tag_ids', [
                                tag.id,
                                ...field.value.filter(t => t !== tag.id),
                              ]);
                            }}
                          />
                        </TooltipTrigger>
                        <TooltipContent>Add to tags</TooltipContent>
                      </Tooltip>
                    </div>
                  </Tag>
                ))}
              </div>
            </div>
          )}
        </FormItem>
      )}
    />
  );
};
