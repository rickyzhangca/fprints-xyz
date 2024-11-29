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
    | 'link';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = 'primary', leftIcon, rightIcon, className, ...props },
    ref
  ) => {
    const baseStyles = tw(
      'rounded-lg font-medium h-[42px] min-w-[44px] flex items-center justify-center gap-1.5 px-3.5 disabled:opacity-50 disabled:pointer-events-none',
      leftIcon && 'pl-3 pr-3.5',
      rightIcon && 'pr-3 pl-3.5'
    );
    const variants = {
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
        <span className="truncate">{children}</span>
        {rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
