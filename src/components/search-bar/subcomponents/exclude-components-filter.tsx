import { ComponentCombobox } from '@/components/component-combobox';

interface ExcludeComponentsFilterProps {
  components: string[];
  setComponents: (components: string[]) => void;
}

export const ExcludeComponentsFilter = ({
  components,
  setComponents,
}: ExcludeComponentsFilterProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-sm text-steel-300">Avoid these components</p>
      <ComponentCombobox
        className="bg-steel-300 hover:bg-steel-200 active:bg-steel-300"
        value={components}
        onChange={setComponents}
        placeholder="All components"
        mode="exclude"
      />
    </div>
  );
};
