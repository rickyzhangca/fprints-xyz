import { useDeleteComment, useGetProfileByUserId } from '@/hooks';
import { useBearStore } from '@/store';
import { CommentNode, tw } from '@/utils';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CommentTextarea } from '../comment-textarea';
import { ProfilePic } from '../profile-pic';
import { Timestamp } from './subcomponents/timestamp';

type CommentTreeProps = {
  comments: CommentNode[];
};

const Comment = ({ comment }: { comment: CommentNode }) => {
  const [isReplying, setIsReplying] = useState(false);
  const getProfile = useGetProfileByUserId(comment.user_id);
  const user = useBearStore(state => state.user);
  const deleteComment = useDeleteComment();

  if (comment.is_deleted)
    return (
      <p className="w-full rounded-lg bg-steel-900 p-3 text-center text-steel-400">
        A deleted comment
      </p>
    );

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2.5">
        <Link to={`/user/${comment.user_id}`} target="_blank">
          <ProfilePic
            size="md"
            color={getProfile.data?.color}
            name={getProfile.data?.handle}
          />
        </Link>
        <p className="flex items-center gap-2.5 text-sm text-steel-400">
          <Link to={`/user/${comment.user_id}`} target="_blank">
            {getProfile.data?.handle ?? 'Anonymous'}
          </Link>
          <Timestamp created_at={comment.created_at} />
        </p>
      </div>
      <div className="ml-10 flex flex-col gap-1">
        <p>{comment.content}</p>
        <div
          className={tw(
            'flex gap-3',
            isReplying ? 'mt-2 w-full flex-col' : 'items-center'
          )}
        >
          {isReplying ? (
            <CommentTextarea
              initialIsExpanded
              blueprintId={comment.blueprint_id}
              parentCommentId={comment.id}
              onCancel={() => setIsReplying(false)}
              onSuccess={() => setIsReplying(false)}
            />
          ) : (
            <>
              <button
                className="text-sm text-steel-400 transition-colors duration-100 hover:text-steel-50"
                onClick={() => setIsReplying(true)}
              >
                Reply
              </button>
              {comment.user_id === user?.id && (
                <button
                  className="text-sm text-steel-400 transition-colors duration-100 hover:text-steel-50"
                  onClick={() => deleteComment.mutate(comment)}
                >
                  Delete
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const CommentTree = ({ comments }: CommentTreeProps) => {
  return (
    <div className="flex flex-col gap-3 text-steel-50">
      {comments.map(node => {
        return (
          <div key={node.id} className="flex flex-col gap-4">
            <Comment comment={node} />
            {node.children.length > 0 && (
              <div className="ml-10">
                <CommentTree comments={node.children} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
