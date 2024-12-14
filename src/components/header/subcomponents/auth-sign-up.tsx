import { useBearStore } from '@/store';
import { Button } from '@/ui';
import { UserIcon } from 'lucide-react';

export const AuthSignUp = () => {
  const setShowSignUpDialog = useBearStore(state => state.setShowSignUpDialog);

  return (
    <>
      <Button
        className="hidden md:flex"
        variant="secondary"
        leftIcon={<UserIcon size={16} absoluteStrokeWidth />}
        onClick={() => setShowSignUpDialog(true)}
      >
        Sign up
      </Button>
      <p className="block md:hidden">Sign up</p>
    </>
  );
};
