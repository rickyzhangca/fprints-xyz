import { useBearStore } from '@/store';
import { Button } from '@/ui';
import { LockIcon, PlusIcon } from 'lucide-react';

export const CreateButton = ({
  label,
  onSubmit,
}: {
  label?: string;
  onSubmit: () => void;
}) => {
  const session = useBearStore(state => state.session);

  return (
    <Button
      className="w-full rounded-r-none"
      disabled={!session}
      leftIcon={
        !session ? (
          <LockIcon size={16} absoluteStrokeWidth />
        ) : (
          <PlusIcon size={16} absoluteStrokeWidth />
        )
      }
      onClick={onSubmit}
    >
      {label ?? 'Create'}
    </Button>
  );
};
