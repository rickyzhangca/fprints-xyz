import { tw } from '@/utils';
import * as React from 'react';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={tw(
        'border-input bg-steel-200 focus:bg-steel-100 placeholder:text-steel-400 flex min-h-40 w-full rounded-md border px-3 py-2 text-base outline-none transition-colors duration-100 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
