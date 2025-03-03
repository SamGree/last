import { ListGroup, ListGroupItem, Container, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PostCard from "../../components/PostCard";
import { useEffect } from "react";
import useLikedPostsStore from "../../store/liked-post-store";

import "../../styles/post-list.css";

const PostList = ({ posts }) => {
  const navigate = useNavigate();
  const { likedPosts } = useLikedPostsStore();

  useEffect(() => {
    posts.map((post) => {
      likedPosts &&
        likedPosts.forEach((likedPosts) => {
          if (likedPosts.id === post.id) {
            post.is_liked = true;
          }
        });
        return null;
    });
  }, [posts, likedPosts]);

  const renderTooltip = (props, username) => (
    <Tooltip {...props}>{username}</Tooltip>
  );

  const handleOnPostDetails = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <Container className="mt-2 post-list-container">
      {!Array.isArray(posts) || posts.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center no-posts">
          <p className="text-muted">There are no posts at the moment.</p>
        </div>
      ) : (
        <ListGroup className="post-list-group">
          {posts.map((post) => (
            <ListGroupItem key={post.id} className="w-100 post-list-group-item">
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
