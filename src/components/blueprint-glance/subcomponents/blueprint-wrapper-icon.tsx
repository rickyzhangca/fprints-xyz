import { useCdnStore } from '@/store';
import { BlueprintUtils, IBlueprintWrapper, iconSchema, tw } from '@/utils';

export const BlueprintWrapperIcon = ({ data }: { data: IBlueprintWrapper }) => {
  const getCdnUrl = useCdnStore(state => state.getCdnUrl);

  const type = BlueprintUtils.Analysis.getBlueprintType(data) || 'blueprint';

  const baseUrl = getCdnUrl(type.replace('_', '-'));
  if (!baseUrl) return null;

  const parseIcons = iconSchema
    .array()
    .safeParse(
      type === 'blueprint'
        ? data.blueprint?.icons
        : type === 'blueprint_book'
          ? data.blueprint_book?.icons
          : data[type]?.settings?.icons
    );

  if (!parseIcons.success || parseIcons.data?.length === 0)
    return <img src={baseUrl} alt={type} className="size-10" />;

  const signals = parseIcons.data
    .sort((i1, i2) => i1.index - i2.index)
    .map(icon => icon.signal.name);

  return (
    <div className="relative size-10">
      {signals.length === 1 && (
        <img
          src={getCdnUrl(signals[0]) ?? ''}
          alt={signals[0]}
          className={tw(
            'absolute inset-1 z-10 size-8',
            type === 'blueprint_book' && 'left-[11px] top-[7px] size-5'
          )}
        />
      )}
      {signals.length > 1 && (
        <div
          className={tw(
            'absolute inset-1 z-10 grid grid-cols-2',
            type === 'blueprint_book' && 'inset-2 left-2.5 top-1'
          )}
        >
          {signals.map((signal, i) => (
            <img
              key={`${signal}-${i}`}
              src={getCdnUrl(signal) ?? ''}
              alt={signal}
              className={tw('size-4', type === 'blueprint_book' && 'size-3')}
            />
          ))}
        </div>
      )}
      <img src={baseUrl} alt={type} className="absolute size-full" />
    </div>
  );
};
