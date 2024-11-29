import { ChevronsLeftIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Tag,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/ui';

import { useGetTags } from '@/hooks';
import { Database } from '@/supabase';
import { tw } from '@/utils';
import { useEffect, useState } from 'react';

export type ITag = Database['public']['Tables']['tags']['Row'];

type TagComboboxProps = {
  value: string[];
  onChange: (value: string[]) => void;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
};

export const TagCombobox = ({
  value,
  onChange,
  multiline,
  className,
  placeholder,
}: TagComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const [sortedTags, setSortedTags] = useState<
    {
      group: string;
      tags: ITag[];
    }[]
  >([]);

  useEffect(() => {
    if (open) setOpened(true);
  }, [open]);

  const getTags = useGetTags(opened || value.length > 0);

  useEffect(() => {
    if (getTags.data) {
      setSortedTags(
        Object.entries(
          getTags.data.reduce(
            (acc, tag) => {
              const group = tag.tag_group;
              if (!acc[group]) {
                acc[group] = [];
              }
              acc[group].push(tag);
              return acc;
            },
            {} as Record<string, ITag[]>
          )
        )
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([group, tags]) => ({
            group,
            tags,
          }))
      );
    }
  }, [getTags.data]);

  const tags =
    value.length > 0 ? (
      value.map((id, i) => (
        <Tag key={id} variant="inverted" truncate={false} className="shrink-0">
          <div className="flex select-none items-center gap-1">
            {getTags.data?.find(tag => tag.id === id)?.name}
            {i > 0 && (
              <Tooltip delayDuration={500}>
                <TooltipTrigger>
                  <ChevronsLeftIcon
                    className="ml-0.5 size-4 shrink-0 hover:cursor-pointer"
                    onClick={e => {
                      e.stopPropagation();
                      onChange([id, ...value.filter(i => i !== id)]);
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>Move to front</TooltipContent>
              </Tooltip>
            )}
            <Tooltip delayDuration={500}>
              <TooltipTrigger>
                <XIcon
                  className="size-4 shrink-0 hover:cursor-pointer"
                  onClick={e => {
                    e.stopPropagation();
                    onChange(value.filter(i => i != id));
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>Remove</TooltipContent>
            </Tooltip>
          </div>
        </Tag>
      ))
    ) : (
      <p className="shrink-0 select-none text-steel-500">
        {placeholder ?? 'Select one or more tags'}
      </p>
    );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className={tw(
          'flex items-center justify-between rounded-lg bg-steel-200 px-3 transition-colors duration-100 hover:cursor-pointer active:bg-steel-100',
          multiline ? 'min-h-[42px] py-2' : 'h-[42px]',
          className
        )}
      >
        <div className="flex min-w-0 items-center gap-1">
          {multiline ? (
            <div className="flex flex-wrap gap-1">{tags}</div>
          ) : (
            <ScrollArea orientation="horizontal" type="auto">
              <div className="flex gap-1">{tags}</div>
            </ScrollArea>
          )}
          <ChevronsUpDownIcon
            absoluteStrokeWidth
            strokeWidth={2.5}
            className="ml-2 size-4 shrink-0 text-steel-500"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        side="top"
        style={{
          width: 'var(--radix-popover-trigger-width)',
        }}
        // solves https://github.com/radix-ui/primitives/issues/1159
        onWheel={e => e.stopPropagation()}
      >
        <Command>
          <CommandInput
            wrapperClassName="border-none"
            placeholder="Search tags..."
          />
          <CommandList className="scrollbar scrollbar-track-steel-700 scrollbar-thumb-steel-400">
            <CommandEmpty>No tags found</CommandEmpty>
            {sortedTags.map(({ group, tags }) => (
              <CommandGroup
                key={group}
                heading={group}
                className="border-t border-steel-700 [&_[cmdk-group-items]]:flex [&_[cmdk-group-items]]:flex-wrap [&_[cmdk-group-items]]:gap-2 [&_[cmdk-group-items]]:px-2 [&_[cmdk-group-items]]:py-1 [&_[cmdk-group-items]]:pb-2"
              >
                {tags.map(tag => (
                  <CommandItem
                    key={tag.id}
                    className={tw(
                      'rounded-full border border-transparent bg-transparent p-0 transition-colors duration-100 hover:bg-transparent',
                      value.some(id => id === tag.id) && 'border-steel-50'
                    )}
                    value={tag.name}
                    onSelect={() => {
                      onChange(
                        value.some(id => id === tag.id)
                          ? value.filter(id => id !== tag.id)
                          : [...value, tag.id]
                      );
                    }}
                  >
                    <Tag key={tag.id}>
                      <div>{tag.name}</div>
                    </Tag>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
