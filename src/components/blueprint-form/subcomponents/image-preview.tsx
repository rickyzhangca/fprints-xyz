import { Background } from '@/components';
import { IBlueprint } from '@/supabase';
import { getImageWidthFromFile, getImageWidthFromUrl } from '@/utils';
import { useMeasure } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';

type ImagePreviewProps = {
  file?: File;
  url?: string;
  placeholder?: string;
  background?: IBlueprint['background'];
};

export const ImagePreview = ({
  file,
  url,
  placeholder,
  background,
}: ImagePreviewProps) => {
  const [imageFileWidth, setImageFileWidth] = useState<number>();
  const [previewRef, { width: previewWidth }] = useMeasure();

  useEffect(() => {
    if (file)
      getImageWidthFromFile(file).then(width => setImageFileWidth(width));
    else if (url)
      getImageWidthFromUrl(url).then(width => setImageFileWidth(width));
  }, [file, url]);

  if ((!url && !file) || (url && !url.startsWith('https://')))
    return (
      <div className="flex h-16 w-full items-center justify-center rounded-lg bg-steel-800 text-center text-steel-300">
        {placeholder || 'Preview will show here'}
      </div>
    );

  if (file) {
    const objectUrl = URL.createObjectURL(file);
    return (
      <div className="relative w-full rounded-lg object-contain">
        {background && imageFileWidth && previewWidth && (
          <Background
            background={background}
            imageWidth={imageFileWidth}
            previewWidth={previewWidth}
          />
        )}
        <img
          ref={previewRef}
          src={objectUrl}
          alt="preview"
          className="relative"
          onLoad={() => URL.revokeObjectURL(objectUrl)}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-lg object-contain">
      {background && imageFileWidth && previewWidth && (
        <Background
          background={background}
          imageWidth={imageFileWidth}
          previewWidth={previewWidth}
        />
      )}
      <img ref={previewRef} src={url} alt="preview" className="relative" />
    </div>
  );
};
