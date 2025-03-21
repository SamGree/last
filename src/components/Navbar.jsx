import { Fragment } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import useTheme from "../hooks/theme-hook";
import useAuthStore from "../store/auth-store";
import useHttpRequest from "../hooks/http-request-hook";
import useLikedPostsStore from "../store/liked-post-store";

import "../styles/navbar.css";
import { toast } from "react-toastify";

const getCsrfToken = () => {
  const csrfCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="));
  return csrfCookie ? csrfCookie.split("=")[1] : null;
};
const NavBar = () => {
  const { isAuthenticated, clearAuth, token, user } = useAuthStore();
  const { clearLikedPostsStorage } = useLikedPostsStore();
  const { sendRequest } = useHttpRequest();
  const { theme } = useTheme();

  const handleLogout = async () => {
    await sendRequest("/users/logout/", "POST", {
      headers: {
        Authorization: `Token ${token}`,
        "X-CSRFToken": getCsrfToken(),
      },
    });
    clearAuth();
    clearLikedPostsStorage();
    toast.success("Signout successful!");
  };

  const getLinkClass = (isActive) =>
    `nav-link ${
      isActive
        ? theme === "dark"
          ? "text-white"
          : "text-gray"
        : "text-secondary"
    }`;

  return (
    <Navbar bg={theme} variant={theme} expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/" style={{ textDecoration: "none", color: "green" }}>
            E-Pics
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink
              to="/"
              className={({ isActive }) => getLinkClass(isActive)}
            >
              Home
            </NavLink>
            {isAuthenticated ? (
              <Fragment>
                <NavLink
                  to="/user/profile"
                  className={({ isActive }) => getLinkClass(isActive)}
                >
                  {user.username || "Profile"}
                </NavLink>

                <Dropdown className="dropdown-navbar">
                  <Dropdown.Toggle
                    variant="secondary"
                    id="dropdown-user-options"
                    className="bg-transparent border-0 p-0 nav-link dropdown-toggle-icon"
                  ></Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={NavLink} to="/posts/add-post">
                      Add Post
                    </Dropdown.Item>
                    <Dropdown.Item as={NavLink} to="/posts/liked">
                      Liked Posts
                    </Dropdown.Item>
                    <Dropdown.Item as={NavLink} to="/albums">
                      Albums
                    </Dropdown.Item>
                    <Dropdown.Item as={NavLink} to="/user/settings">
                      Settings
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <span
                  className="nav-link text-secondary logout-link"
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </Fragment>
            ) : (
              <Fragment>
                <NavLink
                  to="/login"
                  className={({ isActive }) => getLinkClass(isActive)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) => getLinkClass(isActive)}
                >
                  Register
                </NavLink>
              </Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
