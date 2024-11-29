import { ChevronsUpDownIcon } from 'lucide-react';

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
} from '@/ui';

import { ComponentIcon } from '@/components/component-icon';
import { componentsData } from '@/data';
import { tw } from '@/utils';
import { useState } from 'react';

type ComponentComboboxProps = {
  value: string[];
  onChange: (value: string[]) => void;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
  mode: 'include' | 'exclude';
};

export const ComponentCombobox = ({
  value,
  onChange,
  multiline,
  className,
  placeholder,
  mode,
}: ComponentComboboxProps) => {
  const [open, setOpen] = useState(false);

  const components =
    value.length > 0 ? (
      value.map(component => (
        <ComponentIcon key={component} component={component} variant="ghost" />
      ))
    ) : (
      <p className="shrink-0 select-none text-steel-500">
        {placeholder ?? 'Select one or more components'}
      </p>
    );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className={tw(
          'flex items-center justify-between rounded-lg bg-steel-200 px-3 transition-colors duration-100 hover:cursor-pointer active:bg-steel-100',
          multiline ? 'min-h-14 py-2' : 'h-14',
          className
        )}
      >
        <div className="flex min-w-0 items-center gap-1">
          {multiline ? (
            <div className="flex flex-wrap gap-1">{components}</div>
          ) : (
            <ScrollArea orientation="horizontal" type="auto">
              <div className="flex gap-1">{components}</div>
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
            placeholder="Search components..."
          />
          <CommandList className="scrollbar scrollbar-track-steel-700 scrollbar-thumb-steel-400">
            <CommandEmpty>No components found</CommandEmpty>
            {Object.entries(componentsData).map(
              ([group, componentsRows], i) => (
                <>
                  <CommandGroup
                    key={i}
                    heading={group}
                    className="border-t border-steel-700 [&_[cmdk-group-items]]:flex [&_[cmdk-group-items]]:flex-col [&_[cmdk-group-items]]:px-2 [&_[cmdk-group-items]]:py-1 [&_[cmdk-group-items]]:pb-2"
                  >
                    {componentsRows.map((components, i) => (
                      <div key={i} className="flex flex-wrap gap-0.5">
                        {components.map(component => (
                          <CommandItem
                            className="rounded-md border border-transparent bg-transparent p-0 hover:bg-transparent"
                            key={component}
                            value={component}
                            onSelect={() => {
                              onChange(
                                value.some(c => c === component)
                                  ? value.filter(c => c !== component)
                                  : [...value, component]
                              );
                            }}
                          >
                            <ComponentIcon
                              component={component}
                              variant={
                                value.some(c => c === component)
                                  ? mode === 'include'
                                    ? 'positive'
                                    : 'negative'
                                  : 'default'
                              }
                            />
                          </CommandItem>
                        ))}
                      </div>
                    ))}
                  </CommandGroup>
                </>
              )
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
