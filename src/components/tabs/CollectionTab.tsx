import { BlueprintCard } from '@/components';
import { useGetBlueprintsByCollection } from '@/hooks';
import { useBearStore } from '@/store';
import { Helmet } from 'react-helmet-async';
import Masonry from 'react-responsive-masonry';
import { Outlet, useParams } from 'react-router-dom';

export const CollectionTab = () => {
  const { collectionId } = useParams();
  const getBlueprintsByCollection = useGetBlueprintsByCollection(collectionId!);
  const columns = useBearStore(state => state.columns);

  return (
    <>
      <Helmet>
        <title>My collection</title>
      </Helmet>
      <Masonry columnsCount={columns} gutter="16px">
        {getBlueprintsByCollection.data?.map(b => (
          <BlueprintCard
            key={b.blueprint_id}
            blueprint={{
              // TODO: should not need to manually pass all these props
              created_at: b.created_at,
              data_fetched_at: b.data_fetched_at,
              game_version: b.game_version,
              title_description_tsv: undefined,
              user_color: b.blueprint_user_color,
              user_handle: b.blueprint_user_handle,
              id: b.blueprint_id,
              image_url: b.image_url,
              type: b.type,
              is_public: b.is_public,
              like_count: b.like_count,
              liked_by_current_user: b.liked_by_current_user,
              liked_by_current_user_at: b.liked_by_current_user_at,
              main_tag_id: b.main_tag_id,
              main_tag_name: b.main_tag_name,
              title: b.title,
              updated_at: b.updated_at,
              user_id: b.blueprint_user_id,
              meta: b.meta,
              background: b.background,
              image_original_width: b.image_original_width,
            }}
          />
        ))}
      </Masonry>
      <Outlet />
    </>
  );
};
