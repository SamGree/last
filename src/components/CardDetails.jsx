import { Card, Dropdown, Spinner } from 'react-bootstrap';
import { Fragment, useState } from 'react';
import { FaHeart, FaDownload } from 'react-icons/fa';
import useToggleLike from '../hooks/toggle-like-hook';
import useDownloadImage from '../hooks/download-image-hook';
import useAuthStore from '../store/auth-store';
import { formatDate } from '../utils/helper-functions';

import '../styles/card-details.css';

const CardDetails = ({ post, handleEdit, setShowDeleteModal }) => {
  const { toggleLike } = useToggleLike();
  const { downloadImage } = useDownloadImage();
  const { user } = useAuthStore();
  const [imageLoading, setImageLoading] = useState(true);

  const handleOnToggleLike = async (id) => {
    toggleLike(id);
  };

  return (
    <Card className='shadow-sm'>
      {post ? (
        <Fragment>
          <Card.Header className='d-flex justify-content-between align-items-center'>
            <span>{post.title}</span>
            <div className='d-flex align-items-center'>
              <img
                src={post.authorImage}
                alt='avatar'
                className='post-avatar'
              />
              {post.author === user.username && (
                <Dropdown>
                  <Dropdown.Toggle
                    variant='secondary'
                    id='dropdown-basic'
                    size='sm'
                    as='div'
                    className='dropdown-toggle-custom'
                  ></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={() => setShowDeleteModal(true)}>
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </Card.Header>
          {imageLoading && (
            <div
              className='d-flex justify-content-center align-items-center'
              style={{ height: '300px' }}
            >
              <Spinner animation='border' variant='primary' />
            </div>
          )}
          <Card.Img
            variant='top'
            src={post.image}
            className='post-image'
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
            style={{ display: imageLoading ? 'none' : 'block' }}
          />
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
        </Fragment>
      ) : (
        <Card.Text className='mt-2 mb-2'>No post at the moment</Card.Text>
      )}
    </Card>
  );
};

export default CardDetails;
