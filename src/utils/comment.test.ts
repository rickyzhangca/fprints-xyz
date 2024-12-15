import type { Database } from '@/supabase';
import { describe, expect, it } from 'vitest';
import {
  buildCommentTree,
  findCommentById,
  flattenCommentTree,
  getCommentCount,
  type CommentNode,
} from './comment';

type Comment = Database['public']['Tables']['comments']['Row'];

describe('Comment Tree Utilities', () => {
  // Helper to create test comments with required fields
  const createComment = (
    partial: Partial<Comment> & { id: string }
  ): Comment => ({
    blueprint_id: 'test-blueprint',
    content: 'test content',
    created_at: new Date().toISOString(),
    is_deleted: false,
    is_hidden: false,
    parent_comment_id: null,
    updated_at: null,
    user_id: 'test-user',
    ...partial,
  });

  describe('buildCommentTree', () => {
    it('should create empty array for no comments', () => {
      const result = buildCommentTree([]);
      expect(result).toEqual([]);
    });

    it('should handle single root comment', () => {
      const comment = createComment({ id: '1' });
      const result = buildCommentTree([comment]);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
      expect(result[0].children).toEqual([]);
    });

    it('should build simple parent-child relationship', () => {
      const parent = createComment({ id: '1' });
      const child = createComment({
        id: '2',
        parent_comment_id: '1',
      });

      const result = buildCommentTree([parent, child]);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
      expect(result[0].children).toHaveLength(1);
      expect(result[0].children[0].id).toBe('2');
    });

    it('should handle multiple levels of nesting', () => {
      const root = createComment({ id: '1' });
      const child = createComment({
        id: '2',
        parent_comment_id: '1',
      });
      const grandchild = createComment({
        id: '3',
        parent_comment_id: '2',
      });

      const result = buildCommentTree([root, child, grandchild]);
      expect(result).toHaveLength(1);
      expect(result[0].children[0].children[0].id).toBe('3');
    });

    it('should handle multiple root comments', () => {
      const root1 = createComment({
        id: '1',
        created_at: '2023-01-01T00:00:00Z',
      });
      const root2 = createComment({
        id: '2',
        created_at: '2023-01-02T00:00:00Z',
      });

      const result = buildCommentTree([root2, root1]); // Intentionally out of order
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('1'); // Should be sorted by created_at
      expect(result[1].id).toBe('2');
    });

    it('should sort comments by created_at', () => {
      const parent = createComment({
        id: '1',
        created_at: '2023-01-01T00:00:00Z',
      });
      const child1 = createComment({
        id: '2',
        parent_comment_id: '1',
        created_at: '2023-01-02T00:00:00Z',
      });
      const child2 = createComment({
        id: '3',
        parent_comment_id: '1',
        created_at: '2023-01-01T12:00:00Z',
      });

      const result = buildCommentTree([parent, child1, child2]);
      expect(result[0].children[0].id).toBe('3');
      expect(result[0].children[1].id).toBe('2');
    });

    it('should handle orphaned comments', () => {
      const orphan = createComment({
        id: '1',
        parent_comment_id: 'non-existent',
      });

      const result = buildCommentTree([orphan]);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });
  });

  describe('flattenCommentTree', () => {
    it('should flatten empty tree', () => {
      const result = flattenCommentTree([]);
      expect(result).toEqual([]);
    });

    it('should flatten nested structure', () => {
      const tree: CommentNode[] = [
        {
          ...createComment({ id: '1' }),
          children: [
            {
              ...createComment({ id: '2', parent_comment_id: '1' }),
              children: [],
            },
          ],
        },
      ];

      const result = flattenCommentTree(tree);
      expect(result).toHaveLength(2);
      expect(result.map(c => c.id)).toEqual(['1', '2']);
      expect(result[1].parent_comment_id).toBe('1');
    });
  });

  describe('getCommentCount', () => {
    it('should count empty tree', () => {
      expect(getCommentCount([])).toBe(0);
    });

    it('should count nested comments', () => {
      const tree: CommentNode[] = [
        {
          ...createComment({ id: '1' }),
          children: [
            {
              ...createComment({ id: '2', parent_comment_id: '1' }),
              children: [
                {
                  ...createComment({ id: '3', parent_comment_id: '2' }),
                  children: [],
                },
              ],
            },
          ],
        },
        {
          ...createComment({ id: '4' }),
          children: [],
        },
      ];

      expect(getCommentCount(tree)).toBe(4);
    });
  });

  describe('findCommentById', () => {
    it('should return undefined for empty tree', () => {
      expect(findCommentById([], '1')).toBeUndefined();
    });

    it('should find root level comment', () => {
      const tree: CommentNode[] = [
        {
          ...createComment({ id: '1' }),
          children: [],
        },
      ];

      const found = findCommentById(tree, '1');
      expect(found?.id).toBe('1');
    });

    it('should find deeply nested comment', () => {
      const tree: CommentNode[] = [
        {
          ...createComment({ id: '1' }),
          children: [
            {
              ...createComment({ id: '2', parent_comment_id: '1' }),
              children: [
                {
                  ...createComment({ id: '3', parent_comment_id: '2' }),
                  children: [],
                },
              ],
            },
          ],
        },
      ];

      const found = findCommentById(tree, '3');
      expect(found?.id).toBe('3');
      expect(found?.parent_comment_id).toBe('2');
    });

    it('should return undefined for non-existent id', () => {
      const tree: CommentNode[] = [
        {
          ...createComment({ id: '1' }),
          children: [],
        },
      ];

      expect(findCommentById(tree, 'non-existent')).toBeUndefined();
    });
  });
});
