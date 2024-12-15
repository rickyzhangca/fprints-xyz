import { useCreateProfile, useGetProfile } from '@/hooks';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';

const schema = z.object({
  handle: z.string().min(1, {
    message: 'Please provide a handle for your profile.',
  }),
});

export const NewProfile = () => {
  const [urlParams] = useSearchParams();
  const blueprintId = urlParams.get('blueprint_id');

  const getProfile = useGetProfile();
  const createProfile = useCreateProfile();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      handle: '',
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    createProfile.mutate(values.handle, {
      onError: (error: unknown) => {
        if (
          error instanceof Error &&
          error.message === 'Handle already exists'
        ) {
          form.setError('handle', {
            type: 'manual',
            message:
              'Ahh this handle is already taken. Please choose another one.',
          });
        }
      },
    });
  };

  useEffect(() => {
    if (getProfile.data || createProfile.isSuccess) {
      navigate(blueprintId ? `/blueprint/${blueprintId}` : '/');
    }
  }, [getProfile.data, createProfile.isSuccess, navigate]);

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete your profile</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="handle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Handle</FormLabel>
                  <FormControl>
                    <Input placeholder="factory_must_grow" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Done</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
