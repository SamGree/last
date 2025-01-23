import React, { useState, Fragment } from 'react';
import { Card, Dropdown, Spinner } from 'react-bootstrap';
import { FaHeart, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useToggleLike from '../hooks/toggle-like-hook';
import useAuthStore from '../store/auth-store';
import { formatDate } from '../utils/helper-functions';


const CardDetails = ({ post, handleEdit, setShowDeleteModal }) => {
  const { toggleLike } = useToggleLike();
  const { user } = useAuthStore();
  const [imageLoading, setImageLoading] = useState(true);
  const [updatedPost, setUpdatedPost] = useState(post);

  const handleOnToggleLike = async (id) => {
    toggleLike(id);
    const updatedLikes = updatedPost.is_liked
      ? updatedPost.likes_count - 1
      : updatedPost.likes_count + 1;

    setUpdatedPost({
      ...updatedPost,
      is_liked: !updatedPost.is_liked,
      likes_count: updatedLikes,
    });
  };

  return (
    <Card className="shadow-sm">
      <Fragment>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>{updatedPost.title}</span>
          <div className="d-flex align-items-center">
            <img
              src={updatedPost.author_image}
              alt="avatar"
              className="post-avatar"
            />
            {updatedPost.author === user.username && (
              <Dropdown>
                <Dropdown.Toggle
                  variant="secondary"
                  id="dropdown-basic"
                  size="sm"
                  as="div"
                  className="dropdown-toggle-custom"
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
            className="d-flex justify-content-center align-items-center"
            style={{ height: '300px' }}
          >
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        <Card.Img
          variant="top"
          src={updatedPost.image}
          className="post-image"
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
          style={{ display: imageLoading ? 'none' : 'block' }}
        />
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center">
              <div
                onClick={() => handleOnToggleLike(updatedPost.id)}
                className="like-container"
              >
                <FaHeart
                  className={`me-1 ${updatedPost.is_liked ? 'text-danger' : ''}`}
                />
                <span>{updatedPost.likes_count ?? 0}</span>
              </div>
              <div className="download-container">
                <FaDownload className="text-success me-1" />
                <span>{updatedPost.download_count}</span>
              </div>
            </div>
            <span className="text-muted">{formatDate(updatedPost.created_at)}</span>
          </div>
          {updatedPost.description && (
            <Card.Text className="mt-3">{updatedPost.description}</Card.Text>
          )}
        </Card.Body>
      </Fragment>
    </Card>
  );
};

export default CardDetails;
