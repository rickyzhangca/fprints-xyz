import { ICreateBlueprintFormInitialValues } from '@/components/blueprint-form';
import { usePostGetFactorioSchoolData } from '@/hooks/factorio-school';
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
import { getImgurSrcUrlFromId } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { InfoIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type ImportFormFactorioSchoolProps = {
  onSuccess: (blueprintFormValues: ICreateBlueprintFormInitialValues) => void;
};

const schema = z.object({
  url: z
    .string()
    .url()
    .startsWith('https://www.factorio.school/view/', {
      message: 'URL must start with https://www.factorio.school/view/...',
    })
    .min(1, {
      message: 'Please provide a URL to the blueprint.',
    }),
});

const factorioSchoolSchema = z.object({
  version: z.object({
    number: z.number(),
    // no need
    systemFrom: z.any().optional(),
    systemTo: z.any().optional(),
    createdOn: z.any().optional(),
    createdBy: z.any().optional(),
    lastUpdatedBy: z.any().optional(),
  }),
  title: z.string(),
  blueprintString: z.object({
    sha: z.string(),
    blueprintString: z.string(),
    // no need
    createdOn: z.any().optional(),
    createdBy: z.any().optional(),
  }),
  imgurImage: z.object({
    imgurId: z.string(),
    imgurType: z.string(),
    // no need
    height: z.any().optional(),
    width: z.any().optional(),
    systemFrom: z.any().optional(),
    systemTo: z.any().optional(),
  }),
  descriptionMarkdown: z.string(),
  tags: z
    .array(
      z.object({
        tagCategory: z.string(),
        tagName: z.string(),
        tag: z.object({
          category: z.string(),
          name: z.string(),
          ordinal: z.number(),
          // no need
          systemFrom: z.any().optional(),
          systemTo: z.any().optional(),
        }),
        // no need
        systemFrom: z.any().optional(),
        systemTo: z.any().optional(),
      })
    )
    .optional(),
  // no need
  systemFrom: z.any().optional(),
  systemTo: z.any().optional(),
  key: z.any().optional(),
  voteSummary: z.any().optional(),
});

export const ImportFormFactorioSchool = ({
  onSuccess,
}: ImportFormFactorioSchoolProps) => {
  const postGetFactorioSchoolData = usePostGetFactorioSchoolData();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      url: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const data = await postGetFactorioSchoolData.mutateAsync(
      values.url.split('/').pop()!
    );
    if (!data) return;

    const validatedData = factorioSchoolSchema.safeParse(data);
    if (!validatedData.success) return;

    form.reset();

    onSuccess({
      blueprint_string: validatedData.data.blueprintString.blueprintString,
      tag_ids: [],
      title: validatedData.data.title,
      description: validatedData.data.descriptionMarkdown,
      image_url: getImgurSrcUrlFromId(validatedData.data.imgurImage.imgurId),
      is_public: true,
      remixed_from_url: values.url,
      remixed_from_title: validatedData.data.title,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 rounded-md bg-sky-200 px-3 py-2 text-sm text-sky-700">
            <InfoIcon size={16} className="shrink-0" />
            Full credits to Factorio School API with respect. Fprints provides
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
                    placeholder="E.g. https://www.factorio.school/view/1234567890"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button data-umami-event="import-factorio-school" type="submit">
              Import
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
