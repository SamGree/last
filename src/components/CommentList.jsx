import { useState, useEffect } from "react";
import { ListGroup, Dropdown, Form, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import usePostStore from "../store/post-store";
import useAuthStore from "../store/auth-store";
import useHttpRequest from "../hooks/http-request-hook";
import { formatDate } from "../utils/helper-functions";

import "../styles/comment-list.css";

const CommentList = () => {
  const { token, user } = useAuthStore();
  const { postId, setComments, comments } = usePostStore();
  const { sendRequest } = useHttpRequest();
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      const csrfToken = getCsrfToken();
      try {
        setLoading(true);
        const data = await sendRequest(`/comments/post/${postId}`, "GET", {
          headers: {
            Authorization: `Token ${token}`,
            "X-CSRFToken": csrfToken,
          },
        });
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, sendRequest, token, setComments]);

  const getCsrfToken = () => {
    const csrfCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="));
    return csrfCookie ? csrfCookie.split("=")[1] : null;
  };
  const csrfToken = getCsrfToken();

  const handleOnToggleLike = async (postId, commentId) => {
    try {
      const csrfToken = getCsrfToken();
      const response = await sendRequest(`/comment-like/${commentId}`, "POST", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          "X-CSRFToken": csrfToken,
        },
      });
      if (response && response.error) {
        toast.error(response.error);
        return;
      }
      if (response && typeof response.is_liked === "boolean") {
        const updatedComments = comments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                is_liked: response.is_liked,
                likes_count: response.likes_count,
              }
            : comment
        );

        setComments(updatedComments);
        const action = response.is_liked ? "liked" : "unliked";
        toast.success(`You have ${action} the comment!`);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        console.error("Error toggling like:", error);
        toast.error("Error toggling like");
      }
    }
  };

  const handleEditComment = (commentId, currentContent) => {
    setEditingCommentId(commentId);
    setEditedContent(currentContent);
  };

  const handleSaveEdit = async (commentId) => {
    try {
      const formData = { content: editedContent };
      await sendRequest(
        `/comments/${commentId}`,
        "PATCH",
        {
          headers: {
            Authorization: `Token ${token}`,
            "X-CSRFToken": csrfToken,
          },
        },
        formData
      );

      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: editedContent }
            : comment
        )
      );

      toast.success("Comment updated successfully!");
      setEditingCommentId(null);
      setEditedContent("");
    } catch (error) {
      console.error(error);
      toast.error("Error updating comment!");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await sendRequest(`/comments/${commentId}`, "DELETE", {
        headers: {
          Authorization: `Token ${token}`,
          "X-CSRFToken": csrfToken,
        },
      });

      setComments(comments.filter((comment) => comment.id !== commentId));

      toast.success("Comment deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting comment!");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <ListGroup className="mt-3 mb-3">
      {comments
        .slice()
        .reverse()
        .map((comment) => (
          <ListGroup.Item key={comment.id} className="mb-3 p-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <img
                    src={comment.author_image}
                    alt="avatar"
                    className="comment-avatar"
                  />
                  <strong>{comment.author}</strong>
                </div>
                <div className="d-flex ms-3">
                  <div onClick={() => handleOnToggleLike(postId, comment.id)}>
                    <FaHeart
                      className={`me-1 ${
                        comment.is_liked ? "text-danger" : ""
                      }`}
                    />
                    <span>{comment.likes_count ?? 0}</span>
                  </div>
                  {comment.author === user.username && (
                    <Dropdown align="end">
                      <Dropdown.Toggle
                        variant="secondary"
                        size="sm"
                        className="ms-2"
                        as="div"
                      />
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() =>
                            handleEditComment(comment.id, comment.content)
                          }
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
              </div>
              <div className="d-flex align-items-center">
                <span className="ms-3 text-muted">
                  {formatDate(comment.created_at)}
                </span>
              </div>
            </div>
            <div className="mt-2">
              {editingCommentId === comment.id ? (
                <Form>
                  <Form.Control
                    type="text"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                  <div className="mt-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="me-2"
                      onClick={() => {
                        setEditingCommentId(null);
                        setEditedContent("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleSaveEdit(comment.id)}
                    >
                      Save
                    </Button>
                  </div>
                </Form>
              ) : (
                comment.content
              )}
            </div>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

export default CommentList;
