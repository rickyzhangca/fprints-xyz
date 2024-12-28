import { useGetLikesCount, useGetMyPrintsCount } from '@/hooks';
import { sortOptions, useBearStore } from '@/store';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/ui';
import { Grid2X2Icon, LayoutPanelLeftIcon, LockIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const MyLikes = () => {
  const { session } = useBearStore();
  const getLikesCount = useGetLikesCount();

  if (session)
    return (
      <Link to="/liked" className="h-full">
        <TabsTrigger value="liked" className="gap-2">
          Liked
          {!!getLikesCount.data && getLikesCount.data > 0 && (
            <p className="text-steel-500">{getLikesCount.data}</p>
          )}
        </TabsTrigger>
      </Link>
    );
  return (
    <TabsTrigger disabled value="liked">
      <LockIcon className="size-4" />
      Liked
    </TabsTrigger>
  );
};

const Collections = () => {
  const { collections } = useBearStore();
  console.log(collections);

  return (
    <>
      {collections?.map(c => (
        <Link
          key={c.id}
          id={c.id}
          to={`/collection/${c.id}`}
          className="h-full"
        >
          <TabsTrigger value={c.id} className="gap-2">
            {c.title}
            {!!c.blueprint_count &&
              c.blueprint_count.length > 0 &&
              c.blueprint_count[0].count > 0 && (
                <p className="text-steel-500">{c.blueprint_count[0].count}</p>
              )}
          </TabsTrigger>
        </Link>
      ))}
    </>
  );
};

const MyPrints = () => {
  const { session } = useBearStore();
  const getMyPrintsCount = useGetMyPrintsCount();
  if (session)
    return (
      <Link to="/my-blueprints" className="h-full">
        <TabsTrigger value="my-blueprints" className="gap-2">
          My prints
          {!!getMyPrintsCount.data && getMyPrintsCount.data > 0 && (
            <p className="text-steel-500">{getMyPrintsCount.data}</p>
          )}
        </TabsTrigger>
      </Link>
    );
  return (
    <TabsTrigger disabled value="my-blueprints">
      <LockIcon className="size-4" />
      My prints
    </TabsTrigger>
  );
};

export const Nav = () => {
  const location = useLocation();
  const sort = useBearStore(state => state.sort);
  const view = useBearStore(state => state.view);
  const setSort = useBearStore(state => state.setSort);
  const setView = useBearStore(state => state.setView);

  const getTabValue = () => {
    if (location.pathname === '/') return 'all';
    if (location.pathname.startsWith('/liked')) return 'liked';
    if (location.pathname.startsWith('/my-blueprints')) return 'my-blueprints';
    if (location.pathname.startsWith('/collection/')) {
      return location.pathname.split('/')[2];
    }
    return '';
  };

  return (
    <Tabs value={getTabValue()} className="mb-3">
      <TabsList className="mb-3">
        <div className="flex h-full flex-1 items-center justify-between gap-2">
          <div className="flex h-full items-center">
            <Link to="/" className="h-full">
              <TabsTrigger value="all">All blueprints</TabsTrigger>
            </Link>
            <MyLikes />
            <Collections />
            <MyPrints />
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="shrink-0 text-sm"
              onClick={() => setView(view === 'modern' ? 'classic' : 'modern')}
              data-umami-event={
                view === 'modern'
                  ? 'toggle-view-to-classic'
                  : 'toggle-view-to-modern'
              }
            >
              {view === 'modern' ? (
                <LayoutPanelLeftIcon size={16} />
              ) : (
                <Grid2X2Icon size={16} />
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger variant="ghost" className="shrink-0 text-sm">
                {sort}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={0}>
                {sortOptions.map(option => (
                  <DropdownMenuItem
                    key={option}
                    onSelect={() => setSort(option)}
                    data-umami-event={`sort-by-${option}`}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </TabsList>
    </Tabs>
  );
};
