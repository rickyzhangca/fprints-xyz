import { BearState } from '@/store';
import { IBlueprintCard } from '@/supabase';

const getLastLike = (
  id: IBlueprintCard['id'],
  dataFetchedAt: IBlueprintCard['data_fetched_at'],
  likeHistory: BearState['likesHistory']
) => {
  const fetched = new Date(dataFetchedAt ?? '');
  const likeHistoryAfterFetched = likeHistory.filter(
    l => l.id === id && l.at > fetched
  );

  if (likeHistoryAfterFetched.length === 0) return null;
  return likeHistoryAfterFetched[likeHistoryAfterFetched.length - 1];
};

export const getUpdatedIsLiked = (
  id: IBlueprintCard['id'],
  dataFetchedAt: IBlueprintCard['data_fetched_at'],
  liked_by_current_user: IBlueprintCard['liked_by_current_user'],
  likeHistory: BearState['likesHistory']
) => {
  const lastLike = getLastLike(id, dataFetchedAt, likeHistory);
  return lastLike?.isLiked ?? liked_by_current_user;
};

export const getUpdatedLikedCount = (
  id: IBlueprintCard['id'],
  dataFetchedAt: IBlueprintCard['data_fetched_at'],
  liked_by_current_user: IBlueprintCard['liked_by_current_user'],
  likeHistory: BearState['likesHistory'],
  like_count: IBlueprintCard['like_count']
) => {
  const lastLike = getLastLike(id, dataFetchedAt, likeHistory);
  if (!lastLike) return like_count;
  if (liked_by_current_user) {
    return lastLike.isLiked ? like_count! : like_count! - 1;
  }
  return lastLike.isLiked ? like_count! + 1 : like_count!;
};
