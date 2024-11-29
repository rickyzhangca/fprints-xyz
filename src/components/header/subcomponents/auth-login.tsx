import { github, google } from '@/assets';
import {
  useLogInWithEmail,
  useLogInWithGithub,
  useLogInWithGoogle,
} from '@/hooks';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const AuthLogin = () => {
  const logInWithGoogle = useLogInWithGoogle();
  const logInWithGithub = useLogInWithGithub();
  const logInWithEmail = useLogInWithEmail();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setError(null);
    logInWithEmail.mutate(values);
  };

  useEffect(() => {
    if (logInWithEmail.isError) {
      setError(logInWithEmail.error.message);
    }
  }, [logInWithEmail.isError]);

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost">Login</Button>
      </DialogTrigger>
      <DialogContent className="gap-0 p-0">
        <div className="flex flex-col gap-4 p-6">
          <DialogHeader>
            <DialogTitle>Welcome back, engineer</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Button
              className="h-12 gap-3 bg-black/50 text-white hover:bg-black/40 active:bg-black/50"
              leftIcon={
                <img
                  src={google}
                  alt="google"
                  className="size-6 rounded-full bg-white"
                />
              }
              onClick={() => logInWithGoogle.mutate()}
            >
              Login with Google
            </Button>
            <Button
              className="h-12 gap-3 bg-white/80 hover:bg-white/90 active:bg-white/80"
              leftIcon={<img src={github} alt="github" className="size-5" />}
              onClick={() => logInWithGithub.mutate()}
            >
              Login with GitHub
            </Button>
          </div>
        </div>
        {/* hide email login while waiting for aws */}
        {false && (
          <>
            <div className="h-px w-full bg-steel-600" />
            <div className="flex flex-col gap-4 p-6 pt-4">
              <p className="text-center text-sm text-steel-400">
                Or if you have preferred the classic way
              </p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-4">
                    <FormField
                      name="email"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="engineer@factorio.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />
                    <FormField
                      name="password"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Shhhh..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />
                    <div className="flex justify-between gap-2">
                      <Button type="button" variant="ghost">
                        Forgot password
                      </Button>
                      <Button type="submit">Login</Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </>
        )}
        {error && (
          <div className="bg-red-500/10 p-4 text-center text-sm text-red-500">
            {error}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
