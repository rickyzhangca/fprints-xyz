import { github, google } from '@/assets';
import {
  useForgotPasswordWithEmail,
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

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const LoginContent = ({
  setIsForgot,
}: {
  setIsForgot: (isForgot: boolean) => void;
}) => {
  const [error, setError] = useState<string | null>(null);
  const logInWithGoogle = useLogInWithGoogle();
  const logInWithGithub = useLogInWithGithub();
  const logInWithEmail = useLogInWithEmail();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (logInWithEmail.isError) setError(logInWithEmail.error.message);
  }, [logInWithEmail.isError]);

  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    setError(null);
    logInWithEmail.mutate(values);
  };

  return (
    <>
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
      <div className="h-px w-full bg-steel-600" />
      <div className="flex flex-col gap-4 p-6 pt-4">
        <p className="text-center text-sm text-steel-400">
          Or if you have preferred the classic way
        </p>
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
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
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsForgot(true)}
                >
                  Forgot password
                </Button>
                <Button type="submit">Login</Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
      {error && (
        <div className="bg-red-500/10 p-4 text-center text-sm text-red-500">
          {error}
        </div>
      )}
    </>
  );
};

const ForgotPasswordContent = ({
  setIsForgot,
}: {
  setIsForgot: (isForgot: boolean) => void;
}) => {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const forgotPasswordWithEmail = useForgotPasswordWithEmail();

  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    if (forgotPasswordWithEmail.isError)
      setError(forgotPasswordWithEmail.error.message);
  }, [, forgotPasswordWithEmail.isError]);

  useEffect(() => {
    if (forgotPasswordWithEmail.isSuccess)
      setSuccess(forgotPasswordForm.getValues().email);
  }, [forgotPasswordWithEmail.isSuccess]);

  const onForgotPasswordSubmit = async (
    values: z.infer<typeof forgotPasswordSchema>
  ) => {
    setError(null);
    setSuccess(null);
    forgotPasswordWithEmail.mutate(values.email);
  };

  return (
    <>
      <DialogHeader className="flex flex-col gap-4 p-6">
        <DialogTitle>Forgot password</DialogTitle>
      </DialogHeader>
      <Form {...forgotPasswordForm}>
        <form
          onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)}
          className="flex flex-col gap-4 px-6 pb-6"
        >
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
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsForgot(false)}
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={forgotPasswordWithEmail.isPending}
              >
                Send reset link
              </Button>
            </div>
          </div>
        </form>
      </Form>
      {error && (
        <div className="bg-red-500/10 p-4 text-center text-sm text-red-500">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-fern-400/10 p-4 text-center text-sm text-fern-400">
          Password reset link sent to {success} (check spam!). Click the link in
          the email to reset your password.
        </div>
      )}
    </>
  );
};

export const AuthLogin = () => {
  const [isForgot, setIsForgot] = useState(false);

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost">Login</Button>
      </DialogTrigger>
      <DialogContent className="gap-0 p-0">
        {isForgot ? (
          <ForgotPasswordContent setIsForgot={setIsForgot} />
        ) : (
          <LoginContent setIsForgot={setIsForgot} />
        )}
      </DialogContent>
    </Dialog>
  );
};
