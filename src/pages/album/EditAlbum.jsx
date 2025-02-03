import { useState, useEffect } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useHttpRequest from "../../hooks/http-request-hook";
import useAuthStore from "../../store/auth-store";
import useAlbumStore from "../../store/album-store";

const EditAlbum = () => {
  const { sendRequest } = useHttpRequest();
  const { token } = useAuthStore();
  const { updateAlbum } = useAlbumStore();
  const { albumId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingAlbum, setFetchingAlbum] = useState(true);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const data = await sendRequest(`/albums/${albumId}`, "GET", {
          headers: { Authorization: `Token ${token}` },
        });
        setTitle(data.name);
      } catch (error) {
        console.error(error);
        toast.error("Error while fetching album details!");
      } finally {
        setFetchingAlbum(false);
      }
    };

    fetchAlbum();
  }, [sendRequest, token, albumId]);

  const handleUpdateAlbum = async () => {
    if (!title.trim()) {
      toast.error("Album title cannot be empty!");
      return;
    }

    try {
      setLoading(true);
      const data = await sendRequest(
        `/albums/${albumId}`,
        "PATCH",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        },
        { name: title }
      );
      updateAlbum(data);
      toast.success("Album updated successfully!");
      navigate("/albums");
    } catch (error) {
      console.error(error);
      toast.error("Error while updating album!");
    } finally {
      setLoading(false);
    }
  };

  if (fetchingAlbum) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading album details...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mw-600">
      <h2>Edit Album</h2>
      <hr />
      <Form>
        <Form.Group controlId="albumTitle" className="mb-4">
          <Form.Label>Album Title</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter new album title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </Form.Group>
        <div className="d-flex">
          <Button
            variant="secondary"
            onClick={() => navigate("/albums")}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdateAlbum}
            disabled={loading}
            className="ms-2"
          >
            {loading ? (
              <Spinner as="span" animation="border" size="sm" />
            ) : (
              "Update Album"
            )}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditAlbum;
