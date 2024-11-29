type ImagePreviewProps = {
  file?: File;
  url?: string;
};

export const ImagePreview = ({ file, url }: ImagePreviewProps) => {
  if (!url && !file)
    return (
      <div className="flex h-16 w-full items-center justify-center rounded-lg bg-steel-800 text-steel-300">
        Preview will show here
      </div>
    );

  if (file) {
    const objectUrl = URL.createObjectURL(file);
    return (
      <img
        src={objectUrl}
        alt="preview"
        className="max-h-80 w-full rounded-lg bg-steel-800 object-contain"
        onLoad={() => URL.revokeObjectURL(objectUrl)}
      />
    );
  }

  return (
    <img
      src={url}
      alt="preview"
      className="max-h-80 w-full rounded-lg bg-steel-800 object-contain"
    />
  );
};
