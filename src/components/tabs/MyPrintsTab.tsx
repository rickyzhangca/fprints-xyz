import { BlueprintCard, CreateBlueprintButton } from '@/components';
import { useGetMyBlueprints, useRPCStats } from '@/hooks';
import { useBearStore } from '@/store';
import { CopyIcon, FolderIcon, HeartIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Masonry from 'react-responsive-masonry';
import { Outlet } from 'react-router-dom';

export const MyPrintsTab = () => {
  const session = useBearStore(state => state.session);
  const getMyBlueprints = useGetMyBlueprints();
  const columns = useBearStore(state => state.columns);

  const onlyHasPrivateBlueprints =
    getMyBlueprints.data?.filter(b => !b.is_public).length ===
    getMyBlueprints.data?.length;

  const rpcStats = useRPCStats(
    !onlyHasPrivateBlueprints && !!session?.user?.id
  );

  return (
    <>
      <Helmet>
        <title>My prints</title>
      </Helmet>
      <Masonry columnsCount={columns} sequential gutter="16px">
        {getMyBlueprints.data &&
          (onlyHasPrivateBlueprints || getMyBlueprints.data.length === 0) && (
            <div className="flex h-full w-full flex-col justify-between gap-4 rounded-lg bg-steel-950 p-4">
              <div className="flex flex-col gap-2">
                <div className="p-1 text-lg font-medium text-steel-50">
                  Got your first blueprint to share?
                </div>
                <div className="text-sm text-steel-400">
                  We&apos;ve all been stuck on a build before. Your hack might
                  be exactly what someone needs.
                </div>
                <div className="text-sm text-steel-400">
                  Watch the likes and copies stack up as other engineers put
                  your blueprint to work on their planets!
                </div>
              </div>
              <CreateBlueprintButton />
            </div>
          )}
        {getMyBlueprints.data &&
          !onlyHasPrivateBlueprints &&
          getMyBlueprints.data.length > 0 && (
            <div className="flex w-full flex-col justify-between gap-4 rounded-lg bg-steel-950 p-4 sm:h-[374px]">
              <div className="flex flex-col gap-2">
                <div className="p-1 text-lg font-medium text-steel-50">
                  Your blueprints at work
                </div>
                <div className="text-sm text-steel-400">
                  Looks like your designs are helping quite a few factories
                  grow!
                </div>
                <div className="flex items-center gap-2 pt-2 text-sm text-red-500">
                  <div className="flex items-center gap-1">
                    <HeartIcon size={16} />
                    <p className="text-2xl font-medium">
                      {rpcStats.data?.total_likes}
                    </p>
                  </div>
                  Likes
                </div>
                <div className="flex items-center gap-2 text-sm text-fern-400">
                  <div className="flex items-center gap-1">
                    <CopyIcon size={16} />
                    <p className="text-2xl font-medium">
                      {rpcStats.data?.total_copies}
                    </p>
                  </div>
                  Copies
                </div>
                <div className="flex items-center gap-2 text-sm text-amber-500">
                  <div className="flex items-center gap-1">
                    <FolderIcon size={16} />
                    <p className="text-2xl font-medium">
                      {rpcStats.data?.total_collections}
                    </p>
                  </div>
                  Collections
                </div>
              </div>
              <CreateBlueprintButton label="Share another" />
            </div>
          )}
        {getMyBlueprints.data?.map(b => (
          <BlueprintCard key={b.id} blueprint={b} />
        ))}
      </Masonry>
      <Outlet />
    </>
  );
};
