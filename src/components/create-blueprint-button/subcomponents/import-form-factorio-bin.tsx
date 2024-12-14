import { ICreateBlueprintFormInitialValues } from '@/components/blueprint-form';
import {
  usePostGetFactorioBinData,
  usePostGetFactorioBinString,
  usePostGetImage,
} from '@/hooks';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { InfoIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type ImportFormFactorioBinProps = {
  onSuccess: (blueprintFormValues: ICreateBlueprintFormInitialValues) => void;
};

const schema = z.object({
  url: z
    .string()
    .url()
    .startsWith('https://factoriobin.com/post', {
      message: 'URL must start with https://factoriobin.com/post/...',
    })
    .min(1, {
      message: 'Please provide a URL to the blueprint.',
    }),
});

export const ImportFormFactorioBin = ({
  onSuccess,
}: ImportFormFactorioBinProps) => {
  const getFactorioBinData = usePostGetFactorioBinData();
  const getFactorioBinString = usePostGetFactorioBinString();
  const postGetImage = usePostGetImage();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      url: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const data = await getFactorioBinData.mutateAsync(values.url);
    const string = await getFactorioBinString.mutateAsync(values.url);
    form.reset();

    if (data.node.type === 'blueprint-book') {
      onSuccess({
        blueprint_string: string,
        tag_ids: [],
        title: data.post.title,
        description: data.node.description ?? '',
        is_public: true,
        remixed_from_url: values.url,
        remixed_from_title: data.post.title,
      });
    } else {
      onSuccess({
        blueprint_string: string,
        tag_ids: [],
        title: data.node.name,
        description: data.node.description ?? '',
        image_file: await postGetImage.mutateAsync(data.node.renderImageUrl),
        is_public: true,
        remixed_from_url: values.url,
        remixed_from_title: data.node.name,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 rounded-md bg-sky-200 px-3 py-2 text-sm text-sky-700">
            <InfoIcon size={16} className="shrink-0" />
            Full credits to FactorioBin API with respect. Fprints provides an
            equivalent API to allow importing from Fprints too!
          </div>
          <FormField
            name="url"
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paste URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="E.g. https://factoriobin.com/post/123456"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button data-umami-event="import-factorio-bin" type="submit">
              Import
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
