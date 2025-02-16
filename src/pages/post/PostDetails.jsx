import { useNavigate, useParams } from "react-router-dom";
import useHttpRequest from "../../hooks/http-request-hook";
import useAuthStore from "../../store/auth-store";
import useAlbums from "../../hooks/albums-hook";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import CardDetails from "../../components/CardDetails";
import CommentList from "../../components/CommentList";
import CustomModal from "../../components/CustomModal";
import usePostStore from "../../store/post-store";
import useLikedPostsStore from "../../store/liked-post-store";

const PostDetails = () => {
  const { sendRequest } = useHttpRequest();
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const { postId } = useParams();
  const {
    posts,
    removePost,
    setPostId,
    setComments,
    addComment,
    setPost,
    post,
    deletePost,
  } = usePostStore();
  const { albums } = useAlbums();
  const [comment, setComment] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fetchingPost, setFetchingPost] = useState(true);
  const { likedPosts, setLikedPosts } = useLikedPostsStore();

  useEffect(() => {
    posts.map((post) => {
      console.log("post before ", post);
      likedPosts &&
        likedPosts.forEach((likedPost) => {
          if (likedPost.id === post.id) {
            post.is_liked = true;
          }
        });
    });
  }, [posts, likedPosts]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await sendRequest(`/posts/${postId}`);
        setPostId(postId);
        setPost(data.post);
        setComments(data.comments);
      } catch (error) {
        console.log(error);
        toast.error("Error while fetching post details!");
      } finally {
        setFetchingPost(false);
      }
    };

    fetchPost();

    const fetchLikedPost = async () => {
      if (!token) return;

      try {
        const data = await sendRequest(
          "/post-like/",
          "GET",
          { headers: { Authorization: `Token ${token}` } },
          {}
        );
        setLikedPosts(data || []);

        if (data && data.length > 0) {
          data.map((liked_Post) => {
            if (liked_Post.id == postId) setPost(liked_Post);
            return;
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Error while fetching post details!");
      }
    };

    fetchLikedPost();
  }, [
    sendRequest,
    postId,
    token,
    setPostId,
    setComments,
    setPost,
    setLikedPosts,
  ]);

  const getCsrfToken = () => {
    const csrfCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="));
    return csrfCookie ? csrfCookie.split("=")[1] : null;
  };
  const csrfToken = getCsrfToken();

  const handleAddToAlbum = async () => {
    if (!selectedAlbum) {
      toast.error("Please select an album!");
      return;
    }

    try {
      setLoading(true);
      await sendRequest(`/albums/${selectedAlbum}/add-post/${postId}`, "POST", {
        headers: {
          Authorization: `Token ${token}`,
          "X-CSRFToken": csrfToken,
        },
      });

      if (response.message === "Post is already in the album"){
        toast.success("Post is already in the album!");
        return;
      }  

      toast.success("Post successfully added to the album!");
    } catch (error) {
      console.error(error);
      toast.error("Error while adding post to the album!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!comment.trim()) return;

    try {
      setLoading(true);
      const newComment = await sendRequest(
        `/comments/${postId}/post`,
        "POST",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
            "X-CSRFToken": csrfToken,
          },
        },
        { content: comment }
      );

      addComment(newComment);
      setComment("");
      toast.success("Comment submitted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error while submitting comment!");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/posts/${postId}/edit`);
  };

  const handleDelete = async () => {
    try {
      await sendRequest(`/posts/${postId}`, "DELETE", {
        headers: {
          Authorization: `Token ${token}`,
          "X-CSRFToken": csrfToken,
        },
      });
      removePost(post.postId);
      // deletePost(postId);
      toast.success("Post deleted successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting post!");
    } finally {
      setShowDeleteModal(false);
    }
  };

  if (fetchingPost) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="mt-5 max-w-800">
      <CardDetails
        post={post}
        handleEdit={handleEdit}
        setShowDeleteModal={setShowDeleteModal}
      />

      <h5 className="mt-4">Add Post to an Album</h5>
      <Form className="mb-3">
        <Form.Group controlId="selectAlbum">
          <Form.Label>Select Album</Form.Label>
          <select
            value={selectedAlbum}
            onChange={(e) => setSelectedAlbum(e.target.value)}
            disabled={loading}
          >
            <option value="">Choose an album</option>
            {albums?.length &&
              albums.map((album) => (
                <option key={album.id} value={`${album.id}`}>
                  {album.name}
                </option>
              ))}
          </select>
        </Form.Group>
        <Button
          variant="primary"
          className="mt-2"
          onClick={handleAddToAlbum}
          disabled={loading || !selectedAlbum}
        >
          {loading ? (
            <Spinner as="span" animation="border" size="sm" />
          ) : (
            "Save"
          )}
        </Button>
      </Form>

      <Form className="mt-4">
        <Form.Group controlId="commentInput" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Leave your comment here"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={loading}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleSubmitComment}
          disabled={loading || !comment.trim()}
        >
          {loading ? (
            <Spinner as="span" animation="border" size="sm" />
          ) : (
            "Submit Comment"
          )}
        </Button>
      </Form>

      <CommentList />

      <CustomModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Confirm Deletion"
        body="Are you sure you want to delete this post?"
        onConfirm={handleDelete}
      />
    </Container>
  );
};

export default PostDetails;
