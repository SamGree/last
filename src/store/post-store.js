import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useAuthStore from './auth-store';
const usePostStore = create(
  persist(
    (set, get) => ({
      posts: [],
      comments: [],
      postId: null,
      post: null,

      // Fetch posts from API (with authentication)
      fetchPosts: async () => {
        try {
          const authHeaders = useAuthStore.getState().getAuthHeaders();

          const response = await fetch('https://my-e-pics-d3d3d941434e.herokuapp.com/posts/', {
            method: 'GET',
            headers: {
              ...authHeaders,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
          }

          const data = await response.json();
          set({ posts: data });
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      },

      // Create a new post
      createPost: async (postData) => {
        try {
          const authHeaders = useAuthStore.getState().getAuthHeaders();

          const response = await fetch('https://my-e-pics-d3d3d941434e.herokuapp.com/posts/', {
            method: 'POST',
            headers: {
              ...authHeaders,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
          });

          if (!response.ok) {
            throw new Error('Failed to create post');
          }

          const newPost = await response.json();
          set((state) => ({
            posts: [newPost, ...state.posts],
          }));
        } catch (error) {
          console.error('Error creating post:', error);
        }
      },

      // Delete a post
      deletePost: async (postId) => {
        try {
          const authHeaders = useAuthStore.getState().getAuthHeaders();

          // const response = await fetch(`https://your-api.com/posts/${postId}/`, {
            const response = await fetch(`https://my-e-pics-d3d3d941434e.herokuapp.com/posts/${postId}/`, {
            method: 'DELETE',
            headers: {
              ...authHeaders,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to delete post');
          }

          set((state) => ({
            posts: state.posts.filter((post) => String(post.id) !== String(postId)),
          }));
        } catch (error) {
          console.error('Error deleting post:', error);
        }
      },

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
    }),
    {
      name: 'post-storage',
      getStorage: () => localStorage,
    }
  )
);

export default usePostStore;
