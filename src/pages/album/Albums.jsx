import { useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Dropdown,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaFolder } from "react-icons/fa";
import useHttpRequest from "../../hooks/http-request-hook";
import useAuthStore from "../../store/auth-store";
import useAlbumStore from "../../store/album-store";

import "../../styles/albums.css";
import useAlbums from "../../hooks/albums-hook";

const Albums = () => {
  const { sendRequest } = useHttpRequest();
  const { albums } = useAlbums();
  const { token } = useAuthStore();
  const { addAlbum, removeAlbum } = useAlbumStore();
  const navigate = useNavigate();
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateAlbum = async () => {
    if (!newAlbumTitle.trim()) {
      toast.error("Album title is required!");
      return;
    }

    //  Check if the album name already exists
    const existingAlbum = albums.find(
      (album) => album.name.toLowerCase() === newAlbumTitle.toLowerCase()
    );
    if (existingAlbum) {
      toast.error("Album already exists!"); // Show error message
      return;
    }

    try {
      setLoading(true);

      const data = await sendRequest(
        "/albums/",
        "POST",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        },
        { name: newAlbumTitle }
      );

      addAlbum(data);
      setNewAlbumTitle("");
      toast.success("Album created successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error while creating album!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAlbum = async (albumId) => {
    try {
      await sendRequest(`/albums/${albumId}`, "DELETE", {
        headers: { Authorization: `Token ${token}` },
      });
      removeAlbum(albumId);
      toast.success("Album deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error while deleting album!");
    }
  };

  return (
    <Container className="mt-5">
      <h3>Albums</h3>
      <hr />
      <p>
        Here you can create albums, add images to them, and view your albums
        sorted with your favorite photos.
      </p>
      <Form className="mb-4">
        <Form.Group controlId="albumTitle">
          <Form.Control
            name="name"
            type="text"
            placeholder="Album Title"
            value={newAlbumTitle}
            onChange={(e) => setNewAlbumTitle(e.target.value)}
            disabled={loading}
          />
        </Form.Group>
        <Button
          variant="primary"
          className="mt-3"
          onClick={handleCreateAlbum}
          disabled={loading}
        >
          {loading ? (
            <Spinner as="span" animation="border" size="sm" />
          ) : (
            "Create"
          )}
        </Button>
      </Form>

      {albums.length === 0 ? (
        <div className="no-albums-placeholder">
          <p className="text-muted">There are no created albums yet.</p>
        </div>
      ) : (
        <Row className="mt-3">
          {albums.map((album) => (
            <Col key={album.id} xs={6} sm={4} md={3} className="mb-4">
              <Card className="shadow-sm album-card">
                <Card.Body className="d-flex flex-row justify-content-between align-items-center">
                  <div
                    className="album-link d-flex align-items-center"
                    onClick={() => navigate(`/albums/${album.id}`)}
                  >
                    <FaFolder size={36} className="text-primary me-2" />
                    <span>{album.name}</span>
                  </div>
                  <Dropdown>
                    <Dropdown.Toggle
                      as="div"
                      id={`dropdown-${album.id}`}
                      className="albums-dropdown-toggle-icon"
                    ></Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => navigate(`/albums/${album.id}/edit`)}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleDeleteAlbum(album.id)}
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Albums;
