import { useState } from 'react';
import { Card, Dropdown, OverlayTrigger, Spinner } from 'react-bootstrap';
import { FaHeart, FaComment, FaDownload } from 'react-icons/fa';
import { formatDate } from '../utils/helper-functions';
import useDownloadImage from '../hooks/download-image-hook';
import useToggleLike from '../hooks/toggle-like-hook';
import useAuthStore from '../store/auth-store';

import '../styles/post-card.css';

const PostCard = ({ post, handleOnPostDetails, renderTooltip }) => {
  const { downloadImage } = useDownloadImage();
  const { toggleLike } = useToggleLike();
  const { user } = useAuthStore();
  const [imageLoaded, setImageLoaded] = useState(false);

  console.log(post)
  let username = '';
  if (user) {
    username = user.username;
  }

  const handleOnToggleLike = async (id) => {
    toggleLike(id);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Card className='shadow-sm'>
      <Card.Header className='d-flex justify-content-between align-items-center'>
        <span>{post.title}</span>
        <div className='header-avatar-container'>
          <OverlayTrigger
            placement='top'
            delay={{ show: 250, hide: 400 }}
            overlay={(props) => renderTooltip(props, post.author)}
          >
            <div className='d-flex align-items-center'>
              <img
                src={post.authorImage}
                alt='avatar'
                className='post-avatar'
              />
            </div>
          </OverlayTrigger>
          {post.author === username && (
            <Dropdown>
              <Dropdown.Toggle
                variant='secondary'
                id='dropdown-basic'
                size='sm'
                as='div'
                className='dropdown-toggle-custom'
              ></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleOnPostDetails(post.id)}>
                  Go to details
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </Card.Header>
      <div className='image-container'>
        {!imageLoaded && (
          <div className='spinner-overlay'>
            <Spinner animation='border' variant='primary' />
          </div>
        )}
        <Card.Img
          variant='top'
          src={post.image}
          className={`post-image ${imageLoaded ? 'visible' : 'hidden'}`}
          onLoad={handleImageLoad}
        />
      </div>
      <Card.Body>
        <div className='d-flex justify-content-between align-items-center mb-3'>
          <div className='d-flex align-items-center'>
            <div
              onClick={() => handleOnToggleLike(post.id)}
              className='like-container'
            >
              <FaHeart className='text-danger me-1' />
              <span>{post.likesCount}</span>
            </div>
            <div
              className='comment-container'
              onClick={() => handleOnPostDetails(post.id)}
            >
              <FaComment className='text-primary me-1' />
              <span>{post.commentsCount}</span>
            </div>
            <div
              onClick={() => downloadImage(post.id)}
              className='download-container'
            >
              <FaDownload className='text-success me-1' />
              <span>{post.downloadCount}</span>
            </div>
          </div>
          <span className='text-muted'>{formatDate(post.createdAt)}</span>
        </div>
        {post.description && (
          <Card.Text className='mt-3'>{post.description}</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default PostCard;
