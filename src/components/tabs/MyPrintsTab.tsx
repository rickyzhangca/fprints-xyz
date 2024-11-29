import { BlueprintCard } from '@/components';
import { useGetMyBlueprints } from '@/hooks';
import { useBearStore } from '@/store';
import { Helmet } from 'react-helmet-async';
import Masonry from 'react-responsive-masonry';
import { Outlet } from 'react-router-dom';

export const MyPrintsTab = () => {
  const getMyBlueprints = useGetMyBlueprints();
  const columns = useBearStore(state => state.columns);

  return (
    <>
      <Helmet>
        <title>My prints</title>
      </Helmet>
      <Masonry columnsCount={columns} sequential gutter="16px">
        {getMyBlueprints.data?.map(b => (
          <BlueprintCard key={b.id} blueprint={b} />
        ))}
      </Masonry>
      <Outlet />
    </>
  );
};
