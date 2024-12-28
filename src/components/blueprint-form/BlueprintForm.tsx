import { BlueprintString } from '@/components/blueprint-form/subcomponents/blueprint-string';
import { Description } from '@/components/blueprint-form/subcomponents/description';
import { IsPrivate } from '@/components/blueprint-form/subcomponents/is-private';
import { Tags } from '@/components/blueprint-form/subcomponents/tags';
import { Title } from '@/components/blueprint-form/subcomponents/title';
import {
  useBunnyUpload,
  useCreateBlueprint,
  useUpdateBlueprint,
} from '@/hooks';
import { IBlueprint, IBlueprintDetails } from '@/supabase';
import { Button, DialogFooter, Form } from '@/ui';
import {
  BlueprintUtils,
  getImageWidthFromFile,
  getImageWidthFromUrl,
  IBlueprintWrapper,
} from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { create } from 'zustand';
import { Image } from './subcomponents/image';
import { Remix } from './subcomponents/remix';

const blueprintFormSchema = z
  .object({
    title: z.string().min(1, {
      message: 'Please provide a title for your blueprint.',
    }),
    blueprint_string: z.string().min(1, {
      message: 'Oh no, you forgot the blueprint string!',
    }),
    description: z.string().optional(),
    tag_ids: z.array(z.string()).min(1, {
      message: 'Please select at least one tag.',
    }),
    image_file: z.instanceof(File).optional(),
    image_url: z.string().url().optional(),
    background: z.custom<IBlueprint['background']>().optional(),
    is_public: z.boolean(),
    remixed_from_url: z.string().url().optional().or(z.literal('')),
    remixed_from_title: z.string().optional(),
  })
  .refine(data => !!data.image_file || !!data.image_url, {
    message: 'Please provide either an image file or image URL',
    path: ['image_file'],
  });

export type ICreateBlueprintFormValues = z.infer<typeof blueprintFormSchema>;
export type ICreateBlueprintFormInitialValues = ICreateBlueprintFormValues & {
  id?: string;
};

type CreateBlueprintFormProps = {
  mode: 'create' | 'edit';
  onSuccess: (id: string, updatedBlueprint?: IBlueprintDetails) => void;
  onCancel?: () => void;
  initialValues: ICreateBlueprintFormInitialValues;
};

/**
 * for form data, use useFormContext instead
 */
export const useBlueprintFormStore = create<{
  blueprintData: IBlueprintWrapper;
  setBlueprintData: (blueprintData: IBlueprintWrapper) => void;
  imageType: 'file' | 'url' | 'fbsr';
  setImageType: (imageType: 'file' | 'url' | 'fbsr') => void;
}>(set => ({
  blueprintData: {},
  setBlueprintData: (blueprintData: IBlueprintWrapper) =>
    set({ blueprintData }),
  imageType: 'file',
  setImageType: (imageType: 'file' | 'url' | 'fbsr') => set({ imageType }),
}));

