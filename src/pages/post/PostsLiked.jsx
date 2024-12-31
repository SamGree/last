import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Posts from './Posts';
import useHttpRequest from '../../hooks/http-request-hook';
import useAuthStore from '../../store/auth-store';
import usePostStore from '../../store/post-store';

const PostsLiked = () => {
  const { sendRequest } = useHttpRequest();
  const { token } = useAuthStore();
  const { posts, setPosts } = usePostStore();

  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const data = await sendRequest('/post-like/', 'GET', {
          headers: { Authorization: `Token ${token}` },
        });
        setPosts(data || []);
      } catch (error) {
        console.error(error);
        toast.error('Error while fetching liked posts!');
        setPosts([]);
      }
    };

    fetchLikedPosts();
  }, [sendRequest, token, setPosts]);

  return <Posts posts={posts} title='Liked Posts' />;
};

export default PostsLiked;
