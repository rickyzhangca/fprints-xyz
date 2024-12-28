import { IBlueprint } from '@/supabase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui';
import { useFormContext } from 'react-hook-form';
import { ICreateBlueprintFormValues } from '../BlueprintForm';

const backgroundOptions1: { label: string; value: IBlueprint['background'] }[] =
  [
    { label: 'Minimal', value: 'minimal' },
    { label: 'Refined concrete', value: 'refined-concrete' },
    { label: 'Foundation', value: 'foundation' },
  ];

const backgroundOptions2: { label: string; value: IBlueprint['background'] }[] =
  [
    { label: 'Nauvis', value: 'nauvis' },
    { label: 'Vulcanus', value: 'vulcanus' },
    { label: 'Fulgora', value: 'fulgora' },
    { label: 'Gleba', value: 'gleba' },
    { label: 'Aquilo', value: 'aquilo' },
  ];

const backgroundOptions3: { label: string; value: IBlueprint['background'] }[] =
  [
    { label: 'Space', value: 'space' },
    { label: 'In space above Nauvis', value: 'space-nauvis' },
    { label: 'In space above Vulcanus', value: 'space-vulcanus' },
    { label: 'In space above Fulgora', value: 'space-fulgora' },
    { label: 'In space above Gleba', value: 'space-gleba' },
    { label: 'In space above Aquilo', value: 'space-aquilo' },
  ];

export const ImageBackground = () => {
  const form = useFormContext<ICreateBlueprintFormValues>();
  const background = form.watch('background');

  return (
    <div className="flex items-center justify-end gap-3">
      <p className="text-steel-300">Background</p>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {backgroundOptions1.find(option => option.value === background)
            ?.label ??
            backgroundOptions2.find(option => option.value === background)
              ?.label ??
            backgroundOptions3.find(option => option.value === background)
              ?.label ??
            'Choose background'}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {backgroundOptions1.map(option => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => form.setValue('background', option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          {backgroundOptions2.map(option => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => form.setValue('background', option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          {backgroundOptions3.map(option => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => form.setValue('background', option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
