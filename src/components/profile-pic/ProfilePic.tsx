import { IBlueprintCard } from '@/supabase';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui';
import { getForeground, tw } from '@/utils';

export const ProfilePic = ({
  size,
  color,
  name,
}: {
  size?: 'sm' | 'md' | 'lg';
  color?: IBlueprintCard['user_color'];
  name?: IBlueprintCard['user_handle'];
}) => {
  return (
    <Avatar
      className={tw(
        'size-7',
        size === 'lg' && 'size-10',
        size === 'sm' && 'size-5'
      )}
      style={{
        backgroundColor: color ?? '#1D86C7',
        color: getForeground(color ?? '#fff'),
      }}
    >
      <AvatarImage src="placeholder" />
      <AvatarFallback className={tw(size === 'lg' && 'text-xl')}>
        {name ? name.slice(0, 1).toUpperCase() : 'F'}
      </AvatarFallback>
    </Avatar>
  );
};
