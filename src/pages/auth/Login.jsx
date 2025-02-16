import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import useAuthStore from "../../store/auth-store";
import useHttpRequest from "../../hooks/http-request-hook";
import useLikedPostsStore from "../../store/liked-post-store";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();
  const { sendRequest } = useHttpRequest();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setLikedPosts } = useLikedPostsStore();
  const { token } = useAuthStore();

  const getCsrfToken = () => {
    const csrfCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="));
    return csrfCookie ? csrfCookie.split("=")[1] : null;
  };

  useEffect(() => {
    const fetchLikedPosts = async () => {
      if (!token) return;
      try {
        const data = await sendRequest(
          "/post-like/",
          "GET",
          { headers: { Authorization: `Token ${token}` } },
          {}
        );
        setLikedPosts(data || []);
      } catch (error) {
        console.error(error);
        toast.error("Error while fetching liked posts!");
        setLikedPosts([]);
      }
    };
    fetchLikedPosts();
  }, [sendRequest, setLikedPosts, setToken, setUser]);

  const handleLogin = (e) => {
    e.preventDefault();

    const loginUser = async () => {
      try {
        if (username && password) {
          const csrfToken = getCsrfToken();
          const data = await sendRequest(
            "/users/login/",
            "POST",
            {
              headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
              },
            },
            { username, password }
          );
          setUser(data.user);
          setToken(data.token);
          toast.success("Login was successfull.");
          navigate("/user/profile");
        } else {
          toast.error("Invalid username or password!");
        }
      } catch (error) {
        toast.error("Error during login!");
      }
    };

    loginUser();
  };

  return (
    <Container className="mt-5 max-w-400">
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
