import { useState } from "react";
import { Form, Button, Container, Image, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import useAuthStore from "../../store/auth-store";
import useTheme from "../../hooks/theme-hook";
import useHttpRequest from "../../hooks/http-request-hook";
import noAvatar from "../../assets/images/no-avatar.png";

import "../../styles/settings.css";

const Settings = () => {
  const { user, setUser, token } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  const { sendRequest } = useHttpRequest();

  const [formData, setFormData] = useState({
    username: user.username || "",
    profile_image: user.profileImage || null,
    bio: user.bio || "",
  });

  const [avatarPreview, setAvatarPreview] = useState(
    user.profile_image || noAvatar
  );
  const [loadingImage, setLoadingImage] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profile_image" && files?.length > 0) {
      const file = files[0];
      setLoadingImage(true);
      setFormData((prevData) => ({ ...prevData, [name]: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setLoadingImage(false);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formPayload = new FormData();
      formPayload.append("username", formData.username);
      formPayload.append("bio", formData.bio);
      if (formData.profile_image) {
        formPayload.append("profile_image", formData.profile_image);
      }

      const updatedUser = await sendRequest(
        "/users/profile/update",
        "PATCH",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
        formPayload
      );

      setUser(updatedUser);
      toast.success("Profile is successfully updated.");
    } catch (error) {
      
      toast.error("Error while updating user profile!");
    }
  };

  return (
    <Container className="mt-5 mb-2 max-w-500">
      <h3 className="title-settings">Settings</h3>
      <div className="text-center mb-4">
        {loadingImage ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <Image
            src={avatarPreview || noAvatar}
            alt="User Avatar"
            roundedCircle
            className="image-settings"
            onError={() => setAvatarPreview(noAvatar)}
          />
        )}
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter new username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBiography" className="mb-3">
          <Form.Label>Biography</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your biography"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
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
        <Form.Group controlId="formTheme" className="mb-3">
          <Form.Label>Theme</Form.Label>
          <Form.Text className="d-block mb-2">
            The theme changes automatically based on your local time: Dark from
            6 AM to 6 PM and Light otherwise.
          </Form.Text>
          <Form.Check
            type="switch"
            id="theme-switch"
            label={`Current Theme: ${
              theme.charAt(0).toUpperCase() + theme.slice(1)
            }`}
            onChange={toggleTheme}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="save-button w-100">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default Settings;
