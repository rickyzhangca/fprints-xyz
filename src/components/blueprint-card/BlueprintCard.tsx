import { crashSite } from '@/assets';
import { ProfilePic } from '@/components/profile-pic';
import { useBearStore } from '@/store/states';
import type { IBlueprintCard } from '@/supabase';
import { Tag, Tooltip, TooltipContent, TooltipTrigger } from '@/ui';
import { tw } from '@/utils';
import { BookIcon, ImageOffIcon, LockIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LikeButton } from '../like-button';

type BlueprintCardProps = {
  useAbsoluteUrl?: boolean;
  blueprint: IBlueprintCard;
};

export const BlueprintCard = ({
  useAbsoluteUrl,
  blueprint,
}: BlueprintCardProps) => {
  if (!blueprint.id) return;
  const view = useBearStore(state => state.view);

  return (
    <div className="mb-3 flex w-full flex-col gap-3">
      <Link
        to={`${useAbsoluteUrl ? '/' : ''}blueprint/${blueprint.id}${window.location.search}`}
      >
        <div className="relative w-full cursor-pointer overflow-hidden rounded-lg outline outline-white/5 transition-all duration-100 hover:outline-white/50">
          {blueprint.image_url ? (
            <img
              src={blueprint.image_url}
              alt="blueprint"
              className={tw(
                'w-full bg-white/5 object-contain',
                view === 'modern' ? 'max-h-96' : 'h-64'
              )}
            />
          ) : (
            <div className="flex h-64 items-center justify-center bg-steel-800 text-steel-400">
              <ImageOffIcon size={24} />
            </div>
          )}
          <div className="absolute bottom-1.5 right-1.5 z-10 flex items-center gap-1">
            {blueprint.meta?.includes('first-100') && (
              <Tooltip>
                <TooltipTrigger className="rounded bg-amber-400 p-1 text-steel-950">
                  <img src={crashSite} alt="crash-site" className="size-4" />
                </TooltipTrigger>
                <TooltipContent>
                  Was at the crash site
                  <p className="text-steel-400">
                    The first 100 blueprints shared in Fprints
                  </p>
                </TooltipContent>
              </Tooltip>
            )}
            {blueprint.type === 'blueprint_book' && (
              <div className="rounded bg-sky-600 p-1 text-steel-50">
                <BookIcon size={16} />
              </div>
            )}
            {!blueprint.is_public && (
              <div className="rounded bg-steel-200 p-1 text-steel-950">
                <LockIcon size={16} />
              </div>
            )}
          </div>
        </div>
      </Link>
      <div
        className={tw(
          'flex flex-col gap-2 px-4',
          view === 'classic' && 'px-2.5'
        )}
      >
        <div className="h-10">
          <Link
            to={`/blueprint/${blueprint.id}`}
            className={tw(
              'text-steel-50',
              view === 'classic' && 'line-clamp-2 text-sm'
            )}
          >
            {blueprint.title}
          </Link>
        </div>
        <div className="flex w-full items-center justify-between gap-4 text-sm text-steel-400">
          <div className="flex min-w-0 grow items-center gap-1.5">
            <Link to={`/user/${blueprint.user_id}`}>
              <ProfilePic
                color={blueprint.user_color}
                name={blueprint.user_handle}
              />
            </Link>
            {blueprint.main_tag_name && (
              <Link
                to={`/search?it=${blueprint.main_tag_id}`}
                className="min-w-0 hover:text-steel-50"
              >
                <Tag>{blueprint.main_tag_name}</Tag>
              </Link>
            )}
          </div>
          <LikeButton variant="ghost" blueprint={blueprint} />
        </div>
      </div>
    </div>
  );
};
