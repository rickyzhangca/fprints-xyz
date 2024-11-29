import { BlueprintCard } from '@/components';
import { SearchResults, useSearchBlueprints } from '@/hooks/search';
import { useBearStore } from '@/store';
import { getPagination } from '@/utils';
import { CheckIcon } from 'lucide-react';
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from 'nuqs';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Masonry from 'react-responsive-masonry';
import { Outlet } from 'react-router-dom';

export const Search = () => {
  const searchBlueprints = useSearchBlueprints();
  const [searchResults, setSearchResults] = useState<SearchResults | null>(
    null
  );
  const [searchString] = useQueryState('string');
  const [searchIncludeTagIds] = useQueryState(
    'it', // include tag ids
    parseAsArrayOf(parseAsString)
  );
  const [searchExcludeTagIds] = useQueryState(
    'et', // exclude tag ids
    parseAsArrayOf(parseAsString)
  );
  const [searchIncludeComponents] = useQueryState(
    'ic', // include components
    parseAsArrayOf(parseAsString)
  );
  const [searchExcludeComponents] = useQueryState(
    'ec', // exclude components
    parseAsArrayOf(parseAsString)
  );

  const columns = useBearStore(state => state.columns);
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const sort = useBearStore(state => state.sort);

  useEffect(() => {
    searchBlueprints({
      searchString: searchString ?? '',
      includeTagIds: searchIncludeTagIds ?? [],
      excludeTagIds: searchExcludeTagIds ?? [],
      includeComponents: searchIncludeComponents ?? [],
      excludeComponents: searchExcludeComponents ?? [],
      page,
      sort,
    }).then(setSearchResults);
  }, [
    searchString,
    searchIncludeTagIds,
    searchExcludeTagIds,
    searchIncludeComponents,
    searchExcludeComponents,
    page,
    sort,
  ]);

  return (
    <>
      <Helmet>
        <title>
          {searchString
            ? `${searchString} - Fprints`
            : 'Search Factorio Blueprints - Fprints'}
        </title>
        <meta
          name="description"
          content={`Search Factorio blueprints ${searchString ? `for ${searchString}` : ''}.`}
        />
      </Helmet>
      {searchResults?.totalCount && searchResults?.totalCount > 0 && (
        <p className="mb-8 flex items-center gap-2 text-fern-400">
          <CheckIcon size={16} absoluteStrokeWidth />
          Found {searchResults.totalCount} blueprints
          {searchString && ` for "${searchString}"`}
        </p>
      )}
      {searchResults?.blueprints?.length === 0 && (
        <div className="flex min-h-96 flex-col items-center justify-center rounded-xl border border-steel-900 p-8 text-steel-500">
          No results found, try something else?
        </div>
      )}
      <Masonry columnsCount={columns} sequential gutter="16px">
        {searchResults?.blueprints?.map(b => (
          <BlueprintCard key={b.id} blueprint={b} />
        ))}
      </Masonry>
      {getPagination(searchResults?.totalCount ?? 1)}
      <Outlet />
    </>
  );
};
