import { fav } from '@/assets';
import { tw } from '@/utils';
import { ExternalLinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type RemixProps = {
  title: string | null;
  url: string;
};

export const Remix = ({ title, url }: RemixProps) => {
  const isFprints = url.includes('fprints.xyz');

  return (
    <Link
      className={tw(
        'flex items-center justify-between gap-4 rounded-lg bg-steel-800 px-4 py-3 text-steel-50 transition-colors duration-75 hover:bg-steel-700',
        isFprints && 'justify-start px-4 py-2'
      )}
      to={url}
      target="_blank"
    >
      {isFprints && (
        <img src={fav} alt="Fprints logo" className="size-5 shrink-0" />
      )}
      <div className="flex flex-col gap-0.5">
        <p className="line-clamp-1 overflow-hidden text-ellipsis break-all text-sm text-steel-400">
          {url}
        </p>
        {title && <p>{title}</p>}
      </div>
      {!isFprints && (
        <ExternalLinkIcon className="size-4 shrink-0 text-steel-400" />
      )}
    </Link>
  );
};
