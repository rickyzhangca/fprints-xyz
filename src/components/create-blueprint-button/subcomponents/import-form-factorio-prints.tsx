import { ICreateBlueprintFormInitialValues } from '@/components';
import { usePostGetFactorioPrintsData } from '@/hooks';
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
import { getImgurSrcUrl } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { InfoIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type ImportFormFactorioPrintsProps = {
  onSuccess: (blueprintFormValues: ICreateBlueprintFormInitialValues) => void;
};

const schema = z.object({
  url: z
    .string()
    .url()
    .startsWith('https://factorioprints.com/view/', {
      message: 'URL must start with https://factorioprints.com/view/...',
    })
    .min(1, {
      message: 'Please provide a URL to the blueprint.',
    }),
});

const factorioPrintsSchema = z.object({
  author: z.object({
    userId: z.string().min(1),
  }),
  authorId: z.string().min(1),
  blueprintString: z.string().min(1),
  createdDate: z.number().int().positive(),
  descriptionMarkdown: z.string(),
  image: z.object({
    id: z.string().min(1),
    type: z.string().refine(val => val === 'image/png', {
      message: 'Image type must be image/png',
    }),
  }),
  imageUrl: z.string().url().startsWith('https://imgur.com/'),
  lastUpdatedDate: z.number().int().positive(),
  numberOfFavorites: z.number().int().min(0),
  tags: z.array(z.string().startsWith('/')),
  title: z.string().min(1),
});

export const ImportFormFactorioPrints = ({
  onSuccess,
}: ImportFormFactorioPrintsProps) => {
  const postGetFactorioPrintsData = usePostGetFactorioPrintsData();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      url: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const data = await postGetFactorioPrintsData.mutateAsync(values.url);
    if (!data) return;

    const validatedData = factorioPrintsSchema.parse(data);
    form.reset();
    onSuccess({
      blueprint_string: validatedData.blueprintString,
      tag_ids: [],
      title: validatedData.title,
      description: validatedData.descriptionMarkdown,
      image_url: getImgurSrcUrl(validatedData.imageUrl),
      is_public: true,
      remixed_from_url: values.url,
      remixed_from_title: validatedData.title,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 rounded-md bg-sky-200 px-3 py-2 text-sm text-sky-700">
            <InfoIcon size={16} className="shrink-0" />
            Full credits to Factorio Prints API with respect. Fprints provides
            an equivalent API to allow importing from Fprints too!
          </div>
          <FormField
            name="url"
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paste URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="E.g. https://factorioprints.com/blueprint/1234567890"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button data-umami-event="import-factorio-prints" type="submit">
              Import
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
