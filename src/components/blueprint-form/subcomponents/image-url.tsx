import { Input } from '@/ui';

import { ImagePreview } from '@/components/blueprint-form/subcomponents/image-preview';
import { FormControl, FormField, FormItem } from '@/ui';
import { getImgurSrcUrl } from '@/utils';
import { useFormContext } from 'react-hook-form';
import {
  ICreateBlueprintFormValues,
  useBlueprintFormStore,
} from '../BlueprintForm';
import { ImageBackground } from './image-background';

export const ImageURL = () => {
  const form = useFormContext<ICreateBlueprintFormValues>();
  const imageURL = form.watch('image_url');

  const setImageType = useBlueprintFormStore(state => state.setImageType);
  const background = form.watch('background');

  return (
    <FormField
      name="image_url"
      render={() => (
        <FormItem>
          <FormControl>
            <Input
              placeholder="Enter URL, e.g. https://imgur.com/1cs8dc"
              value={imageURL}
              onChange={e => {
                form.setValue('image_url', getImgurSrcUrl(e.target.value));
                setImageType('url');
              }}
            />
          </FormControl>
          <div className="flex flex-col gap-4 space-y-0 rounded-lg bg-steel-800 p-4">
            {imageURL && <ImageBackground />}
            <ImagePreview url={imageURL} background={background} />
          </div>
        </FormItem>
      )}
    />
  );
};
