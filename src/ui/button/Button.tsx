import { tw } from '@/utils';
import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'ghost'
    | 'like'
    | 'liked'
    | 'collect'
    | 'collected'
    | 'link'
    | 'headless';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      leftIcon,
      rightIcon,
      loading,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles = tw(
      'rounded-lg font-medium h-[42px] min-w-[44px] flex items-center justify-center gap-1.5 px-3.5 disabled:opacity-50 disabled:pointer-events-none',
      leftIcon && 'pl-3 pr-3.5',
      rightIcon && 'pr-3 pl-3.5',
      loading && 'pointer-events-none'
    );
    const variants = {
      headless: 'p-0 h-auto min-w-fit',
      primary:
        'bg-fern-400 text-steel-950 hover:bg-fern-500 active:bg-fern-600 disabled:text-fern-800',
      like: 'bg-transparent text-white border hover:border-transparent border-steel-500 hover:bg-red-500 active:bg-red-600 disabled:text-red-800',
      liked:
        'bg-red-400 text-steel-950 hover:bg-red-500 active:bg-red-600 disabled:text-red-800',
      collect:
        'bg-transparent text-white border hover:border-transparent border-steel-500 hover:bg-amber-600 active:bg-amber-700 disabled:text-amber-800',
      collected:
        'bg-amber-400 text-steel-950 hover:bg-amber-500 active:bg-amber-600 disabled:text-amber-800',
      secondary:
        'bg-steel-300 text-steel-950 hover:bg-steel-400 active:bg-steel-500 disabled:text-steel-800',
      ghost:
        'bg-transparent text-steel-50 hover:bg-white/10 active:bg-white/20 disabled:text-steel-50/50',
      link: 'bg-transparent text-fern-400 hover:text-fern-500 active:text-fern-600 hover:bg-transparent active:bg-transparent disabled:text-steel-50/50 p-0 h-auto',
    };

    return (
      <button
        ref={ref}
        className={tw(baseStyles, variants[variant], className)}
        {...props}
      >
        {leftIcon}
        {loading ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="h-5 w-5 animate-spin fill-steel-50 text-steel-950/30"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <span className="truncate">{children}</span>
        )}
        {rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
