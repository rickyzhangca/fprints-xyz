import { BlueprintCard } from '@/components/blueprint-card';
import { ProfilePic } from '@/components/profile-pic';
import { useGetBlueprintsByUserId, useGetProfileByUserId } from '@/hooks';
import { useBearStore } from '@/store';
import { Dialog, DialogContent, DialogTitle } from '@/ui';
import { Helmet } from 'react-helmet-async';
import Masonry from 'react-responsive-masonry';
import { useNavigate, useParams } from 'react-router-dom';

export const UserDialog = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const columns = useBearStore(state => state.columns);

  const { data: profile } = useGetProfileByUserId(userId ?? '');
  const { data: blueprints } = useGetBlueprintsByUserId(userId ?? '');

  return (
    <Dialog
      open={!!userId}
      onOpenChange={open => {
        if (!open) navigate(-1);
      }}
    >
      <Helmet>
        <title>{`${userId} - Factorio Blueprint | Fprints`}</title>
      </Helmet>
      <DialogContent
        className="flex w-[calc(100vw-3rem)] max-w-[1920px] flex-col gap-0 overflow-hidden rounded-3xl bg-steel-950 p-0 shadow-2xl md:h-[calc(100vh-6rem)] xl:w-[calc(100vw-8rem)] 2xl:w-[calc(100vw-12rem)] 3xl:w-[calc(100vw-16rem)]"
        aria-labelledby="user-title"
      >
        {/* gives `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users regardless */}
        <DialogTitle id="user-title" className="sr-only">
          {profile?.handle}
        </DialogTitle>
        <div className="flex h-full flex-col gap-6 overflow-y-auto p-6 scrollbar scrollbar-track-steel-900 scrollbar-thumb-steel-500">
          <div className="flex items-center gap-3">
            <ProfilePic color={profile?.color} name={profile?.handle} size="lg"/>
            <h1 className="text-xl font-bold text-steel-50 2xl:text-2xl">
              {profile?.handle}
            </h1>
          </div>
          <Masonry columnsCount={columns - 1} sequential gutter="16px">
            {blueprints?.map(b => (
              <BlueprintCard key={b.id} useAbsoluteUrl blueprint={b} />
            ))}
          </Masonry>
        </div>
      </DialogContent>
    </Dialog>
  );
};
