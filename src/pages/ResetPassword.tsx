import { useGetProfile, useResetPassword } from '@/hooks';
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
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const schema = z.object({
  password: z.string().min(1, {
    message: 'Please provide a password.',
  }),
});

export const ResetPassword = () => {
  const getProfile = useGetProfile();
  const resetPassword = useResetPassword();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    resetPassword.mutate(values.password, {
      onError: () => {
        form.setError('password', {
          type: 'manual',
          message:
            'Something went wrong. Please try again or raise an issue at github.com/rickyzhangca/fprints/issues.',
        });
      },
    });
  };

  useEffect(() => {
    if (getProfile.data) {
      navigate('/');
    }
  }, [getProfile.data, navigate]);

  useEffect(() => {
    if (resetPassword.isSuccess) {
      navigate('/');
    }
  }, [resetPassword.isSuccess, navigate]);

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set your new password</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Shhhh..." {...field} />
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
