import { BlueprintCard } from '@/components';
import { useGetLikedBlueprints } from '@/hooks';
import { useBearStore } from '@/store';
import { Helmet } from 'react-helmet-async';
import Masonry from 'react-responsive-masonry';
import { Outlet } from 'react-router-dom';

export const LikedTab = () => {
  const getLikedBlueprints = useGetLikedBlueprints(true);
  const columns = useBearStore(state => state.columns);

  return (
    <>
      <Helmet>
        <title>Liked</title>
      </Helmet>
      <Masonry columnsCount={columns} gutter="16px">
        {getLikedBlueprints.data?.map(b => (
          <BlueprintCard key={b.id} blueprint={b} />
        ))}
      </Masonry>
      <Outlet />
    </>
  );
};
