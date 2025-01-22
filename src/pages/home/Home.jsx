import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Posts from '../post/Posts';
import usePostStore from '../../store/post-store';
import useHttpRequest from '../../hooks/http-request-hook';

const Home = () => {
  const { sendRequest } = useHttpRequest();
  const { posts, setPosts } = usePostStore();

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
  }, [sendRequest, setPosts]);

  return <Posts posts={posts} title='E-Pics' />;
};

export default Home;