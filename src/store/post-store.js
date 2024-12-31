import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePostStore = create(
  persist(
    (set) => ({
      posts: [],
      comments: [],
      postId: null,
      post: null,

      setPosts: (posts) =>
        set(() => ({
          posts: Array.isArray(posts) ? posts : [],
        })),

      updatePosts: (posts) =>
        set((state) => ({
          posts: Array.isArray(posts)
            ? [
                ...new Map(
                  [...state.posts, ...posts].map((post) => [post.id, post])
                ).values(),
              ]
            : [],
        })),

      addPost: (post) => {
        set((state) => ({
          posts: [
            ...new Map(
              [post, ...state.posts].map((post) => [post.id, post])
            ).values(),
          ],
        }));
      },

      updatePostToPosts: (updatedPost) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            String(post.id) === String(updatedPost.id)
              ? { ...post, ...updatedPost }
              : post
          ),
        }));
      },

      removePost: (postId) => {
        set((state) => ({
          posts: state.posts.filter(
            (post) => String(post.id) !== String(postId)
          ),
        }));
      },

      setPostId: (id) => {
        set(() => ({
          postId: id,
        }));
      },

      setComments: (comments) =>
        set(() => ({
          comments: Array.isArray(comments) ? comments : [],
        })),

      updateComments: (comments) =>
        set((state) => ({
          comments: Array.isArray(comments)
            ? [
                ...new Map(
                  [...state.comments, ...comments].map((comment) => [
                    comment.id,
                    comment,
                  ])
                ).values(),
              ]
            : [],
        })),

      addComment: (comment) => {
        set((state) => ({
          comments: [comment, ...state.comments],
        }));
      },

      getCommentsByPostId: (postId) => {
        const state = usePostStore.getState();
        return state.comments.filter(
          (comment) => String(comment.post) === String(postId)
        );
      },

      setPost: (post) => {
        set(() => ({
          post,
        }));
      },

      updatePost: (updatedPost) => {
        set((state) => ({
          post:
            state.post && String(state.post.id) === String(updatedPost.id)
              ? { ...state.post, ...updatedPost }
              : state.post,
        }));
      },

      deletePost: () => set(() => ({ post: null })),
    }),
    {
      name: 'post-storage',
      getStorage: () => localStorage,
    }
  )
);

export default usePostStore;
