import { FormType } from '@/components/create-blueprint-button/CreateBlueprintButton';
import { useBearStore } from '@/store';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui';
import { ChevronDownIcon, ImportIcon } from 'lucide-react';

export const ImportButton = ({
  onSubmit,
}: {
  onSubmit: (importFrom: FormType) => void;
}) => {
  const session = useBearStore(state => state.session);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={!session} variant="headless">
        <Button
          className="min-w-6 rounded-l-none border-l border-fern-600 px-1.5"
          disabled={!session}
        >
          <ChevronDownIcon size={16} absoluteStrokeWidth />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => onSubmit('import-factorio-prints')}>
          <ImportIcon />
          Import from Factorio Prints
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onSubmit('import-factorio-school')}>
          <ImportIcon />
          Import from Factorio School
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onSubmit('import-factorio-bin')}>
          <ImportIcon />
          Import from Factorio Bin
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
