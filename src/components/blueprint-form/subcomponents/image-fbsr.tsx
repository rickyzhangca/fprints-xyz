import { Button } from '@/ui';

import { ImagePreview } from '@/components/blueprint-form/subcomponents/image-preview';
import { usePostFBSR } from '@/hooks';
import { FormControl, FormField, FormItem } from '@/ui';
import { BlueprintUtils } from '@/utils';
import { useCallback, useEffect, useMemo } from 'react';
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
  const blueprintString = form.watch('blueprint_string');
  const imageFile = form.watch('image_file');

  const setImageType = useBlueprintFormStore(state => state.setImageType);

  const blueprintData = useBlueprintFormStore(state => state.blueprintData);
  const type = useMemo(
    () => BlueprintUtils.Analysis.getBlueprintType(blueprintData),
    [blueprintData]
  );

  const handleRender = useCallback(() => {
    if (!blueprintString) return;
    mutate(blueprintString);
  }, [blueprintString, mutate]);

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
              !blueprintString
                ? 'Please paste a blueprint string first'
                : type !== 'blueprint'
                  ? 'Only available for valid single blueprint right now. Support for blueprint books coming soon.'
                  : isError
                    ? `Something went wrong. Probably because FBSR is still being updated for 2.0, let's post a screenshot instead!${
                        error?.message ? `\nError: "${error?.message}"` : ''
                      }`
                    : isPending
                      ? 'Rendering... It may take seconds to a minute depending on the blueprint size, result will show here'
                      : 'Click to render. It may take seconds to a minute depending on the blueprint size, result will show here'
            }
          />
          <FormControl>
            <Button
              disabled={!blueprintString || type !== 'blueprint'}
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
