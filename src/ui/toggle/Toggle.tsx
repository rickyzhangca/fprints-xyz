import { tw } from '@/utils';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md transition-colors duration-50 hover:bg-white/20 active:bg-white/30 outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-fern-400 data-[state=on]:hover:bg-fern-500 text-steel-50 data-[state=on]:text-steel-950 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2',
  {
    variants: {
      variant: {
        default: 'bg-white/15',
        outline:
          'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-[42px] min-w-[42px]',
        sm: 'h-8 min-w-8',
        lg: 'h-11 min-w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={tw(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
