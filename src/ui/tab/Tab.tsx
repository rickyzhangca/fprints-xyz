import { ScrollArea } from '@/ui';
import { tw } from '@/utils';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <ScrollArea orientation="horizontal">
    <TabsPrimitive.List
      ref={ref}
      className={tw('flex h-10 w-full items-center', className)}
      {...props}
    />
  </ScrollArea>
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={tw(
      'flex h-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 text-sm font-medium text-steel-300 transition-all duration-75 data-[state=active]:bg-steel-950 data-[state=active]:text-steel-50 data-[state=inactive]:hover:bg-white/5 data-[state=inactive]:hover:text-steel-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={tw('focus-visible:outline-none', className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
