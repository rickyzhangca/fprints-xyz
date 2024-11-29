import { tw } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const tagVariants = cva(
  'flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors duration-75',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-white/15 text-steel-50 hover:bg-white/25',
        inverted:
          'border-transparent bg-steel-900 text-steel-50 hover:bg-steel-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  truncate?: boolean;
}

function Tag({
  className,
  variant,
  truncate = true,
  children,
  ...props
}: TagProps) {
  return (
    <div className={tw(tagVariants({ variant }), className)} {...props}>
      <div className={tw(truncate && 'min-w-0 truncate')}>{children}</div>
    </div>
  );
}

export { Tag, tagVariants };
