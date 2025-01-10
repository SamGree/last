import { useState, useEffect } from "react";
import { Container, Form, Button, Spinner, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useHttpRequest from "../../hooks/http-request-hook";
import useAuthStore from "../../store/auth-store";
import usePostStore from "../../store/post-store";


import "../../styles/edit-post.css";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { sendRequest } = useHttpRequest();
  const { token } = useAuthStore();
  const { updatePostToPosts } = usePostStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingPost, setFetchingPost] = useState(true);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const { post } = await sendRequest(`/posts/${postId}`);
        setTitle(post.title);
        setDescription(post.description);
        setTags(post.tags.join(", "));
        setPreview(post.image);
      } catch (error) {
        console.log(error);
        toast.error("Error while fetching post details!");
      } finally {
        setFetchingPost(false);
      }
    };

    fetchPostDetails();
  }, [postId, sendRequest]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 2 * 1024 * 1024; // 2 MB in bytes

      if (file?.size > maxSize) {
        toast.error("File size exceeds 2 MB. Please upload a smaller file.");
        e.target.value = "";
        return; // Stop processing the file
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !tags.trim()) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (tags !== "") {
      const tagsData = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
      tagsData.forEach((tag) => formData.append("tags[]", tag));
    }

    if (image) formData.append("image", image);

    try {
      setLoading(true);
      const updatedPost = await sendRequest(
        `/posts/${postId}`,
        "PATCH",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
        formData
      );

      if (updatedPost) {
        updatePostToPosts(updatedPost);
        toast.success("Post updated successfully!");
        navigate(`/posts/${postId}`);
      } else {
        toast.error("Failed to update post!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while updating post!");
    } finally {
      setLoading(false);
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
      <h3>Edit Post</h3>
      <Form>
        <Form.Group className="mb-3" controlId="postTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="postDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="postTags">
          <Form.Label>Tags</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            disabled={loading}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="postImage">
          <Form.Label>Upload New Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading}
          />
          {preview && (
            <div className="mt-3">
              <img src={preview} alt="Preview" className="image-preview-edit" />
            </div>
          )}
        </Form.Group>
        <Row className="mt-3 mb-4">
          <Col className="flex-0">
            <Button
              variant="secondary"
              onClick={() => navigate(`/posts/${postId}`)}
              disabled={loading}
            >
              Cancel
            </Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={handleSubmit} disabled={loading}>
              {loading ? <Spinner as="span" animation="border" size="sm" /> : "Submit"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default EditPost;
