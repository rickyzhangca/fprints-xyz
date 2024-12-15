import { CommentTextarea, CommentTree } from '@/components';
import { useGetCommentTreeByBlueprintId } from '@/hooks';

export const Comments = ({ blueprintId }: { blueprintId: string }) => {
  const getComments = useGetCommentTreeByBlueprintId(blueprintId);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="font-medium text-steel-300">Comments</h2>
        <CommentTextarea blueprintId={blueprintId} />
      </div>
      {getComments.data && getComments.data.length > 0 ? (
        <CommentTree comments={getComments.data} />
      ) : (
        <p className="w-full rounded-lg bg-steel-900 px-4 py-6 text-center text-steel-400">
          Drop the first comment!
        </p>
      )}
    </div>
  );
};
