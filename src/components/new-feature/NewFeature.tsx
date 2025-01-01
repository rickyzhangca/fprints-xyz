import { useUpdateProfile } from '@/hooks';
import { useBearStore } from '@/store';
import { Button } from '@/ui';
import { XIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

// update this component per new feature
const KEY = 'fbsr-v1';
const content = (
  <div className="flex flex-col gap-3">
    <img
      src="https://fprints-asset.b-cdn.net/ui/new-feature-fbsr-v1.webp"
      alt="new-feature"
      className="rounded-lg border border-steel-700 bg-steel-950 object-contain"
    />
    <p className="text-lg font-medium">New feature: render for me 🖼️</p>
    <p className="text-steel-300">
      Don&apos;t want to bother with taking a screenshot?
    </p>
    <p className="text-steel-300">
      Powered by{' '}
      <Link to="https://github.com/demodude4u/Factorio-FBSR" target="_blank">
        FBSR
      </Link>
      , you can now let Fprints render one for you! Try it out by clicking the
      Create button, paste in your string, and clicking the Render for me
      button.
    </p>
    <p className="text-steel-300">
      The feature is in Beta. Just hit us up at the bottom right corner to
      report any bugs!
    </p>
    <p className="text-steel-300">
      Support for blueprint books and popular mods coming soon.
    </p>
  </div>
);

export const NewFeature = () => {
  const profile = useBearStore(state => state.profile);
  const user = useBearStore(state => state.user);
  const removedNewFeature = useBearStore(state => state.removed_new_feature);
  const setRemovedNewFeature = useBearStore(
    state => state.setRemovedNewFeature
  );
  const setShowSignUpDialog = useBearStore(state => state.setShowSignUpDialog);
  const updateProfile = useUpdateProfile();

  if ((!profile && user) || (profile && profile.new_feature !== KEY))
    return null;

  if (removedNewFeature === KEY) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-60 flex w-full flex-col gap-5 bg-steel-950 px-6 pb-6 pt-5 text-steel-50 shadow-xl-top slide-in-from-left-1/2 md:bottom-4 md:left-auto md:right-4 md:w-[420px] md:rounded-2xl md:shadow-2xl">
      <div className="flex justify-end">
        <button
          className="touch-manipulation p-2 sm:p-0"
          onClick={() => setRemovedNewFeature(KEY)}
          data-umami-event="new-feature-dismiss-no-signup"
        >
          <XIcon className="size-5 sm:size-4" />
        </button>
      </div>
      <div className="flex flex-col gap-6">
        {content}
        {profile ? (
          <Button
            onClick={() => {
              updateProfile.mutate({ ...profile, new_feature: '' });
              setRemovedNewFeature(KEY);
            }}
            data-umami-event="new-feature-dismiss-signed-in"
          >
            Got it
          </Button>
        ) : (
          <Button
            data-umami-event="new-feature-dismiss-signing-up"
            onClick={() => {
              setRemovedNewFeature(KEY);
              setShowSignUpDialog(true);
            }}
          >
            Sign up to post yours!
          </Button>
        )}
      </div>
    </div>
  );
};
