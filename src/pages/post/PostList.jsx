import { ListGroup, ListGroupItem, Container, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PostCard from '../../components/PostCard';

import '../../styles/post-list.css';

const PostList = ({ posts }) => {
  const navigate = useNavigate();

  const renderTooltip = (props, username) => (
    <Tooltip {...props}>{username}</Tooltip>
  );
  console.log("posts_",posts)

  const handleOnPostDetails = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <Container className='mt-2 post-list-container'>
      {!Array.isArray(posts) || posts.length === 0 ? (
        <div className='d-flex justify-content-center align-items-center no-posts'>
          <p className='text-muted'>There are no posts at the moment.</p>
        </div>
      ) : (
        <ListGroup className='post-list-group'>
          {posts.map((post) => (
            <ListGroupItem key={post.id} className='w-100 post-list-group-item'>
              <PostCard
                post={post}
                handleOnPostDetails={handleOnPostDetails}
                renderTooltip={renderTooltip}
              />
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default PostList;
