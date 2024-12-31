import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Posts from '../post/Posts';
import useHttpRequest from '../../hooks/http-request-hook';
import useAuthStore from '../../store/auth-store';
import usePostStore from '../../store/post-store';

const AlbumsPosts = () => {
  const { albumId } = useParams();
  const { sendRequest } = useHttpRequest();
  const { token } = useAuthStore();
  const { posts, setPosts } = usePostStore();
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchAlbumPosts = async () => {
      try {
        const data = await sendRequest(`/albums/${albumId}`, 'GET', {
          headers: { Authorization: `Token ${token}` },
        });
        setPosts(data.posts || []);
        setName(data.name);
      } catch (error) {
        console.error(error);
        toast.error('Error while fetching album posts!');
        setPosts([]);
      }
    };

    fetchAlbumPosts();
  }, [sendRequest, token, albumId, setPosts]);

  return <Posts posts={posts} title={name} />;
};

export default AlbumsPosts;
