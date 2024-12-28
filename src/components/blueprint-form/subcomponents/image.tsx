import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui';

import { useBlueprintFormStore } from '@/components/blueprint-form/BlueprintForm';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui';
import { ImageFBSR } from './image-fbsr';
import { ImageFile } from './image-file';
import { ImageURL } from './image-url';

type ImageType = 'file' | 'url' | 'fbsr';

export const Image = () => {
  const imageType = useBlueprintFormStore(state => state.imageType);
  const setImageType = useBlueprintFormStore(state => state.setImageType);

  return (
    <FormField
      name="image_file"
      render={() => (
        <FormItem>
          <FormLabel>Screenshot</FormLabel>
          <FormControl>
            <Tabs
              value={imageType}
              onValueChange={value => setImageType(value as ImageType)}
            >
              <TabsList className="mb-2 h-12 rounded-lg bg-steel-800 p-1">
                <TabsTrigger className="flex-1 rounded-md" value="file">
                  Image file
                </TabsTrigger>
                <TabsTrigger className="flex-1 rounded-md" value="url">
                  Image URL
                </TabsTrigger>
                <TabsTrigger className="flex-1 rounded-md" value="fbsr">
                  Render for me
                </TabsTrigger>
              </TabsList>
              <TabsContent value="file">
                <ImageFile />
              </TabsContent>
              <TabsContent value="url">
                <ImageURL />
              </TabsContent>
              <TabsContent value="fbsr">
                <ImageFBSR />
              </TabsContent>
            </Tabs>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
