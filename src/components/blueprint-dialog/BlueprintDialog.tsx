import { Background, BlueprintGlance, EditBlueprintButton } from '@/components';
import {
  By,
  Collected,
  Controls,
  Created,
  GameVersion,
  Helmet,
  Tags,
  Updated,
} from '@/components/blueprint-dialog/subcomponents';
import {
  useDeleteBlueprint,
  useGetBlueprint,
  useParseBlueprintString,
  useRPCCopy,
} from '@/hooks';
import { useBearStore } from '@/store';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui';
import { tw } from '@/utils';
import { useMeasure } from '@uidotdev/usehooks';
import { Link2Icon, RadiationIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Comments } from './subcomponents/comments';
import { Copied } from './subcomponents/copied';
import { Description } from './subcomponents/description';
import { Remix } from './subcomponents/remix';

export const BlueprintDialog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const session = useBearStore(state => state.session);
  const { blueprintId } = useParams();
  const { data: blueprint, isSuccess } = useGetBlueprint(blueprintId ?? '');
  const parseBlueprintString = useParseBlueprintString();
  const [isEditing, setIsEditing] = useState(false);
  const deleteBlueprint = useDeleteBlueprint();
  const rpcCopy = useRPCCopy();
  const [previewRef, { width: previewWidth }] = useMeasure();

  useEffect(() => {
    if (blueprint?.blueprint_string && !parseBlueprintString.data) {
      parseBlueprintString.mutate(blueprint.blueprint_string);
    }
  }, [blueprint?.id]);

  const handleDelete = async () => {
    if (!blueprintId) return;
    try {
      await deleteBlueprint.mutateAsync({
        blueprintId,
        blueprintImageUrl: blueprint?.image_url ?? '',
      });
      handleClose();
    } catch (error) {
      console.error('Error deleting blueprint:', error);
    }
  };

  const handleClose = () => {
    const parentPath = location.pathname.split('/blueprint/')[0];
    navigate({
      pathname: parentPath || '/',
      search: location.search,
    });
  };

  if (isSuccess && !blueprint) {
    navigate('/');
    return null;
  }

  if (!blueprint || !blueprintId) return null;

  return (
    <Dialog
      open={!!blueprintId}
      onOpenChange={open => {
        if (!open) {
          handleClose();
        }
      }}
    >
      <Helmet blueprint={blueprint} />
      <DialogContent
        className={tw(
          'flex h-dvh max-h-dvh w-screen max-w-[1920px] flex-col gap-0 overflow-hidden rounded-none bg-steel-950 p-0 shadow-2xl sm:h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] sm:w-[calc(100vw-2rem)] sm:rounded-xl md:h-[calc(100dvh-6rem)] md:rounded-3xl xl:w-[calc(100vw-8rem)] 2xl:w-[calc(100vw-12rem)] 3xl:w-[calc(100vw-16rem)]',
          isEditing && 'hidden'
        )}
        aria-labelledby="blueprint-title"
      >
        {/* gives `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users regardless */}
        <DialogTitle id="blueprint-title" className="sr-only">
          {blueprint.title}
        </DialogTitle>
        <div className="flex h-full flex-col overflow-auto scrollbar scrollbar-track-steel-900 scrollbar-thumb-steel-500 md:flex-row md:overflow-hidden">
          <div className="relative flex h-[50vh] w-full items-center justify-center bg-gray-950 md:h-full">
            <button
              onClick={handleClose}
              className="absolute left-2 top-2 flex items-center gap-2 rounded-2xl bg-black/50 p-3 pr-4 text-steel-300 transition-colors duration-75 hover:bg-black/60 hover:text-steel-50"
            >
              <XIcon
                className="size-7 shrink-0"
                absoluteStrokeWidth
                strokeWidth={1.5}
              />
              <div className="text-sm font-bold">ESC</div>
            </button>
            {blueprint.background &&
              blueprint.image_original_width &&
              previewWidth && (
                <Background
                  background={blueprint.background}
                  imageWidth={blueprint.image_original_width}
                  previewWidth={previewWidth}
                />
              )}
            <img
              ref={previewRef}
              src={blueprint.image_url ?? ''}
              alt={`Blueprint preview: ${blueprint.title}`}
              className="relative max-h-full max-w-full object-contain"
              loading="eager"
            />
          </div>
          <article className="flex min-w-[320px] flex-col md:min-w-[360px] md:max-w-[50%] lg:max-w-[40%] xl:min-w-[480px]">
            <div className="flex flex-1 flex-col items-start gap-6 overflow-hidden p-6 scrollbar scrollbar-track-steel-950 scrollbar-thumb-steel-500 md:overflow-auto lg:px-8 lg:pt-8">
              <h2 className="group relative text-2xl font-bold text-steel-50 2xl:text-2xl">
                {blueprint.title}
                <button
                  className="absolute -left-7 top-0 hidden p-1.5 text-steel-300 transition-colors duration-75 group-hover:block hover:text-steel-50 active:text-steel-300 lg:-left-8"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://fprints.xyz/blueprint/${blueprintId}`
                    );
                  }}
                >
                  <Link2Icon
                    className="size-5"
                    absoluteStrokeWidth
                    strokeWidth={1.5}
                  />
                </button>
              </h2>
              <div className="prose prose-invert w-full max-w-full">
                {blueprint.description && (
                  <Description description={blueprint.description} />
                )}
              </div>
              {parseBlueprintString.data && (
                <section
                  className="flex w-full flex-col gap-2"
                  aria-label="Components"
                >
                  <h2 className="font-medium text-steel-300">Components</h2>
                  <BlueprintGlance
                    blueprintData={parseBlueprintString.data}
                    onCopy={() =>
                      rpcCopy.mutate({ blueprintId: blueprint.id ?? '' })
                    }
                  />
                </section>
              )}
              {parseBlueprintString.isPending && (
                <div className="flex w-full items-center justify-center px-2 py-4 text-steel-500">
                  Loading...
                </div>
              )}
              {blueprint.remixed_from_url && (
                <section
                  className="flex w-full flex-col gap-2"
                  aria-label="Blueprint remixed from"
                >
                  <h2 className="font-medium text-steel-300">Remixed from</h2>
                  <Remix
                    title={blueprint.remixed_from_title}
                    url={blueprint.remixed_from_url}
                  />
                </section>
              )}
              <section
                className="flex flex-col gap-2"
                aria-label="Blueprint tags"
              >
                <h2 className="font-medium text-steel-300">Tags</h2>
                <Tags tags={blueprint.tags} />
              </section>
              {blueprint.user_id === session?.user?.id && (
                <div className="flex w-full items-center gap-2">
                  <EditBlueprintButton
                    open={isEditing}
                    onOpenChange={setIsEditing}
                    blueprintData={blueprint}
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger variant="headless">
                      <Button
                        variant="secondary"
                        onClick={() => setIsEditing(true)}
                      >
                        <RadiationIcon
                          size={16}
                          absoluteStrokeWidth
                          strokeWidth={1.5}
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-steel-900">
                      <DropdownMenuItem
                        className="text-red-500 focus:bg-red-500 focus:text-steel-950"
                        onSelect={handleDelete}
                        data-umami-event="delete-blueprint"
                      >
                        <RadiationIcon
                          size={16}
                          absoluteStrokeWidth
                          strokeWidth={1.5}
                        />
                        Confirm delete this blueprint
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
              <footer className="flex flex-col items-start gap-1">
                <GameVersion game_version={blueprint.game_version} />
                <Created created_at={blueprint.created_at} />
                {blueprint.updated_at !== blueprint.created_at && (
                  <Updated updated_at={blueprint.updated_at} />
                )}
                <Collected collection_count={blueprint.collection_count} />
                <Copied copy_count={blueprint.copy_count} />
                <By
                  user_handle={blueprint.user_handle}
                  user_id={blueprint.user_id}
                />
              </footer>
              <Comments blueprintId={blueprintId} />
            </div>
            <div className="hidden lg:block">
              <Controls blueprint={blueprint} />
            </div>
          </article>
        </div>
        <div className="block lg:hidden">
          <Controls blueprint={blueprint} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
