import type { IComment } from '@/supabase';

export interface CommentNode extends IComment {
  children: CommentNode[];
}

/**
 * Builds a tree structure from flat comments array
 * @param comments - Array of comments from database
 * @returns Array of root level comments with nested children
 */
export const buildCommentTree = (comments: IComment[]): CommentNode[] => {
  const commentMap = new Map<string, CommentNode>();
  const roots: CommentNode[] = [];

  // First pass: Create all comment nodes with empty children arrays
  comments.forEach(comment => {
    commentMap.set(comment.id, {
      ...comment,
      children: [],
    });
  });

  // Second pass: Build the tree structure
  comments.forEach(comment => {
    const node = commentMap.get(comment.id)!;

    if (comment.parent_comment_id) {
      // This is a child comment
      const parent = commentMap.get(comment.parent_comment_id);
      if (parent) {
        parent.children.push(node);
      } else {
        // If parent is not found (shouldn't happen in normal cases),
        // add to roots
        roots.push(node);
      }
    } else {
      // This is a root level comment
      roots.push(node);
    }
  });

  // Sort root comments by created_at
  roots.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  // Sort children of each comment by created_at
  const sortChildren = (node: CommentNode) => {
    node.children.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
    node.children.forEach(sortChildren);
  };

  roots.forEach(sortChildren);

  return roots;
};

/**
 * Flattens a comment tree back into an array
 * Useful for updates and modifications
 * @param roots - Array of root level comments
 * @returns Flat array of all comments
 */
export const flattenCommentTree = (roots: CommentNode[]): IComment[] => {
  const comments: IComment[] = [];

  const flatten = (node: CommentNode) => {
    // Omit the children array when adding to flat list
    const { children, ...comment } = node;
    comments.push(comment);
    children.forEach(flatten);
  };

  roots.forEach(flatten);
  return comments;
};

/**
 * Gets total count of comments in a tree
 * @param roots - Array of root level comments
 * @returns Total number of comments including nested ones
 */
export const getCommentCount = (roots: CommentNode[]): number => {
  let count = 0;

  const countComments = (node: CommentNode) => {
    count++;
    node.children.forEach(countComments);
  };

  roots.forEach(countComments);
  return count;
};

/**
 * Finds a comment by ID in the tree
 * @param roots - Array of root level comments
 * @param commentId - ID of comment to find
 * @returns Comment node if found, undefined if not
 */
export const findCommentById = (
  roots: CommentNode[],
  commentId: string
): CommentNode | undefined => {
  for (const root of roots) {
    if (root.id === commentId) return root;

    const found = findCommentInChildren(root.children, commentId);
    if (found) return found;
  }
  return undefined;
};

const findCommentInChildren = (
  children: CommentNode[],
  commentId: string
): CommentNode | undefined => {
  for (const child of children) {
    if (child.id === commentId) return child;

    const found = findCommentInChildren(child.children, commentId);
    if (found) return found;
  }
  return undefined;
};
