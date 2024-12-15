import { useUpdateProfile } from '@/hooks';
import { useBearStore } from '@/store';
import { Button } from '@/ui';

// update this component per new feature
const KEY = 'remix';
const content = (
  <div className="flex flex-col gap-3">
    <img
      src="https://fprints-asset.b-cdn.net/ui/new-feature-remix.webp"
      alt="remix"
      className="min-h-32 rounded-lg border border-steel-700 bg-steel-950 object-contain"
    />
    <p className="text-lg font-medium">New feature: remix 🔁</p>
    <p className="text-steel-300">
      When creating or editing a blueprint, you can now mark it as a remix by
      adding the url of the original blueprint.
    </p>
    <p className="text-steel-300">
      Be encouraged to make improvements to other&apos;s work, and showcase with
      giving a reference!
    </p>
    <p className="text-steel-300">
      As always, hit us up at the bottom right corner if any bugs or issues.
    </p>
  </div>
);

export const NewFeature = () => {
  const profile = useBearStore(state => state.profile);
  const removedNewFeature = useBearStore(state => state.removed_new_feature);
  const setRemovedNewFeature = useBearStore(
    state => state.setRemovedNewFeature
  );
  const setShowSignUpDialog = useBearStore(state => state.setShowSignUpDialog);
  const updateProfile = useUpdateProfile();

  if (!profile || (profile && profile.new_feature !== KEY)) return null;

  if (removedNewFeature === KEY) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-60 flex w-full flex-col gap-6 bg-steel-950 px-6 py-5 text-steel-50 shadow-xl-top md:bottom-4 md:left-auto md:right-4 md:w-[420px] md:rounded-lg md:shadow-2xl">
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
        <div className="flex flex-col gap-2">
          <Button
            data-umami-event="new-feature-dismiss-signing-up"
            onClick={() => {
              setShowSignUpDialog(true);
              setRemovedNewFeature(KEY);
            }}
          >
            Sign up to post yours!
          </Button>
          <Button
            variant="ghost"
            onClick={() => setRemovedNewFeature(KEY)}
            data-umami-event="new-feature-dismiss-no-signup"
          >
            Got it
          </Button>
        </div>
      )}
    </div>
  );
};
