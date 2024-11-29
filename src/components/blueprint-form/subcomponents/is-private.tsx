import {
  Checkbox,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui';

export const IsPrivate = () => {
  return (
    <FormField
      name="is_public"
      render={({ field }) => (
        <FormItem className="mt-1 flex items-start gap-2">
          <FormControl>
            <Checkbox
              checked={!field.value}
              onCheckedChange={checked => {
                field.onChange(!checked);
              }}
            />
          </FormControl>
          <div className="!m-0 flex flex-col gap-1">
            <FormLabel>Keep private</FormLabel>
            <FormDescription>
              Hide the blueprint from other engineers.
            </FormDescription>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
