import { useCreateLike, useDeleteLike } from '@/hooks';
import { useBearStore } from '@/store';
import type { IBlueprintCard, IBlueprintDetails } from '@/supabase';
import { Button } from '@/ui';
import { getUpdatedIsLiked, getUpdatedLikedCount, tw } from '@/utils';

import { HeartIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type LikeButtonProps = {
  variant?: 'default' | 'ghost';
  blueprint: IBlueprintCard | IBlueprintDetails;
};

export const LikeButton = ({ variant, blueprint }: LikeButtonProps) => {
  const session = useBearStore(state => state.session);
  const navigate = useNavigate();
  const createLike = useCreateLike();
  const deleteLike = useDeleteLike();
  const likesHistory = useBearStore(state => state.likesHistory);

  const shouldHighlight = getUpdatedIsLiked(
    blueprint.id,
    blueprint.data_fetched_at,
    blueprint.liked_by_current_user,
    likesHistory
  );

  const likeCount = getUpdatedLikedCount(
    blueprint.id,
    blueprint.data_fetched_at,
    blueprint.liked_by_current_user,
    likesHistory,
    blueprint.like_count
  );

  const handleClick = () => {
    if (!blueprint.id) return;
    if (!session) {
      navigate('/login');
      return;
    }
    if (shouldHighlight) {
      deleteLike.mutate(blueprint.id);
    } else {
      createLike.mutate(blueprint.id);
    }
  };

  if (variant === 'ghost') {
    return (
      <button
        disabled={!blueprint.id}
        className={tw(
          'group flex items-center gap-0.5 transition-colors duration-100',
          shouldHighlight
            ? 'text-red-500 hover:text-red-600'
            : 'hover:text-steel-50'
        )}
        onClick={handleClick}
        data-umami-event={shouldHighlight ? 'unliked' : 'liked'}
      >
        <HeartIcon
          size={14}
          strokeWidth={1.5}
          absoluteStrokeWidth
          className={tw(
            shouldHighlight && 'fill-red-500 group-hover:fill-red-600'
          )}
        />
        {!!likeCount && likeCount > 0 && <p>{likeCount}</p>}
      </button>
    );
  }

  return (
    <Button
      disabled={!blueprint.id || !session}
      variant={!session ? 'secondary' : shouldHighlight ? 'liked' : 'like'}
      leftIcon={
        <HeartIcon
          className="size-4 shrink-0"
          absoluteStrokeWidth
          strokeWidth={2.5}
        />
      }
      onClick={handleClick}
      className="min-w-[60px]"
      data-umami-event={shouldHighlight ? 'unliked' : 'liked'}
    >
      {likeCount}
    </Button>
  );
};
