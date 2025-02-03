import { toast } from "react-toastify";
import useHttpRequest from "./http-request-hook";
import useAuthStore from "../store/auth-store";
import usePostStore from "../store/post-store";

const useDownloadImage = () => {
  const { sendRequest } = useHttpRequest();
  const { token } = useAuthStore();
  const { posts, updatePosts, setPost, updatePost } = usePostStore();
  const getCsrfToken = () => {
    const csrfCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="));
    return csrfCookie ? csrfCookie.split("=")[1] : null;
  };

  const downloadImage = async (postId) => {
    const postToUpdate = posts.find((post) => post.id === postId);

    if (!postToUpdate) {
      toast.error("Post not found!");
      return;
    }

    if (!postToUpdate.image) {
      toast.error("image not found!");
      return;
    }

    try {
      const data = await sendRequest(`/posts/${postId}/download`, "GET", {
        headers: {
          Authorization: `Token ${token}`,
          "X-CSRFToken": getCsrfToken(),
        },
      });

      if (!data) {
        throw new Error("Failed to fetch the image URL from the server.");
      }
      if (data && data.download_url) {
        const secureUrl = data.download_url.replace("http://", "https://");

        const imageResponse = await fetch(secureUrl, {
          method: "GET",
          mode: "cors",
        });

        if (!imageResponse.ok) {
          throw new Error("Failed to download the image from the given URL.");
        }

        const blob = await imageResponse.blob();
        const blobUrl = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = blobUrl;
        anchor.download = `image-${postId}.jpg`;
        anchor.click();

        URL.revokeObjectURL(blobUrl);

        const updatedPost = {
          ...postToUpdate,
          download_count: data.download_count,
        };

        const updatedPosts = posts.map((post) =>
          post.id === postId ? updatedPost : post
        );

        updatePosts(updatedPosts);
        setPost(updatedPost);
        updatePost(updatedPost);
        toast.success("Image downloaded successfully.");
      } else {
        throw new Error("No Download URL returned from the server");
      }
    } catch (error) {
      console.error("Error while downloading the image:", error);

      toast.error("You have to be logged in in order to download image!");
    }
  };

  return { downloadImage };
};

export default useDownloadImage;