export const BlueprintForm = ({
  mode,
  onSuccess,
  onCancel,
  initialValues,
}: CreateBlueprintFormProps) => {
  const createBlueprint = useCreateBlueprint();
  const updateBlueprint = useUpdateBlueprint();
  const queryClient = useQueryClient();
  const bunnyUpload = useBunnyUpload();

  const blueprintData = useBlueprintFormStore(state => state.blueprintData);
  const setBlueprintData = useBlueprintFormStore(
    state => state.setBlueprintData
  );

  const form = useForm<ICreateBlueprintFormValues>({
    resolver: zodResolver(blueprintFormSchema),
    defaultValues: initialValues,
  });

  useEffect(() => form.reset(initialValues), [initialValues]);

  const setImageType = useBlueprintFormStore(state => state.setImageType);
  useEffect(() => {
    if (initialValues.image_file) {
      setImageType('file');
    } else if (initialValues.image_url) {
      setImageType('url');
    }
  }, []);

  const isPending =
    bunnyUpload.isPending ||
    createBlueprint.isPending ||
    updateBlueprint.isPending;

  const onSubmit = async (values: ICreateBlueprintFormValues) => {
    let url = '';
    if (values.image_url) {
      const u = values.image_url.match(/imgur\.com\/([a-zA-Z0-9]+)/)?.[1];
      if (u) {
        url = `https://i.imgur.com/${u}.webp`;
      } else {
        url = values.image_url;
      }
    } else if (values.image_file) {
      const { url: uploadedUrl } = await bunnyUpload.mutateAsync(
        values.image_file
      );
      url = uploadedUrl;
    }

    if (!url) {
      form.setError('image_file', {
        message: 'Please provide a valid image URL or file',
      });
      return;
    }

    if (mode === 'create') {
      createBlueprint.mutate(
        {
          blueprintProps: {
            title: values.title,
            description: values.description,
            blueprint_string: values.blueprint_string,
            image_url: url,
            type:
              BlueprintUtils.Analysis.getBlueprintType(blueprintData) ||
              'blueprint',
            game_version: BlueprintUtils.Analysis.getGameVersion(
              'patch',
              blueprintData
            ),
            components: BlueprintUtils.Analysis.getComponents(blueprintData),
            is_public: values.is_public,
            image_original_width: values.image_file
              ? await getImageWidthFromFile(values.image_file)
              : await getImageWidthFromUrl(url),
            remixed_from_url: values.remixed_from_url || null,
            remixed_from_title: values.remixed_from_title || null,
            background: values.background || 'minimal',
          },
          tags: values.tag_ids,
        },
        {
          onSuccess: data => {
            void queryClient.invalidateQueries({
              queryKey: ['get-my-blueprints'],
            });
            void queryClient.invalidateQueries({
              queryKey: ['get-all-blueprints'],
            });
            form.reset();
            onSuccess(data.id);
          },
        }
      );
    } else if (mode === 'edit') {
      updateBlueprint.mutate(
        {
          blueprintId: initialValues.id!,
          blueprintProps: {
            title: values.title,
            description: values.description,
            blueprint_string: values.blueprint_string,
            image_url: url,
            type:
              BlueprintUtils.Analysis.getBlueprintType(blueprintData) ||
              'blueprint',
            game_version: BlueprintUtils.Analysis.getGameVersion(
              'patch',
              blueprintData
            ),
            components: BlueprintUtils.Analysis.getComponents(blueprintData),
            is_public: values.is_public,
            image_original_width: values.image_file
              ? await getImageWidthFromFile(values.image_file)
              : await getImageWidthFromUrl(url),
            remixed_from_url: values.remixed_from_url || null,
            remixed_from_title: values.remixed_from_title || null,
            background: values.background || 'minimal',
          },
          tags: values.tag_ids,
        },
        {
          onSuccess: data => {
            form.reset();
            onSuccess(data.id);
          },
        }
      );
    }
  };

  useEffect(() => {
    if (form.getValues('title')) return;
    const type = BlueprintUtils.Analysis.getBlueprintType(blueprintData);
    const label =
      type === 'blueprint'
        ? blueprintData.blueprint?.label
        : type === 'blueprint_book'
          ? blueprintData.blueprint_book?.label
          : type === 'deconstruction_planner'
            ? blueprintData.deconstruction_planner?.label
            : '';
    if (label)
      form.setValue('title', BlueprintUtils.Analysis.cleanUpLabel(label).label);
  }, [blueprintData]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <BlueprintString
          form={form}
          blueprintData={blueprintData}
          setBlueprintData={setBlueprintData}
        />
        <div className="flex flex-col gap-4">
          <Image />
          <Title />
          <Description />
          <Tags form={form} blueprintData={blueprintData} />
          <Remix form={form} />
          <IsPrivate />
        </div>
        <DialogFooter>
          {mode === 'edit' && (
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button
            data-umami-event={
              mode === 'create' ? 'create-blueprint' : 'edit-blueprint'
            }
            type="submit"
            disabled={isPending}
          >
            {mode === 'create'
              ? isPending
                ? 'Creating...'
                : 'Create'
              : isPending
                ? 'Saving...'
                : 'Save'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
