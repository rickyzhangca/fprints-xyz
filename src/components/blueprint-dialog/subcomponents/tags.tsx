import type { IBlueprintDetails } from '@/supabase';
import { Tag } from '@/ui';
import { Link } from 'react-router-dom';

export const Tags = ({ tags }: { tags: IBlueprintDetails['tags'] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags?.map((tag: any) => (
        <Link to={`/search?it=${tag!.id}`} key={tag.id}>
          <Tag>{tag.name}</Tag>
        </Link>
      ))}
    </div>
  );
};
