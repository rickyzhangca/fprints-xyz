import { tw } from '@/utils';
import { FileCheckIcon, ImageUpIcon } from 'lucide-react';
import React, { ChangeEvent, useState } from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

export const Uploader = ({
  value,
  onChange,
}: ControllerRenderProps<FieldValues, 'image_file'>) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUploadClick = () => {
    inputRef.current?.click();
  };

  const updateImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      onChange(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      onChange(file);
    }
  };

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onChange(undefined);
  };

  return (
    <div
      className={tw(
        'relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-transparent bg-steel-800 p-6 text-steel-300 outline-none transition-all duration-100 placeholder:text-steel-950/30 hover:bg-steel-700',
        isDragging && 'border-fern-400 bg-steel-700'
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleFileDrop}
      onClick={handleImageUploadClick}
    >
      {value ? (
        <FileCheckIcon size={32} absoluteStrokeWidth />
      ) : (
        <ImageUpIcon size={32} absoluteStrokeWidth />
      )}
      {value ? (
        <div className="text-center">
          {value.name}
          <button
            type="button"
            className="ml-2 inline items-center font-medium text-fern-400 hover:text-fern-500"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="text-center">Choose or drop an image (max 10MB)</div>
      )}
      <input
        ref={inputRef}
        type="file"
        onChange={updateImage}
        accept="image/*"
        className={tw(
          'file:text-foreground hidden h-[42px] w-full rounded-lg border-0 bg-steel-200 px-3 text-steel-950 outline-none transition-colors duration-100 placeholder:text-steel-950/30 focus:bg-steel-100'
        )}
      />
    </div>
  );
};

Uploader.displayName = 'Uploader';
