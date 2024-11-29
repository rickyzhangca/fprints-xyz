import { BearState, useBearStore } from '@/store';
import { IBlueprintCard } from '@/supabase';
import { supabase } from '@/supabase/client';
import { useCallback, useMemo } from 'react';

export type SearchBlueprintsParams = {
  searchString: string;
  includeTagIds: string[];
  excludeTagIds: string[];
  includeComponents: string[];
  excludeComponents: string[];
  page: number;
  sort: BearState['sort'];
};

export type SearchResults = {
  blueprints: IBlueprintCard[];
  totalCount: number;
};

export const useSearchBlueprints = () => {
  const blueprintCardsPerPage = useBearStore(
    state => state.blueprintCardsPerPage
  );

  const createBaseQuery = useMemo(() => {
    return () =>
      supabase
        .from('blueprints')
        .select('id', { count: 'exact' })
        .eq('is_public', true);
  }, []);

  const searchBlueprints = useCallback(
    async ({
      searchString,
      includeTagIds,
      excludeTagIds,
      includeComponents,
      excludeComponents,
      page,
      sort,
    }: SearchBlueprintsParams): Promise<SearchResults> => {
      let blueprintQuery = createBaseQuery();

      const [includedTagsResult, excludedTagsResult] = await Promise.all([
        includeTagIds.length > 0
          ? supabase
              .from('blueprint_tags')
              .select('blueprint_id')
              .in('tag_id', includeTagIds)
          : null,
        excludeTagIds.length > 0
          ? supabase
              .from('blueprint_tags')
              .select('blueprint_id')
              .in('tag_id', excludeTagIds)
          : null,
      ]);

      if (includedTagsResult?.error) throw includedTagsResult.error;
      if (excludedTagsResult?.error) throw excludedTagsResult.error;

      if (searchString.trim()) {
        blueprintQuery = blueprintQuery.textSearch(
          'title_description_tsv',
          searchString.trim(),
          {
            type: 'websearch',
            config: 'english',
          }
        );
      }

      if (includedTagsResult?.data) {
        const blueprintIds = includedTagsResult.data.map(
          row => row.blueprint_id
        );
        if (blueprintIds.length === 0) {
          return { blueprints: [], totalCount: 0 };
        }
        blueprintQuery = blueprintQuery.in('id', blueprintIds);
      }

      if (excludedTagsResult?.data) {
        const blueprintIdsToExclude = excludedTagsResult.data.map(
          row => row.blueprint_id
        );
        if (blueprintIdsToExclude.length > 0) {
          blueprintQuery = blueprintQuery.not(
            'id',
            'in',
            blueprintIdsToExclude
          );
        }
      }

      if (includeComponents.length > 0) {
        blueprintQuery = blueprintQuery.contains(
          'components',
          includeComponents
        );
      }

      if (excludeComponents.length > 0) {
        blueprintQuery = blueprintQuery.not(
          'components',
          'cs',
          `{${excludeComponents.join(',')}}`
        );
      }

      const {
        data: matchingBlueprints,
        error: blueprintError,
        count,
      } = await blueprintQuery;

      if (blueprintError) throw blueprintError;
      if (!matchingBlueprints?.length) {
        return { blueprints: [], totalCount: 0 };
      }

      const from = (page - 1) * blueprintCardsPerPage;
      const to = from + blueprintCardsPerPage - 1;

      const { data: blueprintCards, error: cardsError } = await supabase
        .from('blueprint_card')
        .select('*')
        .in(
          'id',
          matchingBlueprints.map(b => b.id)
        )
        .order(sort === 'Most recent' ? 'created_at' : 'like_count', {
          ascending: false,
        })
        .range(from, to);

      if (cardsError) throw cardsError;

      return {
        blueprints: blueprintCards ?? [],
        totalCount: count ?? 0,
      };
    },
    [blueprintCardsPerPage, createBaseQuery]
  );

  return searchBlueprints;
};
