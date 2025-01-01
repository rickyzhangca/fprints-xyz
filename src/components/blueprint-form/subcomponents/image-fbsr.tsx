import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui';

import { ImagePreview } from '@/components/blueprint-form/subcomponents/image-preview';
import { usePostFBSR } from '@/hooks';
import { FormControl, FormField, FormItem } from '@/ui';
import { BlueprintUtils } from '@/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  ICreateBlueprintFormValues,
  useBlueprintFormStore,
} from '../BlueprintForm';
import { ImageBackground } from './image-background';

export const ImageFBSR = () => {
  const { mutate, isPending, isError, error, isSuccess, data } = usePostFBSR();

  const form = useFormContext<ICreateBlueprintFormValues>();
  const background = form.watch('background');
  const imageFile = form.watch('image_file');

  const setImageType = useBlueprintFormStore(state => state.setImageType);

  const blueprintData = useBlueprintFormStore(state => state.blueprintData);
  const type = useMemo(
    () => BlueprintUtils.Analysis.getBlueprintType(blueprintData),
    [blueprintData]
  );
  const blueprintList = useMemo(
    () => BlueprintUtils.Analysis.getFlatBlueprintList(blueprintData),
    [blueprintData]
  );

  const [selectedBlueprintString, setSelectedBlueprintString] = useState<
    string | null
  >(blueprintList.find(item => item.type === 'blueprint')?.value ?? null);

  const selectedBlueprintTitle = useMemo(
    () =>
      blueprintList.find(item => item.value === selectedBlueprintString)
        ?.label ?? null,
    [blueprintList, selectedBlueprintString]
  );

  const handleRender = useCallback(() => {
    if (!selectedBlueprintString) return;
    mutate(selectedBlueprintString);
  }, [selectedBlueprintString, mutate]);

  useEffect(() => {
    setSelectedBlueprintString(
      blueprintList.find(item => item.type === 'blueprint')?.value ?? null
    );
  }, [blueprintList]);

  useEffect(() => {
    if (isSuccess && data?.image) {
      try {
        // Convert base64 to blob
        const byteString = atob(data.image.split(',')[1]);
        const mimeString = data.image.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([ab], { type: mimeString });
        const file = new File([blob], 'blueprint-render.webp', {
          type: mimeString,
        });

        form.setValue('image_file', file);
        setImageType('fbsr');
      } catch (err) {
        console.error('Error processing image:', err);
      }
    }
  }, [isSuccess, data, form.setValue]);

  return (
    <FormField
      name="image_file"
      render={() => (
        <FormItem className="flex flex-col gap-4 space-y-0 rounded-lg bg-steel-800 p-4">
          {imageFile && <ImageBackground />}
          <ImagePreview
            background={background}
            file={imageFile}
            placeholder={
              !selectedBlueprintString
                ? blueprintList.length > 0
                  ? 'Only blueprints and blueprints in blueprint books are supported for now'
                  : 'Please paste a blueprint string first'
                : type !== 'blueprint'
                  ? 'Choose a blueprint in the book to render as the screenshot.'
                  : isError
                    ? `Something went wrong. Probably because FBSR is still being updated for 2.0, let's post a screenshot instead!${
                        error?.message ? `\nError: "${error?.message}"` : ''
                      }`
                    : isPending
                      ? 'Rendering... It may take seconds to a minute depending on the blueprint size, result will show here'
                      : 'Click to render. It may take seconds to a minute depending on the blueprint size, result will show here'
            }
          />
          {selectedBlueprintString && type === 'blueprint_book' && (
            <DropdownMenu>
              <DropdownMenuTrigger type="button">
                {selectedBlueprintTitle ?? 'Choose a blueprint'}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                {blueprintList.map(item => (
                  <DropdownMenuItem
                    key={item.path}
                    style={{ paddingLeft: item.depth * 16 + 8 }}
                    disabled={item.type !== 'blueprint'}
                    onSelect={() => setSelectedBlueprintString(item.value)}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <FormControl>
            <Button
              disabled={!selectedBlueprintString}
              loading={isPending}
              type="button"
              onClick={handleRender}
              data-umami-event="render-fbsr"
            >
              {isPending
                ? 'Rendering...'
                : isSuccess
                  ? 'Render again'
                  : 'Render'}
              <p className="ml-2 inline-flex w-fit -translate-y-px rounded bg-steel-950 px-1 py-0.5 text-xs font-bold text-fern-400">
                BETA
              </p>
            </Button>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
