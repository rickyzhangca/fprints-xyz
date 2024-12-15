import { useCreateComment } from '@/hooks';
import { useBearStore } from '@/store';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Textarea,
} from '@/ui';
import { tw } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const commentFormSchema = z.object({
  comment: z.string().min(1, {
    message: 'Hmm the comment is empty.',
  }),
});

type ICommentFormValues = z.infer<typeof commentFormSchema>;

type CommentTextareaProps = {
  onCancel?: () => void;
  onSuccess?: () => void;
  initialIsExpanded?: boolean;
  parentCommentId?: string;
  blueprintId: string;
};

export const CommentTextarea = ({
  initialIsExpanded = false,
  parentCommentId,
  blueprintId,
  onCancel,
  onSuccess,
}: CommentTextareaProps) => {
  const [isExpanded, setIsExpanded] = useState(initialIsExpanded);
  const createComment = useCreateComment();
  const user = useBearStore(state => state.user);
  const setShowSignUpDialog = useBearStore(state => state.setShowSignUpDialog);
  const setBlueprintIdForSignUpDialog = useBearStore(
    state => state.setBlueprintIdForSignUpDialog
  );

  const form = useForm<ICommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      comment: '',
    },
  });

  const onSubmit = (values: ICommentFormValues) => {
    if (!user) return;

    createComment.mutate({
      blueprint_id: blueprintId,
      content: values.comment,
      is_deleted: false,
      is_hidden: false,
      parent_comment_id: parentCommentId,
      user_id: user.id,
    });
  };

  useEffect(() => {
    if (createComment.isSuccess) {
      setIsExpanded(false);
      onSuccess?.();
    } else if (createComment.isError) {
      form.setError('comment', {
        message: 'Failed to create comment',
      });
    }
  }, [createComment]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          name="comment"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem className="w-full">
              <div
                className={tw(
                  'overflow-hidden rounded-lg bg-steel-200 transition-colors duration-100 focus-within:bg-steel-100',
                  !isExpanded && 'bg-steel-300'
                )}
              >
                <FormControl>
                  {isExpanded && (
                    <Textarea
                      autoFocus
                      className="min-h-16 border-none bg-transparent text-steel-950 focus:bg-transparent"
                      placeholder="Add a comment"
                      {...field}
                      onFocus={e =>
                        e.target.scrollIntoView({ behavior: 'smooth' })
                      }
                    />
                  )}
                </FormControl>
                <div
                  className={tw(
                    'flex gap-2 p-2',
                    isExpanded && 'justify-end',
                    !isExpanded && 'px-3'
                  )}
                >
                  {isExpanded ? (
                    <>
                      <Button
                        onClick={() => {
                          setIsExpanded(false);
                          onCancel?.();
                        }}
                        data-umami-event="comment-cancel"
                        type="button"
                        variant="ghost"
                        className="text-steel-950 hover:bg-steel-950/10"
                      >
                        Cancel
                      </Button>
                      <Button data-umami-event="comment-submit" type="submit">
                        Comment
                      </Button>
                    </>
                  ) : (
                    <p
                      onClick={() => {
                        if (user) {
                          setIsExpanded(true);
                        } else {
                          setBlueprintIdForSignUpDialog(blueprintId);
                          setShowSignUpDialog(true);
                        }
                      }}
                      className="w-full cursor-text text-left text-steel-600 transition-colors duration-100 hover:text-steel-950"
                    >
                      Add a comment
                    </p>
                  )}
                </div>
              </div>
              <FormMessage>
                {form.formState.errors.comment?.message}
              </FormMessage>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
