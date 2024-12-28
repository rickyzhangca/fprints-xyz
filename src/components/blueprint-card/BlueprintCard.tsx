import { ProfilePic } from '@/components/profile-pic';
import { useBearStore } from '@/store/states';
import type { IBlueprintCard } from '@/supabase';
import { Tag } from '@/ui';
import { tw } from '@/utils';
import { useMeasure } from '@uidotdev/usehooks';
import { ImageOffIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Background } from '../background';
import { LikeButton } from '../like-button';
import { Badges } from './subcomponents/badges';

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
  const [previewRef, { width: previewWidth }] = useMeasure();

  return (
    <div className="mb-3 flex w-full flex-col gap-3">
      <Link
        to={`${useAbsoluteUrl ? '/' : ''}blueprint/${blueprint.id}${window.location.search}`}
      >
        <div className="relative w-full cursor-pointer overflow-hidden rounded-lg outline outline-white/5 transition-all duration-100 hover:outline-white/50">
          {blueprint.image_url ? (
            <div className="relative bg-[#232323]">
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
                src={blueprint.image_url}
                alt="blueprint"
                className={tw(
                  // #232323 seems to be factorio's background color for blueprints
                  'relative w-full object-contain',
                  view === 'modern' ? 'max-h-96' : 'h-[280px]'
                )}
              />
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center bg-steel-800 text-steel-400">
              <ImageOffIcon size={24} />
            </div>
          )}
          <Badges blueprint={blueprint} />
        </div>
      </Link>
      <div
        className={tw(
          'flex flex-col gap-2 px-4',
          view === 'classic' && 'px-2.5'
        )}
      >
        <div className={tw(view === 'classic' && 'h-10')}>
          <Link
            to={`/blueprint/${blueprint.id}`}
            className={tw(
              'text-sm text-steel-50',
              view === 'classic' && 'line-clamp-2'
            )}
          >
            {blueprint.title}
          </Link>
        </div>
        <div className="flex w-full items-center justify-between gap-4 text-sm text-steel-400">
          <div className="flex min-w-0 grow items-center gap-1.5">
            <Link to={`/user/${blueprint.user_id}`}>
              <ProfilePic
                size="sm"
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
