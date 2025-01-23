import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Posts from '../post/Posts';
import useHttpRequest from '../../hooks/http-request-hook';
import useAuthStore from '../../store/auth-store';
import usePostStore from '../../store/post-store';

const Profile = () => {
  const { user, token } = useAuthStore();
  const { sendRequest } = useHttpRequest();
  const { posts, setPosts, updatePosts } = usePostStore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await sendRequest(`/users/profile/${user.id}`);
        setPosts(data.posts || []);
      } catch (error) {
        console.error(error);
        toast.error('Error while fetching user posts!');
        setPosts([]);
      }
    };

    fetchPosts();
  }, [sendRequest, user.id, token, setPosts]);
  const getCsrfToken = () => {
    const csrfCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('csrftoken='));
    return csrfCookie ? csrfCookie.split('=')[1] : null;
  };
  const csrfToken = getCsrfToken();
  const handleToggleLike = async (postId) => {
    try {
      const response = await sendRequest(`/post-like/${postId}`, 'POST', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
          'X-CSRFToken': csrfToken,
        },
      });

      if (response) {
        // Update the posts state with the new like data
        updatePosts(
          posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  is_liked: response.is_liked,
                  likes_count: response.likes_count,
                }
              : post
          )
        );
        toast.success(response.message || 'Like status updated.');
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update like status.');
    }
  };

  return (
    <Posts
      posts={posts}
      title={`${user.username}'s Posts`}
      onToggleLike={handleToggleLike}
    />
  );
};

export default Profile;
