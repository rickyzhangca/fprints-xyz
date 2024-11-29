import { tw } from '@/utils';
import React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon, rightIcon, containerClassName, className, ...props }, ref) => {
    return (
      <div className={tw('relative', containerClassName)}>
        {leftIcon && (
          <div className="absolute left-3 top-0 flex h-full w-4 items-center justify-center text-steel-500 placeholder:text-steel-400">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={tw(
            'h-[42px] w-full rounded-lg bg-steel-200 px-3 text-steel-950 outline-none transition-colors duration-100 placeholder:text-steel-950/30 focus:bg-steel-100',
            leftIcon && 'pl-9',
            rightIcon && 'pr-9',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-0 flex h-full w-4 items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
