import {
  useAddBlueprintToCollection,
  useRemoveBlueprintFromCollection,
} from '@/hooks';
import { useBearStore } from '@/store';
import type { IBlueprintDetails } from '@/supabase';
import { Button } from '@/ui';
import { useQueryClient } from '@tanstack/react-query';
import { FolderCheckIcon, FolderPlusIcon } from 'lucide-react';
import { useState } from 'react';

export const CollectButton = ({
  blueprint,
}: {
  blueprint: IBlueprintDetails;
}) => {
  const session = useBearStore(state => state.session);
  const addBlueprintToCollection = useAddBlueprintToCollection();
  const removeBlueprintFromCollection = useRemoveBlueprintFromCollection();
  const collections = useBearStore(state => state.collections);
  const queryClient = useQueryClient();
  const [newlyCollected, setNewlyCollected] = useState(false);
  const [newlyUncollected, setNewlyUncollected] = useState(false);

  if (!blueprint.id || !collections?.[0]) return;

  if (!session)
    return (
      <Button
        variant="secondary"
        disabled
        leftIcon={
          <FolderPlusIcon
            className="size-4 shrink-0"
            absoluteStrokeWidth
            strokeWidth={2.5}
          />
        }
      >
        Collect
      </Button>
    );

  if (
    (blueprint.collected_by_current_user && !newlyUncollected) ||
    newlyCollected
  ) {
    return (
      <Button
        data-umami-event="uncollected"
        variant="collected"
        onClick={() => {
          removeBlueprintFromCollection.mutate(
            {
              blueprintId: blueprint.id!,
              collectionId: collections[0].id,
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: ['get-blueprints-by-collection', collections[0].id],
                });
                queryClient.invalidateQueries({
                  queryKey: ['get-my-collections'],
                });
                setNewlyCollected(false);
                setNewlyUncollected(true);
              },
            }
          );
        }}
      >
        <FolderCheckIcon
          className="size-4 shrink-0"
          absoluteStrokeWidth
          strokeWidth={2.5}
        />
      </Button>
    );
  }
  return (
    <Button
      data-umami-event="collected"
      variant="collect"
      leftIcon={
        <FolderPlusIcon
          className="size-4 shrink-0"
          absoluteStrokeWidth
          strokeWidth={2.5}
        />
      }
      onClick={() => {
        addBlueprintToCollection.mutate(
          {
            blueprintId: blueprint.id!,
            collectionId: collections[0].id,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ['get-blueprints-by-collection', collections[0].id],
              });
              queryClient.invalidateQueries({
                queryKey: ['get-my-collections'],
              });
              setNewlyCollected(true);
              setNewlyUncollected(false);
            },
          }
        );
      }}
    >
      Collect
    </Button>
  );
};
