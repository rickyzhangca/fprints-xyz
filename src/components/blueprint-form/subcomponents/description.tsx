import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui';
import { lazy, Suspense, useMemo } from 'react';

const MDEditor = lazy(() => import('@uiw/react-md-editor'));

export const Description = () => {
  const commandsFilter = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => (command: any) =>
      [
        'bold',
        'italic',
        'strikethrough',
        'link',
        'quote',
        'code',
        'codeBlock',
        'comment',
        'image',
        'table',
        'unordered-list',
        'ordered-list',
        'checked-list',
      ].includes(command.name ?? '')
        ? command
        : false,
    []
  );

  return (
    <FormField
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Suspense
              fallback={<div className="h-[200px] rounded-lg bg-steel-200" />}
            >
              <MDEditor
                {...field}
                preview="edit"
                minHeight={200 - 28}
                commandsFilter={commandsFilter}
                textareaProps={{
                  placeholder:
                    "What's so cool about this blueprint? Markdown is supported ;-)",
                }}
              />
            </Suspense>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
