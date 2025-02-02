import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Posts from '../post/Posts';
import useHttpRequest from '../../hooks/http-request-hook';
import useAuthStore from '../../store/auth-store';
import usePostStore from '../../store/post-store';
import useLikedPostsStore from '../../store/liked-post-store';

const Profile = () => {
  const { user, token, getAuthHeaders } = useAuthStore();  // Fetch token & auth headers
  const { sendRequest } = useHttpRequest();
  const { posts, setPosts, updatePosts } = usePostStore();
  const { likedPosts, setLikedPosts } = useLikedPostsStore();

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user || !user.id) return; // Ensure user is available before fetching

      try {
        const authHeaders = getAuthHeaders(); // Get authentication headers

        const data = await sendRequest(`/users/profile/${user.id}`, 'GET', {
          headers: {
            ...authHeaders,  // Add Authorization header
            'Content-Type': 'application/json',
          },
        });

        setPosts(data.posts || []);
      } catch (error) {
        console.error('Error fetching user posts:', error);
        toast.error('Error while fetching user posts!');
        setPosts([]);
      }
    };

    fetchPosts();

    const fetchLikedPost = async () => {
      if ( !token ) return;

      try {
        const data = await sendRequest('/post-like/','GET',
          {headers: {'Authorization': `Token ${token}`}},{}
        );
        setLikedPosts(data || []);
        
      } catch (error) {
        console.log(error);
        toast.error('Error while fetching post details!');
        setLikedPosts([])
      }
    };

    fetchLikedPost();    

  }, [sendRequest, user.id, token, setPosts, setLikedPosts, getAuthHeaders]); // Added getAuthHeaders to dependencies

  // Get CSRF Token (For Django CSRF protection)
  const getCsrfToken = () => {
    const csrfCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('csrftoken='));
    return csrfCookie ? csrfCookie.split('=')[1] : null;
  };
  const csrfToken = getCsrfToken();

  const handleToggleLike = async (postId) => {
    if (!token) {
      toast.error('You need to be logged in to like posts.');
      return;
    }

    try {
      const authHeaders = getAuthHeaders(); // Get authentication headers

      const response = await sendRequest(`/post-like/${postId}`, 'POST', {
        headers: {
          ...authHeaders,
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken, // Include CSRF token
        },
      });

      if (response) {
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
      title={`${user?.username}'s Posts`}
      onToggleLike={handleToggleLike}
    />
  );
};

export default Profile;
