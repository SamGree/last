import { toast } from "react-toastify";
import useHttpRequest from "../hooks/http-request-hook";
import useAuthStore from "../store/auth-store";
import usePostStore from "../store/post-store";
import useLikedPostsStore from "../store/liked-post-store";

const useToggleLike = () => {
  const { sendRequest } = useHttpRequest();
  const { token, user } = useAuthStore();
  const {
    setComments,
    posts,
    getCommentsByPostId,
    setPosts,
    updatePosts,
    setPost,
    updateComments,
  } = usePostStore();
  const { likedPosts, setLikedPosts } = useLikedPostsStore();

  const getCsrfToken = () => {
    const csrfCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="));
    return csrfCookie ? csrfCookie.split("=")[1] : null;
  };
  const csrfToken = getCsrfToken();
  const toggleLike = async (postId, commentId = null) => {
    try {
      if (commentId) {
        // Handle comment likes
        const comments = getCommentsByPostId(postId);
        const commentToUpdate = comments.find(
          (comment) => comment.id === commentId
        );

        if (!commentToUpdate) {
          console.warn("Comment not found!");
          return null;
        }

        // Prevent the user from liking their own comment
        if (commentToUpdate.author === user.username) {
          console.warn("Cannot like your own comment.");
          return null;
        }

        try {
          // Send request to toggle like for the comment
          const response = await sendRequest(
            `/comment-like/${commentId}`,
            "POST",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
                "X-CSRFToken": csrfToken,
              },
            }
          );

          // If the response is valid, update the comment in the state
          if (response && typeof response.is_liked === "boolean") {
            const updatedComments = comments.map((comment) =>
              comment.id === commentId
                ? {
                    ...comment,
                    likesCount: response.likes_count ?? comment.likesCount,
                    isLiked: response.is_liked ?? comment.isLiked,
                  }
                : comment
            );

            // Update the state with the modified comments
            updateComments(updatedComments);

            return response;
          } else {
            console.error("Unexpected response for comment like:", response);
          }
        } catch (error) {
          console.error("Error liking comment:", error);
          toast.error("An error occurred while liking the comment.");
        }
        return null;
      } else {
        // Handle post likes
        const postToUpdate = posts.find((post) => post.id === postId);

        if (!postToUpdate) {
          console.warn("Post not found!");
          return null;
        }

        const response = await sendRequest(`/post-like/${postId}`, "POST", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
            "X-CSRFToken": csrfToken,
          },
        });

        if (response && typeof response.is_liked === "boolean") {
          const updatedPosts = posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likesCount: response.likes_count,
                  likes_count: response.likes_count,
                  isLiked: response.is_liked,
                  is_liked: response.is_liked,
                }
              : post
          );

          const postUpdated = {
            ...postToUpdate,
            likesCount: response.likes_count,
            likes_count: response.likes_count,
            isLiked: response.is_liked,
            is_liked: response.is_liked,
          };

          if (!response.is_liked) {
            setLikedPosts(
              likedPosts.filter(
                (liked_Post) => liked_Post.id != response.post_id
              )
            );
          } else {
            setLikedPosts([
              ...likedPosts,
              {
                ...postUpdated,
                is_liked: response.is_liked,
                likes_count: response.likes_count,
              },
            ]);
          }

          updatePosts(updatedPosts);
          setPost(postUpdated);

          return response;
        }

        console.error("Unexpected response for post like:", response);
        return null;
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      return null;
    }
  };

  return { toggleLike };
};

export default useToggleLike;
