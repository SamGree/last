import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import useAuthStore from "../../store/auth-store";
import usePostStore from "../../store/post-store";
import useHttpRequest from "../../hooks/http-request-hook";

import "../../styles/add-post.css";

const AddPost = () => {
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const { addPost } = usePostStore();
  const { sendRequest } = useHttpRequest();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const getCsrfToken = () => {
    const csrfCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="));
    return csrfCookie ? csrfCookie.split("=")[1] : null;
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      const maxSize = 2 * 1024 * 1024; // 2 MB in bytes
      console.log(file.size, maxSize);
      if (file?.size > maxSize) {
        toast.error("File size exceeds 2 MB. Please upload a smaller file.");
        e.target.value = "";
        return; // Stop processing the file
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.image) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("description", formData.description);
    formPayload.append("image", formData.image);

    const tagsData = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    tagsData.forEach((tag) => formPayload.append("tags[]", tag));
    const csrfToken = getCsrfToken();
    try {
      const data = await sendRequest(
        "/posts/",
        "POST",
        {
          headers: {
            Authorization: `Token ${token}`,
            "X-CSRFToken": csrfToken,
          },
        },
        formPayload
      );

      if (!data) {
        toast.error("Failed to create post!");
        return;
      }

      addPost(data);
      toast.success("Post is successfully added.");
      navigate(`/posts/${data.id}`);
      setFormData({ title: "", description: "", tags: "", image: null });
      setPreview(null);
    } catch (error) {
      console.error(error);
      toast.error("Error while adding the post");
    }
  };

  return (
    <Container className="mt-5 mb-3 max-w-600">
      <h3>Add New Post</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter post title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter post description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            required
          />
        </Form.Group>
        <Form.Group controlId="formTags" className="mb-3">
          <Form.Label>Tags</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter tags (comma separated)"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload File/Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            required
          />
        </Form.Group>
        {preview && (
          <div className="mb-3 text-center">
            <Image
              src={preview}
              alt="Image Preview"
              className="image-preview"
              rounded
            />
          </div>
        )}
        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddPost;
