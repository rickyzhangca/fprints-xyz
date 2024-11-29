import { useBearStore } from '@/store';
import { Button } from '@/ui';
import { LockIcon, PlusIcon } from 'lucide-react';

export const CreateButton = ({ onSubmit }: { onSubmit: () => void }) => {
  const session = useBearStore(state => state.session);

  return (
    <Button
      className="rounded-r-none"
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
      Create
    </Button>
  );
};
