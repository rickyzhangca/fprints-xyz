import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  TooltipProvider,
} from '@/ui/index.ts';
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { BugIcon } from 'lucide-react';
import { NuqsAdapter } from 'nuqs/adapters/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import App from './App.tsx';
import { BlueprintDialog, UserDialog } from './components/index.ts';
import {
  AllTab,
  CollectionTab,
  LikedTab,
  MyPrintsTab,
} from './components/tabs/index.ts';
import './index.css';
import { Lab, NewProfile, ResetPassword, Search } from './pages/index.ts';
import { StoreProvider } from './store/index.ts';

if (import.meta.env.DEV) {
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/react-scan/dist/auto.global.js';
  document.head.appendChild(script);
}

if (import.meta.env.PROD) {
  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://fprints-umami.haoyuzhangca2973.workers.dev/script.js';
  script.dataset.websiteId = '588a5cbe-e446-40dd-862b-eeca6f81f301';
  document.head.appendChild(script);
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      placeholderData: keepPreviousData,
    },
  },
});

const commonChildren = [
  {
    path: 'blueprint/:blueprintId',
    element: <BlueprintDialog />,
  },
  {
    path: 'user/:userId',
    element: <UserDialog />,
  },
];

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <AllTab />,
        children: commonChildren,
      },
      {
        path: 'liked',
        element: <LikedTab />,
        children: commonChildren,
      },
      {
        path: 'my-blueprints',
        element: <MyPrintsTab />,
        children: commonChildren,
      },
      {
        path: 'collection/:collectionId',
        element: <CollectionTab />,
        children: commonChildren,
      },
      {
        path: 'search',
        element: <Search />,
        children: commonChildren,
      },
    ],
  },
  {
    path: 'new-profile',
    element: <NewProfile />,
  },
  {
    path: 'reset-password',
    element: <ResetPassword />,
  },
  {
    path: 'lab',
    element: <Lab />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <Helmet>
            <title>Fprints | Factorio Blueprints</title>
            <meta
              name="description"
              content="Fprints - Share, discover, and search Factorio blueprints. Browse community blueprints for factories, layouts, and automation designs. Factory must grow!"
            />
            <meta
              name="keywords"
              content="factorio, blueprints, blueprint books, design, layout, automation, gaming, reddit"
            />
            <meta property="og:title" content="Fprints | Factorio Blueprints" />
            <meta
              property="og:description"
              content="Share, discover, and search Factorio blueprints from the community"
            />
            <meta
              property="og:image"
              content="https://fprints-asset.b-cdn.net/og/og.webp"
            />
            <meta property="og:url" content="https://fprints.xyz" />
            <link rel="canonical" href="https://fprints.xyz" />
          </Helmet>
          <NuqsAdapter>
            <TooltipProvider delayDuration={0} skipDelayDuration={0}>
              <RouterProvider router={router} />
              <Popover>
                <PopoverTrigger className="fixed bottom-4 right-4 rounded-full bg-white/20 p-3 text-steel-200 backdrop-blur-lg transition duration-75 hover:bg-white/30 hover:text-steel-50 active:bg-white/40 active:text-steel-50">
                  <BugIcon
                    className="size-5 shrink-0"
                    absoluteStrokeWidth
                    strokeWidth={1.5}
                  />
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  sideOffset={8}
                  className="flex max-w-[calc(100vw-4rem)] flex-col gap-3 p-5 text-steel-50 md:max-w-96"
                >
                  <p>
                    Thank you for trying out Fprints Beta! Please report any
                    issues on our{' '}
                    <a
                      href="https://github.com/rickyzhangca/fprints-xyz/issues"
                      target="_blank"
                      rel="noreferrer"
                      className="text-fern-400"
                    >
                      GitHub
                    </a>{' '}
                    or the{' '}
                    <a
                      href="https://www.reddit.com/r/factorio/comments/1h2lws8/fprints_beta_the_new_blueprint_site_is_live_at/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-fern-400"
                    >
                      Reddit
                    </a>{' '}
                    post.
                  </p>
                  <p className="text-sm text-steel-400">
                    All art assets and other Factorio game data used in this
                    project belong to Wube Software Ltd and are not for
                    redistribution.
                  </p>
                  <p className="text-sm text-steel-400">
                    Thanks to Wube for such a great game. Thanks to the Factorio
                    community for the feedbacks and suggestions.
                  </p>
                </PopoverContent>
              </Popover>
            </TooltipProvider>
          </NuqsAdapter>
        </HelmetProvider>
      </QueryClientProvider>
    </StoreProvider>
  </StrictMode>
);
