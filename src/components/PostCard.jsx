import { useState, useEffect } from 'react';
import { Card, Dropdown, OverlayTrigger, Spinner } from 'react-bootstrap';
import { FaHeart, FaComment, FaDownload } from 'react-icons/fa';
import { formatDate } from '../utils/helper-functions';
import { toast } from 'react-toastify';
import useDownloadImage from '../hooks/download-image-hook';
import useToggleLike from '../hooks/toggle-like-hook';
import useAuthStore from '../store/auth-store';

import '../styles/post-card.css';

const PostCard = ({ 
  post, 
  handleOnPostDetails, 
  renderTooltip = (props, author) => <div {...props}>{author}</div>
}) => {
  const { downloadImage } = useDownloadImage();
  const { toggleLike } = useToggleLike();
  const { user } = useAuthStore();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(post);

  const [isLiking, setIsLiking] = useState(false);

  const username = user?.username || '';
  useEffect(() => {
    setUpdatedPost(post);
  }, [post]);

  const handleOnToggleLike = async (id) => {
    if (isLiking) return;
    setIsLiking(true);
  
    try {
      const response = await toggleLike(id);
      if (response) {
        setUpdatedPost({
          ...updatedPost,
          is_liked: response.is_liked,
          likes_count: response.likes_count,
        });
  
        const message = response.is_liked
          ? 'Like successfully added to the post.'
          : 'Like removed from the post.';
        toast.success(message);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const handleDownload = async () => {
      try {
          const response = await downloadImage(updatedPost.id);
          console.log("response= ", response)
          if(!response) return;
          if (response && response.download_count){
            await downloadImage(updatedPost.id)
            setUpdatedPost((prev) =>({
              ...prev,
              download_count: response.download_count + 1,
            }));
          }
        }catch (error){
          toast.error("Failed to download the image. Please try again later!")
        }
    };

  return (
    <Card className="shadow-sm">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span>{updatedPost.title}</span>
        <div className="header-avatar-container">
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={(props) => renderTooltip(props, updatedPost.author)}
          >
            <div className="d-flex align-items-center">
              <img
                src={updatedPost.author_image}
                alt="avatar"
                className="post-avatar"
              />
            </div>
          </OverlayTrigger>
          {updatedPost.author === username && (
            <Dropdown>
              <Dropdown.Toggle
                variant="secondary"
                id="dropdown-basic"
                size="sm"
                as="div"
                className="dropdown-toggle-custom"
              ></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleOnPostDetails(updatedPost.id)}>
                  Go to details
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </Card.Header>
      <div className="image-container">
        {!imageLoaded && (
          <div className="spinner-overlay">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        <Card.Img
          variant="top"
          src={updatedPost.image}
          className={`post-image ${imageLoaded ? 'visible' : 'hidden'}`}
          onLoad={handleImageLoad}
        />
      </div>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <div
              onClick={() => handleOnToggleLike(updatedPost.id)}
              className={`like-container ${isLiking ? 'disabled' : ''}`}
              style={{ pointerEvents: isLiking ? 'none' : 'auto' }}
            >
              <FaHeart
                className={`me-1 ${updatedPost.is_liked ? 'text-danger' : ''}`}
              />
              <span>{updatedPost.likes_count}</span>
            </div>
            <div
              className="comment-container"
              onClick={() => handleOnPostDetails(updatedPost.id)}
            >
              <FaComment className="text-primary me-1" />
              <span>{updatedPost.comments_count}</span>
            </div>
            <div
              onClick={handleDownload}
              className="download-container"
            >
              <FaDownload className="text-success me-1" />
              <span>{updatedPost.download_count ?? 0}</span>
            </div>
          </div>
          <span className="text-muted">{formatDate(updatedPost.created_at)}</span>
        </div>
        {updatedPost.description && (
          <Card.Text className="mt-3">{updatedPost.description}</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default PostCard;
