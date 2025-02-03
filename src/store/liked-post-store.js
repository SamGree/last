import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLikedPostsStore = create(
  persist(
    (set) => ({
      likedPosts: [],
      postId: null,
      likedPost: null,

      setLikedPosts: (likedPosts) =>
        set(() => ({
          likedPosts: Array.isArray(likedPosts) ? likedPosts : [],
        })),

      updatePosts: (likedPosts) =>
        set((state) => ({
          likedPosts: Array.isArray(likedPosts)
            ? [
                ...new Map(
                  [...state.likedPosts, ...likedPosts].map((likedPost) => [
                    likedPosts.id,
                    likedPost,
                  ])
                ).values(),
              ]
            : [],
        })),

      addPost: (likedPost) => {
        set((state) => ({
          likedPosts: [
            ...new Map(
              [likedPost, ...state.likedPosts].map((likedPost) => [
                likedPost.id,
                likedPost,
              ])
            ).values(),
          ],
        }));
      },

      updatePostToPosts: (updatedPost) => {
        set((state) => ({
          likedPosts: state.likedPosts.map((likedPost) =>
            String(likedPost.id) === String(updatedPost.id)
              ? { ...likedPost, ...updatedPost }
              : likedPost
          ),
        }));
      },

      removePost: (postId) => {
        set((state) => ({
          likedPosts: state.likedPosts.filter(
            (likedPost) => String(likedPost.id) !== String(postId)
          ),
        }));
      },

      setPostId: (id) => {
        set(() => ({
          postId: id,
        }));
      },

      setPost: (likedPost) => {
        set(() => ({
          likedPost,
        }));
      },

      updatePost: (updatedPost) => {
        set((state) => ({
          likedPost:
            state.likedPost &&
            String(state.likedPost.id) === String(updatedPost.id)
              ? { ...state.likedPost, ...updatedPost }
              : state.likedPost,
        }));
      },

      deletePost: () => set(() => ({ likedPost: null })),
    }),
    {
      name: "like-post-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useLikedPostsStore;
