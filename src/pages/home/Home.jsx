import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Posts from '../post/Posts';
import usePostStore from '../../store/post-store';
import useHttpRequest from '../../hooks/http-request-hook';
import useLikedPostsStore from '../../store/liked-post-store';
import useAuthStore from '../../store/auth-store';

const Home = () => {
  const { sendRequest } = useHttpRequest();
  const { setPosts } = usePostStore();
  const { setLikedPosts } = useLikedPostsStore();
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await sendRequest('/posts/');
        setPosts(data || []);
      } catch (error) {
        console.error(error);
        toast.error('Error while fetching posts!');
        setPosts([]);
      }
    };
    fetchPosts();

    const fetchLikedPosts = async () => {
      if ( !token ) return;
      try {
        const data = await sendRequest('/post-like/','GET',
          {headers: {'Authorization': `Token ${token}`}},{}
        );
        setLikedPosts(data || []);
        console.log("data = ", data)
      } catch (error) {
        console.error(error);
        toast.error('Error while fetching liked posts!');
        setLikedPosts([]);
      }
    };
    fetchLikedPosts();
  }, [sendRequest, setPosts, setLikedPosts, token]);

  return <Posts title='E-Pics' />;
};

export default Home;