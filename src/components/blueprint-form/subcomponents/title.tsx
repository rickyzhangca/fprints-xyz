import { Input } from '@/ui';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui';

export const Title = () => {
  return (
    <FormField
      name="title"
      rules={{ required: true }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input placeholder="Enter title here" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
