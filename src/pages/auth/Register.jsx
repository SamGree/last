import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import useHttpRequest from "../../hooks/http-request-hook";

import "../../styles/register.css";

const Register = () => {
  const navigate = useNavigate();
  const { sendRequest } = useHttpRequest();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password_again: "",
    profile_image: null,
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [usernameError, setUsernameError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [passwordLengthError, setPasswordLengthError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid =
      formData.username.trim() &&
      formData.password &&
      formData.password_again &&
      formData.password === formData.password_again &&
      formData.password.length >= 8 &&
      !usernameError &&
      !passwordMatchError &&
      !passwordLengthError;

    setIsFormValid(isValid);
  }, [formData, usernameError, passwordMatchError, passwordLengthError]);

  useEffect(() => {
    if (formData.password && formData.password_again) {
      if (formData.password !== formData.password_again) {
        setPasswordMatchError("Passwords do not match.");
      } else {
        setPasswordMatchError("");
      }
    }

    if (formData.password && formData.password.length < 8) {
      setPasswordLengthError("Password must have at least 8 characters.");
    } else {
      setPasswordLengthError("");
    }
  }, [formData.password, formData.password_again]);

  const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "username") {
    
    const lettersOnlyRegex = /^[A-Za-z]*$/;

    if (!lettersOnlyRegex.test(value)) {
      setUsernameError("Username can only contain letters (A-Z, a-z).");
    } else if (value.length > 15) {
      setUsernameError("Username cannot exceed 15 characters.");
    } else {
      setUsernameError("");
    }
  }

    if (files) {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const registerUser = async () => {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("username", formData.username);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("password_again", formData.password_again);
        if (formData.profile_image) {
          formDataToSend.append("profile_image", formData.profile_image);
        }

        // Call the API
        await sendRequest("/users/register/", "POST", {}, formDataToSend);

        toast.success("Registration is successful.");
        navigate("/login");
      } catch (error) {
        console.error("Error during registration:", error);
        if (error.response) {
          console.error("Server Response:", error.response.data);
          const errorMessage =
            error.response.data?.error || "Invalid request data.";
          toast.error(errorMessage);
        } else {
          toast.error("Network error or server unavailable.");
        }
      }
    };

    registerUser();
  };

  return (
    <Container className="mt-5 max-w-400">
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            isInvalid={!!usernameError}
            required
          />
          <Form.Control.Feedback type="invalid" className="d-block">
            {usernameError}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={!!passwordLengthError}
            required
          />
          <Form.Control.Feedback type="invalid" className="d-block">
            {passwordLengthError}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPassword_again" className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="password_again"
            value={formData.password_again}
            onChange={handleChange}
            isInvalid={!!passwordMatchError}
            required
          />
          <Form.Control.Feedback type="invalid" className="d-block">
            {passwordMatchError}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formAvatar" className="mb-3">
          <Form.Label>Upload Avatar</Form.Label>
          <Form.Control
            type="file"
            name="profile_image"
            onChange={handleChange}
            accept="image/*"
          />
        </Form.Group>

        {avatarPreview && (
          <div className="text-center mb-3">
            <Image
              src={avatarPreview}
              roundedCircle
              className="avatar-preview"
            />
          </div>
        )}

        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={!isFormValid}
        >
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
