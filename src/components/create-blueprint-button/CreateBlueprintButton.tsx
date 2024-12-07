import {
  BlueprintForm,
  ICreateBlueprintFormInitialValues,
} from '@/components/blueprint-form/BlueprintForm';
import {
  CreateButton,
  ImportButton,
  ImportFormFactorioBin,
  ImportFormFactorioPrints,
} from '@/components/create-blueprint-button/subcomponents';
import { ImportFormFactorioSchool } from '@/components/create-blueprint-button/subcomponents/import-form-factorio-school';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/ui';
import { tw } from '@/utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type FormType =
  | 'create'
  | 'import-factorio-prints'
  | 'import-factorio-school'
  | 'import-factorio-bin';

type CreateBlueprintButtonProps = {
  label?: string;
};

export const CreateBlueprintButton = ({
  label,
}: CreateBlueprintButtonProps) => {
  const [formType, setFormType] = useState<FormType | null>(null);
  const [initialBlueprintFormValues, setInitialBlueprintFormValues] =
    useState<ICreateBlueprintFormInitialValues>({
      title: '',
      blueprint_string: '',
      tag_ids: [],
      image_file: undefined,
      description: '',
      is_public: true,
    });
  const navigate = useNavigate();

  useEffect(() => {
    if (formType) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [formType]);

  return (
    <div className="flex">
      <CreateButton label={label} onSubmit={() => setFormType('create')} />
      <ImportButton onSubmit={setFormType} />
      {/* overlay has a bug of not restoring scrolling after dialog closed */}
      {/* so doing it manually */}
      {!!formType && (
        <div className="fixed inset-0 z-40 h-dvh w-screen bg-black/10 backdrop-blur-sm duration-200 animate-in fade-in-0" />
      )}
      <Dialog open={!!formType} onOpenChange={() => setFormType(null)}>
        <DialogContent className={tw(formType === 'create' && 'max-w-2xl')}>
          <DialogHeader>
            <DialogTitle>
              {formType === 'import-factorio-prints'
                ? 'Import from Factorio Prints'
                : formType === 'import-factorio-bin'
                  ? 'Import from Factorio Bin'
                  : formType === 'import-factorio-school'
                    ? 'Import from Factorio School'
                    : 'Create blueprint'}
            </DialogTitle>
          </DialogHeader>
          {formType === 'create' && (
            <BlueprintForm
              mode="create"
              onSuccess={blueprintId => {
                setFormType(null);
                navigate(`/my-blueprints/blueprint/${blueprintId}`);
              }}
              initialValues={initialBlueprintFormValues}
            />
          )}
          {formType === 'import-factorio-prints' && (
            <ImportFormFactorioPrints
              onSuccess={values => {
                setInitialBlueprintFormValues(values);
                setFormType('create');
              }}
            />
          )}
          {formType === 'import-factorio-bin' && (
            <ImportFormFactorioBin
              onSuccess={values => {
                setInitialBlueprintFormValues(values);
                setFormType('create');
              }}
            />
          )}
          {formType === 'import-factorio-school' && (
            <ImportFormFactorioSchool
              onSuccess={values => {
                setInitialBlueprintFormValues(values);
                setFormType('create');
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
