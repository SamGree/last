import { toast } from 'react-toastify';
import useHttpRequest from '../hooks/http-request-hook';
import useAuthStore from '../store/auth-store';
import usePostStore from '../store/post-store';

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
    updatePost,
    updateComments,
  } = usePostStore();

  const toggleLike = async (postId, commentId = null) => {
    try {
      if (commentId) {
        const comments = getCommentsByPostId(postId);
        const commentToUpdate = comments.find(
          (comment) => comment.id === commentId
        );

        if (!commentToUpdate) {
          toast.error('Comment not found!');
          return;
        }

        if (commentToUpdate.author === user.username) {
          toast.error('You cannot like your own comment.');
          return;
        }

        const response = await sendRequest(
          `/comment-like/${commentId}`,
          'POST',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`,
            },
          }
        );

        let updatedComments = [];
        if (response && response.message === 'Comment liked.') {
          updatedComments = comments.map((comment) =>
            comment.id === commentId
              ? {
                  ...comment,
                  likesCount: comment.likesCount + 1,
                  isLiked: true,
                }
              : comment
          );
          toast.success('Like successfully added to the comment.');
        } else if (
          response &&
          response.message === 'Like removed from comment.'
        ) {
          updatedComments = comments.map((comment) =>
            comment.id === commentId
              ? {
                  ...comment,
                  likesCount: comment.likesCount - 1,
                  isLiked: false,
                }
              : comment
          );
          toast.success('Like removed from the comment.');
        }

        updateComments(updatedComments);
      } else {
        const postToUpdate = posts.find((post) => post.id === postId);
        setPost(postToUpdate);

        if (!postToUpdate) {
          toast.error('Post not found!');
          return;
        }

        const response = await sendRequest(`/post-like/${postId}`, 'POST', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        });

        let updatedPosts = [];
        let postUpdated = {};
        if (response && response.message === 'Post liked.') {
          updatedPosts = posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likesCount: post.likesCount + 1,
                  isLiked: true,
                }
              : post
          );
          postUpdated = {
            ...postToUpdate,
            likesCount: postToUpdate.likesCount + 1,
            isLiked: true,
          };
          toast.success('Like successfully added to the post.');
        } else if (response && response.message === 'Like removed from post.') {
          updatedPosts = posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likesCount: post.likesCount - 1,
                  isLiked: false,
                }
              : post
          );

          postUpdated = {
            ...postToUpdate,
            likesCount: postToUpdate.likesCount - 1,
            isLiked: false,
          };
          toast.success('Like removed from the post.');
        }

        updatePosts(updatedPosts);
        updatePost(postUpdated);
      }
    } catch (error) {
      if (commentId) {
        const comments = getCommentsByPostId(postId);
        const revertedComments = comments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                likesCount: comment.likesCount,
                isLiked: comment.isLiked,
              }
            : comment
        );

        setComments(revertedComments);
      } else {
        const revertedPosts = posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likesCount: post.likesCount,
                isLiked: post.isLiked,
              }
            : post
        );
        const revertedPost = posts.find((post) => post.id === postId);

        setPost(revertedPost);
        setPosts(revertedPosts);
      }

      if (error.response?.data?.error === 'You cannot like your own comment.') {
        toast.error('You cannot like your own comment.');
      }
      if (error.response?.data?.detail === 'Invalid token.') {
        toast.error('You have to login to be able to give a like!');
      }
    }
  };

  return { toggleLike };
};

export default useToggleLike;