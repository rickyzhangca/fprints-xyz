import { Uploader } from '@/ui';

import { ImagePreview } from '@/components/blueprint-form/subcomponents/image-preview';
import { FormControl, FormField, FormItem } from '@/ui';
import { useFormContext } from 'react-hook-form';
import {
  ICreateBlueprintFormValues,
  useBlueprintFormStore,
} from '../BlueprintForm';

export const ImageFile = () => {
  const form = useFormContext<ICreateBlueprintFormValues>();
  const imageFile = form.watch('image_file');
  const background = form.watch('background');

  const imageType = useBlueprintFormStore(state => state.imageType);
  const setImageType = useBlueprintFormStore(state => state.setImageType);

  return (
    <FormField
      name="image_file"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Uploader
              {...field}
              value={imageType === 'file' ? imageFile : undefined}
              onChange={file => {
                form.setValue('image_file', file);
                setImageType('file');
              }}
            />
          </FormControl>
          <ImagePreview file={imageFile} background={background} />
        </FormItem>
      )}
    />
  );
};
