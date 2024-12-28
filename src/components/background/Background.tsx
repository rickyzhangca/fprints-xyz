import { IBlueprint } from '@/supabase';

type BackgroundProps = {
  background: NonNullable<IBlueprint['background']>;
  imageWidth: number;
  previewWidth: number;
};

const planets = {
  'refined-concrete':
    'https://fprints-asset.b-cdn.net/background/refined-concrete.webp',
  foundation: 'https://fprints-asset.b-cdn.net/background/foundation.webp',
  nauvis: 'https://fprints-asset.b-cdn.net/background/dry-dirt.webp',
  vulcanus:
    'https://fprints-asset.b-cdn.net/background/volcanic-cracks-warm-v2.webp',
  fulgora: 'https://fprints-asset.b-cdn.net/background/fulgoran-sand.webp',
  gleba: 'https://fprints-asset.b-cdn.net/background/cracked-lichen-v2.webp',
  aquilo: 'https://fprints-asset.b-cdn.net/background/ice-smooth.webp',
  space: 'black',
  'space-nauvis': 'black',
  'space-vulcanus': 'black',
  'space-fulgora': 'black',
  'space-gleba': 'black',
  'space-aquilo': 'black',
};

const space = {
  'space-nauvis': 'https://fprints-asset.b-cdn.net/background/nauvis.webp',
  'space-vulcanus': 'https://fprints-asset.b-cdn.net/background/vulcanus.webp',
  'space-fulgora': 'https://fprints-asset.b-cdn.net/background/fulgora.webp',
  'space-gleba': 'https://fprints-asset.b-cdn.net/background/gleba.webp',
  'space-aquilo': 'https://fprints-asset.b-cdn.net/background/aquilo.webp',
};

export const Background = ({
  background,
  imageWidth,
  previewWidth,
}: BackgroundProps) => {
  const backgroundImage =
    background === 'minimal' || background === 'space' || background in space
      ? undefined
      : `url("${planets[background]}")`;

  const backgroundSize =
    previewWidth < imageWidth
      ? `${2560 * (previewWidth / imageWidth)}px`
      : '2560px';

  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-md"
      style={{
        backgroundColor:
          background === 'minimal'
            ? '#232323'
            : background === 'space'
              ? 'black'
              : background in space
                ? 'black'
                : undefined,
        backgroundImage,
        backgroundSize,
      }}
    >
      {background in space && (
        <img
          src={space[background as keyof typeof space]!}
          alt="background-planet"
          className="absolute -bottom-10 -left-10 max-w-[60%] opacity-90"
        />
      )}
    </div>
  );
};
