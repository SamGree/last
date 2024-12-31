import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Posts from '../post/Posts';
import useHttpRequest from '../../hooks/http-request-hook';
import useAuthStore from '../../store/auth-store';
import usePostStore from '../../store/post-store';

const Profile = () => {
  const { user, token } = useAuthStore();
  const { sendRequest } = useHttpRequest();
  const { posts, setPosts } = usePostStore();

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

  return <Posts posts={posts} title={`${user.username}'s Posts`} />;
};

export default Profile;
