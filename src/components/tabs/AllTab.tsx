import { BlueprintCard } from '@/components';
import { useGetAllBlueprints, useGetBlueprintCardsCount } from '@/hooks';
import { useBearStore } from '@/store';
import { getPagination } from '@/utils';
import { parseAsInteger, useQueryState } from 'nuqs';
import { Helmet } from 'react-helmet-async';
import Masonry from 'react-responsive-masonry';
import { Outlet } from 'react-router-dom';

export const AllTab = () => {
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const getAllBlueprints = useGetAllBlueprints(page);
  const getBlueprintCardsCount = useGetBlueprintCardsCount();
  const columns = useBearStore(state => state.columns);

  return (
    <>
      <Helmet>
        <title>All blueprints</title>
      </Helmet>
      <Masonry columnsCount={columns} sequential gutter="16px">
        {getAllBlueprints.data?.map(b => (
          <BlueprintCard key={b.id} blueprint={b} />
        ))}
      </Masonry>
      {getPagination(getBlueprintCardsCount.data ?? 0)}
      <Outlet />
    </>
  );
};
