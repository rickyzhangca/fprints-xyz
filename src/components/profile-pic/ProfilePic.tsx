import { IBlueprintCard } from '@/supabase';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui';
import { getForeground } from '@/utils';

export const ProfilePic = ({
  color,
  name,
}: {
  color?: IBlueprintCard['user_color'];
  name?: IBlueprintCard['user_handle'];
}) => {
  return (
    <Avatar
      style={{
        backgroundColor: color ?? '#1D86C7',
        color: getForeground(color ?? '#fff'),
      }}
    >
      <AvatarImage src="placeholder" />
      <AvatarFallback>
        {name ? name.slice(0, 1).toUpperCase() : 'F'}
      </AvatarFallback>
    </Avatar>
  );
};
