import { tw } from '@/utils';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
    orientation?: ScrollAreaPrimitive.ScrollAreaScrollbarProps['orientation'];
    redirectHorizontalWheel?: boolean;
  }
>(
  (
    {
      className,
      children,
      orientation = 'vertical',
      redirectHorizontalWheel = true,
      ...props
    },
    ref
  ) => {
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    const onWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
      if (
        !redirectHorizontalWheel ||
        !viewportRef.current ||
        e.deltaY === 0 ||
        e.deltaX !== 0
      ) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();

      const delta = e.deltaY;
      const currPos = viewportRef.current.scrollLeft;
      const scrollWidth = viewportRef.current.scrollWidth;

      const newPos = Math.max(0, Math.min(scrollWidth, currPos + delta));

      viewportRef.current.scrollLeft = newPos;
    }, []);

    useEffect(() => {
      const checkOverflow = () => {
        if (viewportRef.current) {
          const hasOverflow =
            viewportRef.current.scrollWidth > viewportRef.current.clientWidth;
          setIsOverflowing(hasOverflow);
        }
      };

      if (redirectHorizontalWheel) {
        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
      }
      return;
    }, [
      viewportRef.current?.clientWidth,
      viewportRef.current?.scrollWidth,
      redirectHorizontalWheel,
    ]);

    useEffect(() => {
      viewportRef.current?.addEventListener('wheel', (e: WheelEvent) => {
        onWheel(e as unknown as React.WheelEvent<HTMLDivElement>);
      });
    }, [onWheel]);

    return (
      <ScrollAreaPrimitive.Root
        ref={ref}
        className={tw(
          'relative overflow-hidden',
          isOverflowing && 'h-full pt-2',
          className
        )}
        {...props}
      >
        <ScrollAreaPrimitive.Viewport
          ref={viewportRef}
          className="h-full w-full rounded-[inherit]"
        >
          {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar
          orientation={orientation}
          onClick={e => e.stopPropagation()}
        />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    );
  }
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={tw(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' &&
        'h-full w-2.5 border-l border-l-transparent p-[1px]',
      orientation === 'horizontal' &&
        'h-2.5 flex-col border-t border-t-transparent p-[1px]',
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-steel-400" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
