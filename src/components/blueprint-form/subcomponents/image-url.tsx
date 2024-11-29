import { Input } from '@/ui';

import { ICreateBlueprintFormValues } from '@/components/blueprint-form/BlueprintForm';
import { ImagePreview } from '@/components/blueprint-form/subcomponents/image-preview';
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui';
import { getImgurSrcUrl } from '@/utils';
import { ImageUpIcon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

export const ImageURL = ({
  form,
  setImageType,
}: {
  form: UseFormReturn<ICreateBlueprintFormValues>;
  setImageType: (type: 'url' | 'file') => void;
}) => {
  return (
    <FormField
      name="image_url"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between gap-2">
            <FormLabel>Screenshot</FormLabel>
            <Button
              type="button"
              variant="link"
              leftIcon={
                <ImageUpIcon className="size-4 shrink-0" absoluteStrokeWidth />
              }
              onClick={() => {
                form.setValue('image_url', '');
                setImageType('file');
              }}
            >
              Use file upload
            </Button>
          </div>
          <FormControl>
            <Input
              placeholder="Enter URL, e.g. https://imgur.com/1cs8dc"
              value={field.value}
              onChange={e => {
                form.setValue('image_url', getImgurSrcUrl(e.target.value));
              }}
            />
          </FormControl>
          <FormMessage />
          <ImagePreview url={field.value} />
        </FormItem>
      )}
    />
  );
};
