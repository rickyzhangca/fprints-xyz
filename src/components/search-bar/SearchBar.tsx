import { enter } from '@/assets';
import {
  ExcludeComponentsFilter,
  ExcludeTagsFilter,
  IncludeComponentsFilter,
  IncludeTagsFilter,
  IQuickFilterOptions,
  QuickFilters,
} from '@/components/search-bar/subcomponents';
import { useGetTags } from '@/hooks';
import { useBearStore } from '@/store';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Popover,
  PopoverContent,
} from '@/ui';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { ListFilterIcon, SearchIcon, SparkleIcon } from 'lucide-react';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
  const showAdvancedFilters = useBearStore(state => state.showAdvancedFilters);
  const setShowAdvancedFilters = useBearStore(
    state => state.setShowAdvancedFilters
  );
  const getTags = useGetTags(true);

  // previous search
  const [searchString] = useQueryState('string');
  const [searchQuickFilter] = useQueryState('qf', parseAsString);
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

  // current search
  const [string, setString] = useState(searchString ?? '');
  const [quickFilterValue, setQuickFilterValue] = useState(
    searchQuickFilter ?? ''
  );
  const [includeTagIds, setIncludeTagIds] = useState<string[]>(
    searchIncludeTagIds ?? []
  );
  const [excludeTagIds, setExcludeTagIds] = useState<string[]>(
    searchExcludeTagIds ?? []
  );
  const [includeComponents, setIncludeComponents] = useState<string[]>(
    searchIncludeComponents ?? []
  );
  const [excludeComponents, setExcludeComponents] = useState<string[]>(
    searchExcludeComponents ?? []
  );

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSearch = async () => {
    const queryParams = new URLSearchParams();
    queryParams.set('string', string);
    queryParams.set('qf', quickFilterValue);
    queryParams.set('it', includeTagIds.join(','));
    queryParams.set('et', excludeTagIds.join(','));
    queryParams.set('ic', includeComponents.join(','));
    queryParams.set('ec', excludeComponents.join(','));
    navigate(`/search?${queryParams.toString()}&page=1`);
    setOpen(false);
  };

  const filters = (
    <div className="flex flex-col gap-3 xl:grid xl:grid-cols-2">
      <IncludeTagsFilter
        tags={includeTagIds}
        setTags={value => {
          setIncludeTagIds(value);
          setQuickFilterValue('');
        }}
      />
      <ExcludeTagsFilter
        tags={excludeTagIds}
        setTags={value => {
          setExcludeTagIds(value);
          setQuickFilterValue('');
        }}
      />
      <IncludeComponentsFilter
        components={includeComponents}
        setComponents={value => {
          setIncludeComponents(value);
          setQuickFilterValue('');
        }}
      />
      <ExcludeComponentsFilter
        components={excludeComponents}
        setComponents={value => {
          setExcludeComponents(value);
          setQuickFilterValue('');
        }}
      />
    </div>
  );

  const quickFilterOptions: IQuickFilterOptions = {
    noSpaceAge: {
      children: (
        <img
          src="https://fprints-asset.b-cdn.net/ui/no-space-age.webp"
          className="size-8"
          alt="no-space-age"
        />
      ),
      tooltip: 'Filter out blueprints that require Space Age items',
      action: () => {
        setIncludeTagIds([]);
        setExcludeTagIds(
          getTags.data
            ?.filter(tag => tag.tag_group === 'Space Age')
            .map(tag => tag.id) ?? []
        );
        setIncludeComponents([]);
        setExcludeComponents([]);
      },
    },
    noBeacon: {
      children: (
        <img
          src="https://fprints-asset.b-cdn.net/ui/no-beacon.webp"
          className="size-8"
          alt="no-beacon"
        />
      ),
      tooltip: 'Filter out blueprints that require a beacon',
      action: () => {
        setIncludeTagIds([]);
        setExcludeTagIds([]);
        setIncludeComponents([]);
        setExcludeComponents(['beacon']);
      },
    },
    noElevatedRails: {
      children: (
        <img
          src="https://fprints-asset.b-cdn.net/ui/no-elevated-rails.webp"
          className="size-8"
          alt="no-elevated-rails"
        />
      ),
      tooltip: 'Filter out blueprints that require elevated rails',
      action: () => {
        setIncludeTagIds([]);
        setExcludeTagIds([]);
        setIncludeComponents([]);
        setExcludeComponents([
          'elevated-curved-rail-a',
          'elevated-curved-rail-b',
          'elevated-curved-rail',
          'elevated-rail',
          'elevated-half-diagonal-rail',
        ]);
      },
    },
    spacePlatform: {
      children: (
        <img
          src="https://fprints-asset.b-cdn.net/ui/space-platform.webp"
          className="size-8"
          alt="space-platform"
        />
      ),
      tooltip: 'Only space platform blueprints',
      action: () => {
        setIncludeTagIds([]);
        setExcludeTagIds([]);
        setIncludeComponents(['space-platform-foundation']);
        setExcludeComponents([]);
      },
    },
  };

  return (
    <Popover modal={false} open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full overflow-hidden rounded-lg">
        <Input
          type="text"
          value={string}
          placeholder="Search..."
          leftIcon={<SearchIcon size={16} absoluteStrokeWidth />}
          containerClassName="flex-1"
          className="rounded-none bg-steel-300 pr-0 placeholder:text-steel-500 hover:bg-steel-200 focus:bg-steel-200 active:bg-steel-300"
          onChange={e => setString(e.target.value)}
          onClick={e => {
            e.stopPropagation();
            setOpen(true);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
      </PopoverTrigger>
      <PopoverContent
        className="relative flex w-[calc(var(--radix-popover-content-available-width)_-_2rem)] flex-col gap-2 rounded-xl bg-steel-950 p-0 sm:w-[--radix-popover-trigger-width]"
        onOpenAutoFocus={e => e.preventDefault()}
      >
        <div className="flex flex-col gap-4 px-4 pt-4">
          <p className="inline-flex items-center gap-1.5 text-sm text-steel-300">
            <SparkleIcon className="size-4 text-steel-400" />
            Quick filters
          </p>
          <QuickFilters
            value={quickFilterValue}
            onChange={value => {
              if (value && quickFilterOptions[value])
                quickFilterOptions[value].action();
              setQuickFilterValue(value);
            }}
            options={quickFilterOptions}
          />
        </div>
        <Accordion
          type="single"
          collapsible
          defaultValue={showAdvancedFilters ? 'advanced-filters' : ''}
          onValueChange={value => {
            if (value === 'advanced-filters') setShowAdvancedFilters(true);
            else setShowAdvancedFilters(false);
          }}
        >
          <AccordionItem value="advanced-filters">
            <AccordionTrigger className="rounded-none">
              <p className="inline-flex items-center gap-1.5 text-sm text-steel-300">
                <ListFilterIcon className="size-4 text-steel-400" />
                Advanced filters
                {(includeTagIds.length > 0 ||
                  excludeTagIds.length > 0 ||
                  includeComponents.length > 0 ||
                  excludeComponents.length > 0) && (
                  <button
                    className="text-sm text-fern-400"
                    onClick={e => {
                      e.stopPropagation();
                      setIncludeTagIds([]);
                      setExcludeTagIds([]);
                      setIncludeComponents([]);
                      setExcludeComponents([]);
                    }}
                  >
                    Clear all
                  </button>
                )}
              </p>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              {filters}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mx-4 mb-4">
          <Button
            disabled={
              !string &&
              includeTagIds.length === 0 &&
              excludeTagIds.length === 0 &&
              includeComponents.length === 0 &&
              excludeComponents.length === 0
            }
            className="w-full"
            rightIcon={
              <div className="flex shrink-0 items-center justify-center gap-1 rounded-md bg-steel-950 px-2 py-1 text-xs text-fern-400">
                <img src={enter} className="w-4" />
                Enter
              </div>
            }
            onClick={handleSearch}
          >
            Search {string}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
