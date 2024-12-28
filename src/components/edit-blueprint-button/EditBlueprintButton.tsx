import { BlueprintForm } from '@/components/blueprint-form';
import { IBlueprintDetails, ITag } from '@/supabase';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui';
import { PencilIcon } from 'lucide-react';
import { useMemo } from 'react';

type EditBlueprintButtonProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blueprintData: IBlueprintDetails;
};

export const EditBlueprintButton = ({
  open,
  onOpenChange,
  blueprintData,
}: EditBlueprintButtonProps) => {
  const initialValues = useMemo(
    () => ({
      id: blueprintData.id ?? '',
      title: blueprintData.title ?? '',
      blueprint_string: blueprintData.blueprint_string ?? '',
      tag_ids: blueprintData.tags?.map(tag => (tag as ITag).id) ?? [],
      image_url: blueprintData.image_url ?? '',
      description: blueprintData.description ?? '',
      is_public: blueprintData.is_public ?? true,
      remixed_from_url: blueprintData.remixed_from_url ?? '',
      remixed_from_title: blueprintData.remixed_from_title ?? '',
      background: blueprintData.background ?? 'minimal',
    }),
    [blueprintData]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className="w-full">
        <Button
          leftIcon={<PencilIcon size={16} />}
          variant="secondary"
          className="w-full"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit blueprint</DialogTitle>
        </DialogHeader>
        <BlueprintForm
          mode="edit"
          initialValues={initialValues}
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
