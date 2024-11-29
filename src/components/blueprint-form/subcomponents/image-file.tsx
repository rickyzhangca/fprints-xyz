import { Uploader } from '@/ui';

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
import { Link2Icon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

export const ImageFile = ({
  form,
  setImageType,
}: {
  form: UseFormReturn<ICreateBlueprintFormValues>;
  setImageType: (type: 'url' | 'file') => void;
}) => {
  return (
    <FormField
      name="image_file"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between gap-2">
            <FormLabel>Screenshot</FormLabel>
            <Button
              type="button"
              variant="link"
              leftIcon={
                <Link2Icon className="size-4 shrink-0" absoluteStrokeWidth />
              }
              onClick={() => {
                form.setValue('image_file', undefined);
                setImageType('url');
              }}
            >
              Use URL
            </Button>
          </div>
          <FormControl>
            <Uploader {...field} />
          </FormControl>
          <FormMessage />
          <ImagePreview file={field.value} />
        </FormItem>
      )}
    />
  );
};
