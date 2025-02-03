import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useHttpRequest from "./http-request-hook";
import useAuthStore from "../store/auth-store";
import useAlbumStore from "../store/album-store";

const useAlbums = () => {
  const { sendRequest } = useHttpRequest();
  const { token } = useAuthStore();
  const { albums, setAlbums } = useAlbumStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      try {
        const data = await sendRequest("/albums/", "GET", {
          headers: { Authorization: `Token ${token}` },
        });
        setAlbums(data);
      } catch (error) {
        console.error("Error: ", error);
        toast.error("Error while fetching albums!");
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [sendRequest, token, setAlbums]);

  return { albums, loading };
};

export default useAlbums;
