import {
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/ui';

export type IQuickFilterOptions = Record<
  string,
  {
    children: React.ReactNode;
    tooltip: string;
    action: () => void;
  }
>;

interface QuickFiltersProps {
  value: keyof IQuickFilterOptions | '';
  onChange: (value: keyof IQuickFilterOptions) => void;
  options: IQuickFilterOptions;
}

export const QuickFilters = ({
  value,
  onChange,
  options,
}: QuickFiltersProps) => {
  return (
    <ToggleGroup
      type="single"
      className="justify-start"
      value={value}
      onValueChange={onChange}
    >
      {Object.entries(options).map(([value, option]) => (
        <Tooltip key={value}>
          <TooltipTrigger>
            <ToggleGroupItem value={value}>{option.children}</ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent>
            <p>{option.tooltip}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </ToggleGroup>
  );
};
